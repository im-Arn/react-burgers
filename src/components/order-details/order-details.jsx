import Style from './order-details.module.css'
import PropTypes from 'prop-types';

export default function OrderDetails( {number}) {
  return ( 
    <div className={Style.content}>
      <p className={`text text_type_digits-large ${Style.number}`}>{number}</p>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <div className={Style.image}></div>
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

OrderDetails.propTypes = {
    number: PropTypes.number.isRequired
  }

