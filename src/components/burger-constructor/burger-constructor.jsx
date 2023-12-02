import Style from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder, resetOrderNumber } from '../../services/actions/order';
import { DraggableElement } from '../draggable-element/draggable-element';
import { useDrop } from "react-dnd";
import { getOrderNumber, getOrderData } from '../../components/utils/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSuccessUserAuth } from "../utils/utils";


export default function BurgerConstructor({ onDropHandler }) {
  const orderNumber = useSelector(getOrderNumber); //достали номер заказа из стора
  const orderList = useSelector(getOrderData); //достали список ингредиентов лежащих в заказе из стора
  const isAuthenticated = useSelector(getSuccessUserAuth); //достали сведения об аутентификации

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0); //хук подсчёта финальной стоимости
  const [totalIngredientsId, setTotalIngredientsId] = useState(null); //хук сборки id для отправки на сервер

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
  }


  //dnd функционал -----------------------------------------------------------------------------------
  const [{ isHover }, dropTargetRef] = useDrop({
    accept: "ingredient", //аналогично type у useDrag. 
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  useEffect(() => {
    // считаем сумму, пишем в стейт
    const sum = orderList.toppings.reduce(
      (current, total) => current + total.price,
      orderList.bun === null || orderList.bun.price === undefined ? 0 : orderList.bun.price * 2
    );
    setTotalPrice(sum);

    // если ингредиентов достаточно, считаем айдишники, пишем в стейт
    if (orderList.bun && orderList.toppings.length > 0) {
      const ingredientsId = [];
      orderList.toppings.forEach((ingredient) => {
        ingredientsId.push(ingredient._id)
      });
      const totalIngredientsId = [orderList.bun._id, ...ingredientsId, orderList.bun._id];
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
            {orderList.toppings && (orderList.toppings.map(function (ingredient, index) {
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
        <Button htmlType="button" type="primary" size="large" onClick={openModal} disabled={(orderList.bun && orderList.toppings.length > 0) ? false : "disabled"}>
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

BurgerConstructor.propTypes = {
  onDropHandler: PropTypes.func.isRequired
}
