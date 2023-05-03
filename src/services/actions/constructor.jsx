export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

/**
 * action creator добавления булки
 */
export const addConstructorBun = (data) => ({
  type: ADD_BUN,
  bun: data
});
/**
 * action creator добавления ингредиента
 */
export const addConstructorIngredient = (data, id) => ({
  type: ADD_INGREDIENT,
  ingredient: data,
  uid: id
});
/**
 * action creator удаления ингредиента
 */
export const deleteConstructorIngredient = (id) => ({
  type: DELETE_INGREDIENT,
  uid: id
});
/**
 * action creator перемещения ингредиента в списке
 */
export const moveConstructorIngredient = (from, to) => ({
  type: MOVE_INGREDIENT,
  from: from,
  to: to,
});