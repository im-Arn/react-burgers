import Style from './order-details.module.css'
import { useSelector } from "react-redux";
import { getOrderNumber } from '../../components/utils/utils';

export default function OrderDetails() {
  const orderNumber = useSelector(getOrderNumber);
  return ( 
    <div className={Style.content}>
      <p className={`text text_type_digits-large ${Style.number}`}>{orderNumber}</p>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <div className={Style.image}></div>
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

