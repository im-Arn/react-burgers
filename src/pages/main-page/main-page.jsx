import Style from './main-page.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

export default function MainPage(props) {
  return (
    <main className={Style.main}>
      <BurgerIngredients ingredientData={props.data} />
      <BurgerConstructor ingredientData={props.data} />
    </main>
  )
}