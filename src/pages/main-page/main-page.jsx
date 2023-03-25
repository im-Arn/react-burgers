import Style from './main-page.module.css';
import PropTypes from 'prop-types';
import PropTypesIngredients from '../../components/utils/prop-types-ingredients';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";


export default function MainPage(props) {
  if(!props.data.length) return <>Загрузка...</>

  return (
    <main className={Style.main}>
      <BurgerIngredients ingredientData={props.data} />
      <BurgerConstructor ingredientData={props.data} />
    </main>
  )
}

MainPage.propTypes = {
  data: PropTypes.arrayOf(PropTypesIngredients.isRequired).isRequired,
}