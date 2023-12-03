import Style from "./profile-orders-page.module.css";
import IngredientsBar from '../../components/ingredients-bar/ingredients-bar';
import { useSelector } from "react-redux";
import { getCookie } from '../../components/utils/cookies';
import {
  getAllIngredientsData,
  getWsOrdersUserData,
  getUserDataName,
  setDate,
  sumPrice,
} from '../../components/utils/utils';
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { WS_CLOSE_CONNECTION_USER, WS_CONNECTION_START_USER } from "../../services/actions/wsUser";


export default function ProfileOrdersPage() {
  const dispatch = useDispatch();
  const userData = useSelector(getUserDataName);

  useEffect(() => {
    // console.log('я ProfileOrdersPage, я диспатчу USERws', getCookie("accessToken"));
    dispatch({
      type: WS_CONNECTION_START_USER,
      payload: getCookie("accessToken")
    });
    return () => {
      dispatch({
        type: WS_CLOSE_CONNECTION_USER,
        payload: getCookie("accessToken")
      })
    };
  }, [userData]);

  const allIngredients = useSelector(getAllIngredientsData); // все ингредиенты
  const userOrders = useSelector(getWsOrdersUserData); //получить список заказов с хранилища вебсокета
  // const userOrders = useSelector(getWsOrdersPageData);

 
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <article className={Style.feedList}>
      <ul className={Style.list}>
        {userOrders.map((order) => {
          const _id = order._id;
          const ingredients = order.ingredients;
          const time = <FormattedDate date={new Date(order?.createdAt)} />;
          const status = order.status === 'done' ? 'Выполнен' : 'Готовится';
          return (
            <li className={Style.orderElement} key={uuidv4()} onClick={() => {
              navigate(`/profile/orders/${_id}`, { state: { modal: true, background: location } });
            }}>
              <div className={`${Style.infoOrder} mb-6`}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">
                {time}{setDate(order.createdAt)}
                </p>
              </div>
              <h2 className="text text_type_main-medium mb-2">{order.name}</h2>
              <p className={`text text_type_main-default mb-6 ${Style.status}`}>{status}</p>
              <div className={Style.containerIngredients}>
                <IngredientsBar ingredientsProps={ingredients} />
                <div className={Style.price}>
                  <p className="text text_type_digits-default">
                    {sumPrice(order.ingredients, allIngredients)}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
