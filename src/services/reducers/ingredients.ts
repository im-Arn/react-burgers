import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILURE,
  TIngredientsAct,
} from '../actions/ingredients'
import { TIngredientItem } from "../types/types";

type TIngredientsDataState = {
  ingredients: TIngredientItem[],
  isloading: boolean,
  isload: boolean,
}

const initialState: TIngredientsDataState = {
  ingredients: [],
  isloading: false,
  isload: false,
};

export const ingredients = (state = initialState, action: TIngredientsAct): TIngredientsDataState => {
  switch (action.type) {
    //при начале загрузки статус загрузки становится положительным, данные ещё не получены и не записываются в стейт
    case FETCH_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isloading: true,
      };
    }
    //при успешной загрузке статус загрузки сменяется на false а полученные данные записываются в стейт
    case FETCH_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isloading: false,
        isload: true,
        ingredients: action.ingredients,
      };
    }
    //при ошибке загрузки статус загрузки сменяется на false, а данные стейта остаются прежними
    case FETCH_INGREDIENTS_FAILURE: {
      return {
        ...state,
        isloading: false,
        isload: false,
        ingredients: [],
      };
    }
    default: return state;
  }
};
