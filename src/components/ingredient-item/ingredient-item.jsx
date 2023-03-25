import Style from './ingredient-item.module.css';
import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypesIngredients from '../utils/prop-types-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details'

export default function IngredientItem(props) {
  const [modal, setModal] = React.useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <li className={Style.listitem} onClick={openModal}>
      <img src={props.data.image} alt={props.data.name}></img>
      <Counter count={1} size="default" extraClass="m-1" />
      <div className={`${Style.price}`}>
        <p className={`${Style.text} text text_type_digits-default`}>{props.data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${Style.text} text text_type_main-default`}>{props.data.name}</p>
      {modal && (
        <Modal closeModal={closeModal}>
          <IngredientDetails ingredient={props.data} />
        </Modal>
      )
      }
    </li>
  )
}

IngredientItem.propTypes = {
  data: PropTypesIngredients.isRequired
}