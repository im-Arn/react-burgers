import Style from './order-status.module.css';
import { TOrderData} from '../../services/types/types';

type TOrderStatusProp = {
  title: string,
  orders: TOrderData[],
  done: boolean,
}
export default function OrderStatus(props: TOrderStatusProp) {
  const ordersProps = props;

  return (
    <li className={Style.orderStatus}>
      <h3 className="text text_type_main-medium mb-6">{ordersProps.title}</h3>
      <ul className={`${Style.ordersNumbers} text text_type_digits-default`}>
        {ordersProps.orders.slice(0, 50).map((item) => {
          return (
            <li className={`${Style.elementList} ${ordersProps.done ? Style.ordersDone : ''}`} key={item.number}>
              {item.number}
            </li>
          )
        })}
      </ul>
    </li>
  )
};
