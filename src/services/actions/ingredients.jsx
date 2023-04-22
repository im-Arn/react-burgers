import { api } from "../../components/utils/Api";

export const FETCH_INGREDIENTS_REQUEST = "FETCH_INGREDIENTS_REQUEST";
export const FETCH_INGREDIENTS_SUCCESS = "FETCH_INGREDIENTS_SUCCESS";
export const FETCH_INGREDIENTS_FAILURE = "FETCH_INGREDIENTS_FAILURE";

/**
 * action creator запроса данных с сервера
 */
export function fetchIngredientsRequest() {
  return { type: FETCH_INGREDIENTS_REQUEST };
}
/**
 * action creator успешного получения данных с сервера
 */
export function fetchIngredientsSuccess(data) {
  return { type: FETCH_INGREDIENTS_SUCCESS, ingredients: data };
}
/**
 * action creator ошибки получения данных с сервера
 */
export function fetchIngredientsFailure(error) {
  return { type: FETCH_INGREDIENTS_FAILURE, error: error };
}

/**
 * action получения данных с сервера
 */
export function fetchIngredients() {
  return async function (dispatch) {
    dispatch(fetchIngredientsRequest());
    try {
      const response = await api.getIngredients();
      const data = await response.data;
      dispatch(fetchIngredientsSuccess(data));
    } catch (error) {
      dispatch(fetchIngredientsFailure(error));
      console.log(error);
    }
  };
}