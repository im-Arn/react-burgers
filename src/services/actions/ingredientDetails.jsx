export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const RESET_INGREDIENT_DETAILS = 'RESET_INGREDIENT_DETAILS';

/**
 * action creator загрузки данных о ингредиенте в попап
 */
export const setIngredientDetails = (data) => {
  return ({ type: SET_INGREDIENT_DETAILS, ingredient: data })
};
/**
 * action creator сброса данных ингредиента в попапе
 */
export const resetIngredientDetails = () => {
  return ({ type: RESET_INGREDIENT_DETAILS })
};