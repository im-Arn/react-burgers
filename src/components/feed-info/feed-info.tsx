import Style from "./feed-info.module.css";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams, Location } from "react-router-dom";
import { setDate, sumPrice, countIngredients } from '../utils/utils';
import { useAppSelector, TIngredientItem } from "../../services/types/types";

type TIngredientsCounted = {
  [key: string]: number;
};

export default function FeedInfo() {

  const allIngredients = useAppSelector(store => store.ingredients.ingredients);
  const { id } = useParams<{ id: string }>();
  const location: Location = useLocation();
  const checkLocation = location.pathname.includes('feed');
  const orders = useAppSelector(store => store.wsOrders.orders);
  const ordersUser = useAppSelector(store => store.wsFeedUser.orders);
  const currentOrders = checkLocation === true ? orders : ordersUser;
  const order  = currentOrders.find(order => order._id === id);

  if (!order) return null

  const time = <FormattedDate date={new Date(order?.createdAt)} />;
  const status = order.status === 'done' ? 'Выполнен' : 'Готовится';
  const ingredientsCounted = countIngredients(order.ingredients) as TIngredientsCounted;
  const ingredientsSorted = Object.keys(ingredientsCounted);
  const countSorted = Object.values(ingredientsCounted);
  const totalPrice = sumPrice(order.ingredients, allIngredients);

  return (
    <div className={Style.container}>
      <p className={`text text_type_digits-default mb-10 ${Style.number}`}>#{order.number}</p>
      <h2 className="text text_type_main-medium mb-2">{order.name}</h2>
      <p className={`text text_type_main-default mb-15 ${Style.status}`}>{status}</p>
      <h2 className="text text_type_main-medium mb-5">Состав:</h2>
      <ul className={Style.list}>
        {ingredientsSorted.map((ing, i) => {
          const price = allIngredients?.find((el: TIngredientItem) => el._id === ing)?.price;
          return (
            <li key={i} className={Style.ingredients}>
              <div className={Style.ingredientInfo}>
                <img src={allIngredients?.find((el: TIngredientItem) => el._id === ing)?.image_mobile}
                  alt={allIngredients?.find((el: TIngredientItem) => el._id === ing)?.name}
                  className={Style.image} />
                <p className={`${Style.text} text text_type_main-default`}>{allIngredients?.find((el: TIngredientItem) => el._id === ing)?.name}</p>
              </div>
              <div className={`${Style.priceIngredient}`}>
                <p className="text text_type_digits-default">{`${countSorted[i]} x ${price}`}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          )
        })}
      </ul>
      <div className={Style.bottom}>
        <p className="text text_type_main-default text_color_inactive">
          {time}{setDate(order.createdAt)}
        </p>
        <div className={Style.price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
