import { TIngredientItem, TIngredientItemConstructor } from "../types/types";

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const CLEAR_INGREDIENTS: 'CLEAR_INGREDIENTS' = 'CLEAR_INGREDIENTS';

/** Types добавления булки */
export type TAddConstructorBun = {
  readonly type: typeof ADD_BUN;
  bun: TIngredientItem;
};
/** Types добавления ингредиента */
export type TAddConstructorIngredient = {
  readonly type: typeof ADD_INGREDIENT;
  ingredient: TIngredientItemConstructor,
  uid: string,
};
/** Types удаления ингредиента */
export type TDeleteConstructorIngredient = {
  readonly type: typeof DELETE_INGREDIENT;
  uid: string,
};
/** Types перемещения ингредиента в списке */
export type TMoveConstructorIngredient = {
  readonly type: typeof MOVE_INGREDIENT;
  from: number,
  to: number,
};
/** Types очистки конструктора */
export type TClearConstructorIngredients = {
  readonly type: typeof CLEAR_INGREDIENTS;
};

/** action creator добавления булки */
export const addConstructorBun = (data: TIngredientItem): TAddConstructorBun => ({
  type: ADD_BUN,
  bun: data
});
/** action creator добавления ингредиента */
export const addConstructorIngredient = (data: TIngredientItemConstructor, id: string): TAddConstructorIngredient => ({
  type: ADD_INGREDIENT,
  ingredient: data,
  uid: id
});
/** action creator удаления ингредиента */
export const deleteConstructorIngredient = (id: string): TDeleteConstructorIngredient => ({
  type: DELETE_INGREDIENT,
  uid: id
});
/** action creator перемещения ингредиента в списке */
export const moveConstructorIngredient = (from: number, to: number): TMoveConstructorIngredient => ({
  type: MOVE_INGREDIENT,
  from: from,
  to: to,
});
/** action creator очистки конструктора */
export const clearConstructorIngredients = () => ({
  type: CLEAR_INGREDIENTS,
});

//для AppThunk и constructor reducer ============================
export type TConstructorActions = TAddConstructorBun | TAddConstructorIngredient | TDeleteConstructorIngredient | TMoveConstructorIngredient | TClearConstructorIngredients;
