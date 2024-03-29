import Style from './ingredient-details.module.css'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllIngredientsData } from '../../components/utils/utils';


export default function IngredientDetails() {
  // const ingredient = useSelector(getIngredientData); //получаем хранящийся сейчас в сторе ингредиент

  const { id } = useParams();
  const [ingredient, setElement] = useState(null);

  const ingredients = useSelector(getAllIngredientsData);

  useEffect(()=>{
    setElement(ingredients.find(ing => ing._id === id))
  }, [ingredients]);

  return ingredient ? (
    <div className={Style.content}>
      <h2 className={`text text_type_main-large ${Style.header}`}>Детали ингредиента</h2>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mb-4 mt-4">{ingredient.name}</p>
      <ul className={Style.list}>
        <li className={Style.listitem}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </li>
        <li className={Style.listitem}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </li>
        <li className={Style.listitem}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </li>
        <li className={Style.listitem}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  ) : null;
}
