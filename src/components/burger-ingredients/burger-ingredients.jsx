import Style from './burger-ingredients.module.css';
import TabMenu from '../tabs/tabs';
import PropTypes from 'prop-types';
import PropTypesIngredients from '../utils/prop-types-ingredients';
import IdgredientCategory from '../ingredient-category/ingredient-category';

export default function BurgerIngredients(props) {
  const bunsArr = props.ingredientData.filter((bun) => bun.type === "bun");
  const sauceArr = props.ingredientData.filter((sauce) => sauce.type === "sauce");
  const mainArr = props.ingredientData.filter((main) => main.type === "main");

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

BurgerIngredients.propTypes = {
  ingredientData: PropTypes.arrayOf(PropTypesIngredients.isRequired).isRequired
}

