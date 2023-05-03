import Style from './main-page.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { addConstructorBun, addConstructorIngredient } from "../../services/actions/constructor";
import { v4 as uuidv4 } from 'uuid';

export default function MainPage() {
  const dataStatus = useSelector(state => state.ingredients.isloading);
  const dispatch = useDispatch();
  //днд функция отвечающая за добавление данных в стор
  const handleDrop = (item) => {
    item.type === "bun" ?
      dispatch(addConstructorBun(item)) :
      dispatch(addConstructorIngredient(item, uuidv4()));
  };

  if (dataStatus) return <>Загрузка...</>; //проверяем состояние загрузки данных с сервера перед рендером компонента

  return (
    <main className={Style.main}>
      <BurgerIngredients />
      <BurgerConstructor onDropHandler={handleDrop} />
    </main>
  )
}