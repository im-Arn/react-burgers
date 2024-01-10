import { TIngredientItem } from "../types/types";

export const SET_INGREDIENT_DETAILS: 'SET_INGREDIENT_DETAILS' = 'SET_INGREDIENT_DETAILS';
export const RESET_INGREDIENT_DETAILS: 'RESET_INGREDIENT_DETAILS' = 'RESET_INGREDIENT_DETAILS';

export type TSetIngredientDetails = {
  readonly type: typeof SET_INGREDIENT_DETAILS,
  ingredient: TIngredientItem,
};
export type TResetIngredientDetails = {
  readonly type: typeof RESET_INGREDIENT_DETAILS,
};
/**
 * action creator загрузки данных о ингредиенте в попап
 */
export const setIngredientDetails = (data: TIngredientItem) => {
  return ({ type: SET_INGREDIENT_DETAILS, ingredient: data })
};
/**
 * action creator сброса данных ингредиента в попапе
 */
export const resetIngredientDetails = (): TResetIngredientDetails => {
  return ({ type: RESET_INGREDIENT_DETAILS })
};

export type TIngredientDetailsActions = TSetIngredientDetails | TResetIngredientDetails;
