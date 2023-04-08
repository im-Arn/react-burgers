import Style from './burger-ingredients.module.css';
import { useContext } from 'react';
import TabMenu from '../tabs/tabs';
// import PropTypes from 'prop-types';
// import PropTypesIngredients from '../utils/prop-types-ingredients';
import IdgredientCategory from '../ingredient-category/ingredient-category';
import { TotalDataContext } from '../../services/AppContext';

export default function BurgerIngredients() {
  const { data } = useContext(TotalDataContext);
  const bunsArr = data.filter((bun) => bun.type === "bun");
  const sauceArr = data.filter((sauce) => sauce.type === "sauce");
  const mainArr = data.filter((main) => main.type === "main");

  return (
    <section className={`${Style.section} pt5 mb-10`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <TabMenu />
      <ul className={`${Style.listingridients}`}>
        <IdgredientCategory data={bunsArr} header='Булки' id="bun" />
        <IdgredientCategory data={sauceArr} header='Соусы' id="sauce" />
        <IdgredientCategory data={mainArr} header='Начинки' id="main" />
      </ul>
    </section>
  )
}

// BurgerIngredients.propTypes = {
//   ingredientData: PropTypes.arrayOf(PropTypesIngredients.isRequired).isRequired
// }

