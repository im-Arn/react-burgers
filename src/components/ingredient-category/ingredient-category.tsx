import IngredientItem from '../ingredient-item/ingredient-item';
import Style from './ingredient-category.module.css'
import { forwardRef } from 'react';
import { TIngredientItem } from "../../services/types/types";

type IngredientCategoryProps = {
  id: string;
  header: string;
  dataArr: TIngredientItem[];
}

const IngredientCategory = forwardRef<HTMLLIElement, IngredientCategoryProps>(
  ({ id, header, dataArr }: IngredientCategoryProps, ref) => {
  return (
    <li id={`${id}`} ref={ref}>
      <h2 className="text text_type_main-medium pt-10">{header}</h2>
      <ul className={`${Style.list} pt-6 pl-4`}>
        {dataArr.map(function (ingredient) {
          return (
            <IngredientItem data={ingredient} key={ingredient._id} kkey={ingredient._id}/>
          )
        })}
      </ul>
    </li>
  )
});

export default IngredientCategory;
