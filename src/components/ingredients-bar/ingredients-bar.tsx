import Style from './ingredients-bar.module.css';
import { useAppSelector } from "../../services/types/types";

export default function IngredientsBar(props: { ingredientsProps: string[] }) {
  const allIngredients = useAppSelector(state => state.ingredients.ingredients);
  const ingredients = props.ingredientsProps;

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
                    <img src={allIngredients?.find((el) => el._id === ingredient)?.image_mobile}
                      alt={allIngredients?.find((el) => el._id === ingredient)?.name}
                      className={Style.image} />
                  </li>
                )
              }
            }
            if (index >= 0 && index <= 5) {
              return (
                <li key={index} style={{ zIndex: 10 - index }} className={Style.imgList}>
                  <img src={allIngredients.find((el) => el._id === ingredient)?.image_mobile}
                    alt={allIngredients.find((el) => el._id === ingredient)?.name}
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

