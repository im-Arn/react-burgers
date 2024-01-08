import { api } from "../../components/utils/Api";
import { Dispatch } from 'redux';
import { AppThunk, TIngredientItem } from "../types/types";

export const FETCH_INGREDIENTS_REQUEST: "FETCH_INGREDIENTS_REQUEST" = "FETCH_INGREDIENTS_REQUEST";
export const FETCH_INGREDIENTS_SUCCESS: "FETCH_INGREDIENTS_SUCCESS" = "FETCH_INGREDIENTS_SUCCESS";
export const FETCH_INGREDIENTS_FAILURE: "FETCH_INGREDIENTS_FAILURE" = "FETCH_INGREDIENTS_FAILURE";

type TIngredientsRequest = {
  readonly type: typeof FETCH_INGREDIENTS_REQUEST,
}
type TIngredientsSuccess = {
  readonly type: typeof FETCH_INGREDIENTS_SUCCESS,
  ingredients: TIngredientItem[]
}
type TIngredientsFailure = {
  readonly type: typeof FETCH_INGREDIENTS_FAILURE,
  error: string,
}

export type TServerResIngredients = {
  success: boolean;
  data: TIngredientItem[];
};

/** action creator запроса данных с сервера */
export function fetchIngredientsRequest(): TIngredientsRequest {
  return { type: FETCH_INGREDIENTS_REQUEST };
}
/** action creator успешного получения данных с сервера */
export function fetchIngredientsSuccess(data: TIngredientItem[]): TIngredientsSuccess {
  return { type: FETCH_INGREDIENTS_SUCCESS, ingredients: data };
}
/** action creator ошибки получения данных с сервера */
export function fetchIngredientsFailure(error: Error): TIngredientsFailure {
  return { type: FETCH_INGREDIENTS_FAILURE, error: error.message };
}

/** action получения данных с сервера */
export function fetchIngredients(): AppThunk<void> {
  return async function (dispatch: Dispatch) {
    dispatch(fetchIngredientsRequest());
    try {
      const response = await api.getIngredients<TServerResIngredients>();
      const data = response.data;
      dispatch(fetchIngredientsSuccess(data));
    } catch (error) {
      if (error instanceof Error && (error.message as string)) {
        dispatch(fetchIngredientsFailure(error));
        console.log('Ошибка, закончились булочки', error);
      } else {
        console.log('Неожиданная ошибка fetchIngredients error message', error);
      }
    }
  };
}
