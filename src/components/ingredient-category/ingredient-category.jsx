import IngredientItem from '../ingredient-item/ingredient-item';
import Style from './ingredient-category.module.css'
import PropTypes from 'prop-types';
import PropTypesIngredients from '../utils/prop-types-ingredients';
import { forwardRef } from 'react';

const IngredientCategory = forwardRef((props, ref) => {
  return (
    <li id={`${props.id}`} ref={ref}>
      <h2 className="text text_type_main-medium pt-10">{props.header}</h2>
      <ul className={`${Style.list} pt-6 pl-4`}>
        {props.data.map(function (ingredient) {
          return (
            <IngredientItem data={ingredient} key={ingredient._id} />
          )
        })}
      </ul>
    </li>
  )
});

IngredientCategory.propTypes = {
  id: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypesIngredients.isRequired).isRequired,
}

export default IngredientCategory;
