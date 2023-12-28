import { useDispatch, useSelector } from "react-redux";
import Style from "./feed-info-page.module.css";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, } from "react";
import { getCookie } from '../../components/utils/cookies';
import { getWsOrdersPageData, getWsOrdersUserData } from '../../components/utils/utils';
import { WS_CLOSE_CONNECTION, WS_CONNECTION_START } from "../../services/actions/wsFeed";
import { WS_CONNECTION_START_USER, WS_CONNECTION_CLOSED_USER } from "../../services/actions/wsUser";
import FeedInfo from "../../components/feed-info/feed-info";


export default function FeedInfoPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { id } = useParams();

  const orders = useSelector(getWsOrdersPageData);
  const userOrders = useSelector(getWsOrdersUserData)
  const ordersData = location.pathname.includes('feed') ? orders : userOrders;
  const order = ordersData.find(order => order._id === id);
  // const order = orders.find(order => order._id === id);

  useEffect(() => {
    if (location.pathname.includes('/feed')) {
      dispatch({
        type: WS_CONNECTION_START //подсоединяемся к вебсокету общей ленты заказов
      });
    } else {
      dispatch({
        type: WS_CONNECTION_START_USER, //подсоединяемся к вебсокету пользователя
        payload: getCookie("accessToken")
      });
    }
    return () => { //нужно разветвление?
      if (location.pathname.includes('/feed')) {
        dispatch({
          type: WS_CLOSE_CONNECTION 
        });
      } else {
        dispatch({
          type: WS_CONNECTION_CLOSED_USER,
          payload: getCookie("accessToken")
        });
      }
    };
  }, [dispatch, location]);

  if (!order) {
    return <div>Загрузка...</div>;
  }

  return (
    <section className={Style.feedInfoPage}>
      <FeedInfo />
    </section>
  )
};
