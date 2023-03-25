import Style from './burger-constructor.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypesIngredients from '../utils/prop-types-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'

export default function BurgerConstructor(props) {
  const img = 'https://code.s3.yandex.net/react/code/bun-02.png';

  const [modal, setModal] = React.useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const { bun, ingredients } = {// eslint-disable-line
    bun: props.ingredientData.find((bun) => bun.type === "bun"),
    ingredients: props.ingredientData.filter((ingredient) => ingredient.type !== 'bun'),
  };

  return (
    <section className={`${Style.section}`}>
      <ul className={`${Style.list} pt-25 pl-4`}>
        <li className={`${Style.listitem} pr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            //здесь находится мок т.к. по какой-то причине константа bun не создаётся в момент рендера и страница падает.
            //но при выключении/включении компонента всё начинает работать как нужно. 
            // возможно у меня локальная проблема, а у вас будет работать. версия кода без мока находится в нижней булочке.
            text="Краторная булка N-200i (верх)" 
            price="200"
            thumbnail={img}
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
          // text={`${bun.name} (низ)`}
          // price={bun.price}
          // thumbnail={bun.image}
          />
        </li>
      </ul>
      <div className={`${Style.pricearea} pr-4`}>
        <p className='text text_type_digits-medium mr-9'>610 <CurrencyIcon type="primary" /></p>
        <Button htmlType="button" type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>

      {modal && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section >
  )
}

BurgerConstructor.propTypes = {
  ingredientData: PropTypes.arrayOf(PropTypesIngredients).isRequired
}