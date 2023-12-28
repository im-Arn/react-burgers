import Style from './ingredients-bar.module.css';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { getAllIngredientsData } from '../utils/utils';

export default function IngredientsBar({ ingredientsProps }) {
  const allIngredients = useSelector(getAllIngredientsData);
  const ingredients = ingredientsProps;

  return (
    <ul className={Style.ingredientsBar} >
      {
        ingredients.map((ingredient, index) => {
          if (ingredient !== null) {
            if (ingredients.length > 5) {
              if (index === 5) {
                return (
                  <li key={index} style={{ zIndex: index }} className={`${Style.imgList}`}>
                    <div className={`${Style.shadeBox}`}>
                      <p className={`text text_type_digits-default ${Style.counter}`}>+{ingredients.length - 5}</p>
                    </div>
                    <img src={allIngredients.find((el) => el._id === ingredient).image_mobile}
                      alt={allIngredients.find((el) => el._id === ingredient).name}
                      className={Style.image} />
                  </li>
                )
              }
            }
            if (index >= 0 && index <= 5) {
              return (
                <li key={index} style={{ zIndex: 10 - index }} className={Style.imgList}>
                  <img src={allIngredients.find((el) => el._id === ingredient).image_mobile}
                    alt={allIngredients.find((el) => el._id === ingredient).name}
                    className={Style.image} />
                </li>
              )
            }
          }
        })
      }
    </ul>
  );
};

IngredientsBar.propTypes = {
  ingredientsProps: PropTypes.arrayOf(PropTypes.string).isRequired,
};

