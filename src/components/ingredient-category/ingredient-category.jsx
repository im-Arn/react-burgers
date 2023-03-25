import IngredientItem from '../ingredient-item/ingredient-item';
import Style from './ingredient-category.module.css'
import PropTypes from 'prop-types';
import PropTypesIngredients from '../utils/prop-types-ingredients';

export default function IdgredientCategory(props) {
  return (
    <li id={`${props.id}`}>
      <h2 className="text text_type_main-medium mt-10">{props.header}</h2>
      <ul className={`${Style.list} pt-6 pl-4`}>
        {props.data.map(function (ingredient) {
          return (
            <IngredientItem data={ingredient} key={ingredient._id} />
          )
        })}
      </ul>
    </li>
  )
}

IdgredientCategory.propTypes = {
  data: PropTypes.arrayOf(PropTypesIngredients.isRequired).isRequired
}