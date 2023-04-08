import Style from './burger-constructor.module.css';
import React, { useContext, useEffect, useState } from 'react';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// import PropTypes from 'prop-types';
// import PropTypesIngredients from '../utils/prop-types-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { TotalDataContext, ApiClassContext } from '../../services/AppContext';

export default function BurgerConstructor() {

  const { data } = useContext(TotalDataContext); //хук данных всех ингредиентов
  const [totalPrice, setTotalPrice] = useState(0); //хук подсчёта финальной стоимости
  const [order, setOrder] = useState();  //хук номера заказа
  const { api } = useContext(ApiClassContext);

  //работа с модальным окном и отправка id на сервер, получение номера заказа
  const openModal = () => {
    api
      .getOrderNumber(totalIngredientsId)
      .then((res) => setOrder(res.order.number));
  }
  const closeModal = () => {
    setOrder();
  }

  // //работа с модальным окном
  // const [modal, setModal] = React.useState(false);
  // const openModal = () => {
  //   api
  //     .getOrderNumber(totalIngredientsId)
  //     .then((res) => setOrder(res.order.number));
  //   setModal(true);
  // }
  // const closeModal = () => {
  //   setOrder('');
  //   setModal(false);
  // }

  const { bun, ingredients } = {
    bun: data.find((bun) => bun.type === "bun"),
    ingredients: data.filter((ingredient) => ingredient.type !== 'bun'),
  };

  const ingredientsId = [];
  ingredients.forEach((ingredient) => {
    ingredientsId.push(ingredient._id)
  });
  const totalIngredientsId = [bun._id, ...ingredientsId, bun._id];

  useEffect(() => {
    let total = 0;
    ingredients.map((ingredient) => (total += ingredient.price));
    setTotalPrice(total + bun.price * 2);
  }, [ingredients, bun]
  );

  return (
    <section className={`${Style.section}`}>
      <ul className={`${Style.list} pt-25 pl-4`}>
        <li className={`${Style.listitem} pr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
        <li className={Style.listitemlist}>
          <ul className={Style.list2}>
            {ingredients.map(function (ingredient) {
              return (
                <li className={Style.listitem2} key={ingredient._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={`${ingredient.name}`}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </li>
              )
            })}
          </ul>
        </li>

        <li className={`${Style.listitem} pr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
      </ul>
      <div className={`${Style.pricearea} pr-4`}>
        <p className='text text_type_digits-medium mr-9'>{`${totalPrice}`}<CurrencyIcon type="primary" /></p>
        <Button htmlType="button" type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>

      {order && (
        <Modal closeModal={closeModal}>
          <OrderDetails number={order} />
        </Modal>
      )}
    </section >
  )
}

// BurgerConstructor.propTypes = {
//   ingredientData: PropTypes.arrayOf(PropTypesIngredients.isRequired).isRequired
// }