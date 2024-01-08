import Style from './burger-constructor.module.css';
import { useState, useEffect } from 'react';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { fetchOrder, resetOrderNumber } from '../../services/actions/order';
import { DraggableElement } from '../draggable-element/draggable-element';
import { useDrop } from "react-dnd";
import { useLocation, useNavigate, Location, NavigateFunction } from 'react-router-dom';

import { TIngredientItem, useAppDispatch, useAppSelector, TIngredientItemConstructor} from "../../services/types/types";
import { TConstructorState } from "../../services/reducers/constructor";
import { clearConstructorIngredients } from "../../services/actions/constructor";

export default function BurgerConstructor({ onDropHandler }: { onDropHandler: (item: TIngredientItemConstructor) => void }) {
  const orderNumber = useAppSelector(state => state.order.number); //достали номер заказа из стора
  const orderList: TConstructorState = useAppSelector(state => state.constructorData); //достали список ингредиентов лежащих в заказе из стора
  const isAuthenticated = useAppSelector(store => store.user.success); //достали сведения об аутентификации //был getSuccessUserAuth, показалось что багует. хотя это может из-за пинга.

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const [totalPrice, setTotalPrice] = useState<number>(0); //хук подсчёта финальной стоимости
  const [totalIngredientsId, setTotalIngredientsId] = useState<string[] | null>(null); //хук сборки id для отправки на сервер

  //работа с модальным окном и отправка [id] на сервер, получение номера заказа-----------------------
  const openModal = () => {
    if (isAuthenticated) {
      dispatch(fetchOrder(totalIngredientsId)); //состояние модалки определяется наличием номера заказа, отдельное больше не требуется
    } else {
      navigate('/login', {
        replace: true,
        state: { from: location.pathname }
      });
    }
  }
  const closeModal = () => {
    dispatch(resetOrderNumber(null));
    dispatch(clearConstructorIngredients());
  }


  //dnd функционал -----------------------------------------------------------------------------------
  const [{ isHover }, dropTargetRef] = useDrop({
    accept: "ingredient", //аналогично type у useDrag. 
    drop(itemId: TIngredientItemConstructor) {
      onDropHandler(itemId);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  useEffect(() => {  // считаем сумму, пишем в стейт
    const sum: number = orderList.toppings.reduce(
      (current: number, total: TIngredientItem) => current + total.price,
      orderList.bun === null || orderList.bun.price === undefined ? 0 : orderList.bun.price * 2
    );
    setTotalPrice(sum);

    // если ингредиентов достаточно, считаем айдишники, пишем в стейт
    if (orderList.bun && orderList.toppings.length > 0) {
      const ingredientsId: string[] = [];
      orderList.toppings.forEach((ingredient: TIngredientItemConstructor) => {
        ingredientsId.push(ingredient._id)
      });
      const totalIngredientsId: string[] = [orderList.bun._id, ...ingredientsId, orderList.bun._id];
      setTotalIngredientsId(totalIngredientsId);
    }
  }, [orderList]);

  return (
    <section className={`${Style.section}`}>
      <ul className={`${Style.list}`} ref={dropTargetRef} style={isHover ? { boxShadow: "inset 0px 0px 35px 21px rgba(195,31,255,0.45)" } : { boxShadow: "none" }}>
        {/*индикатор возможности отправки заказа, отключается только при наличии булочки и одного ингредиента */}
        {!(orderList.bun && orderList.toppings.length > 0) && (<p style={{ margin: "auto" }} className={`text text_type_main-medium`}>Несите яства!</p>)}
        {orderList.bun ? (<li className={`${Style.listitem} pr-4`} key={1}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${orderList.bun.name} (верх)`}
            price={orderList.bun.price}
            thumbnail={orderList.bun.image}
          />
        </li>) : null}
        <li className={Style.listitemlist} key={2}>
          <ul className={Style.list2}>
            {orderList.toppings && (orderList.toppings.map(function (ingredient: TIngredientItemConstructor, index: number) {
              return (
                <DraggableElement ingredient={ingredient} index={index} key={ingredient.uid} />
              )
            }))}
          </ul>
        </li>
        {orderList.bun ? (<li className={`${Style.listitem} pr-4`} key={3}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${orderList.bun.name} (низ)`}
            price={orderList.bun.price}
            thumbnail={orderList.bun.image}
          />
        </li>) : null}
      </ul>
      <div className={`${Style.pricearea} pr-4`}>
        <p className='text text_type_digits-medium mr-9'>{`${totalPrice}`}<CurrencyIcon type="primary" /></p>
        <Button htmlType="button" type="primary" size="large" onClick={openModal} disabled={(orderList.bun && orderList.toppings.length > 0) ? false : true}>
          Оформить заказ
        </Button>
      </div>

      {orderNumber && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section >
  )
}
