import Style from "./orders-list.module.css";
import IngredientsBar from '../ingredients-bar/ingredients-bar';
import FeedInfo from "../feed-info/feed-info";
import {
  setDate,
  sumPrice,
} from '../utils/utils';
import Modal from "../modal/modal";
import { useLocation, useNavigate, Location, NavigateFunction } from "react-router-dom";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from "../../services/types/types";

export default function OrdersList() {

  const allIngredients = useAppSelector(state => state.ingredients.ingredients); // все ингредиенты
  const orders = useAppSelector(store => store.wsOrders.orders); //получить список заказов с хранилища вебсокета

  // реализуем возможность сбежать
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const background: boolean = location.state?.modal;
  const closeModal = () => {
    navigate('/feed', {
      state: { modal: false }
    });
  };

  return (
    <article className={Style.feedList}>
      <ul className={Style.list}>
        {orders.map((order) => {
          const _id = order._id;
          const ingredients = order.ingredients;
          const time = <FormattedDate date={new Date(order?.createdAt)} />;
          return (
            <li className={Style.orderElement} key={order._id} onClick={() => {
              navigate(`/feed/${_id}`, { state: { modal: true, background: location } });
            }}>
              <div className={`${Style.infoOrder} mb-6`}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">
                  {time}{setDate(order.createdAt)}
                </p>
              </div>
              <h2 className="text text_type_main-medium mb-6">{order.name}</h2>
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
      {background && (
        <Modal closeModal={closeModal}>
          <FeedInfo />
        </Modal>
      )
      }
    </article>
  )
};
