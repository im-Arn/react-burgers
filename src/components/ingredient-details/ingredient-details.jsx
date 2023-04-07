import Style from './ingredient-details.module.css'
import PropTypesIngredients from '../utils/prop-types-ingredients';

export default function IngredientDetails(props) {
  return ( 
    <div className={Style.content}>
      <h2 className={`text text_type_main-large ${Style.header}`}>Детали ингредиента</h2>
      <img src={props.ingredient.image_large} alt={props.ingredient.name} />
      <p className="text text_type_main-medium mb-4 mt-4">{props.ingredient.name}</p>
      <ul className={Style.list}>
        <li className={Style.listitem}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{props.ingredient.calories}</p>
        </li>
        <li className={Style.listitem}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.ingredient.proteins}</p>
        </li>
        <li className={Style.listitem}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.ingredient.fat}</p>
        </li>
        <li className={Style.listitem}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypesIngredients.isRequired
}
