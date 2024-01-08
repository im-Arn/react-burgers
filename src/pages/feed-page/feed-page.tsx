import Style from "./feed-page.module.css";
import { useEffect, useMemo } from "react";
import { WS_CLOSE_CONNECTION, WS_CONNECTION_START } from "../../services/actions/wsFeed";
import OrderStatus from '../../components/order-status/order-status';
import OrdersTotal from '../../components/orders-totals/orders-total';
import OrdersList from '../../components/orders-list/orders-list';
import { useAppDispatch, useAppSelector } from "../../services/types/types";


export default function FeedPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START //подсоединяемся к вебсокету
    });
    return () => {
      dispatch({
        type: WS_CLOSE_CONNECTION
      })
    }
  }, []); // eslint-disable-line

  const orders = useAppSelector(store => store.wsOrders.orders); //получить список заказов с хранилища вебсокета
  const total = useAppSelector(store => store.wsOrders.total); //получить число всех заказов с хранилища вебсокета
  const totalToday = useAppSelector(store => store.wsOrders.totalToday); //получить число заказов за сегодня с хранилища вебсокета

  const ordersDone = useMemo(() =>
    orders.filter((item) => item.status === 'done'),
    [orders]
  )
  const ordersInProcess = useMemo(() =>
    orders.filter((item) => item.status !== 'done'),
    [orders]
  )
  if (!orders) {
    return <div>Загрузка...</div>;
  }

  return (
    <section className={Style.feedPage}>
      <h2 className={`text text_type_main-large`}>Лента заказов</h2>
      <div className={Style.page}>
        <OrdersList />
        <article className={Style.feedTotal}>
          <ul className={Style.ordersStatus}>
            <OrderStatus title='Готовы:' orders={ordersDone} done={true} />
            <OrderStatus title='В работе:' orders={ordersInProcess} done={false} />
          </ul>
          <ul className={Style.ordersTotals}>
            <OrdersTotal title='Выполнено за все время:' number={total} />
            <OrdersTotal title='Выполнено за сегодня:' number={totalToday} />
          </ul>
        </article>
      </div>
    </section>
  )
};
