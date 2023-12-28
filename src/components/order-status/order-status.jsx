import Style from './order-status.module.css';
import PropTypes from 'prop-types';

export default function OrderStatus(props) {
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

OrderStatus.propTypes = {
  title: PropTypes.string.isRequired,
  orders: PropTypes.arrayOf(
    PropTypes.shape({number: PropTypes.number.isRequired})).isRequired,
  done: PropTypes.bool.isRequired,
};
