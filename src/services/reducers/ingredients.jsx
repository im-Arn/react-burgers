import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILURE
} from '../actions/ingredients'

const initialState = {
  ingredients: [],
  isloading: false,
  isload: false,
};

export const ingredients = (state = initialState, action) => {
  switch(action.type) {
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
        ingredients: action.ingredients,
      };
    }
     //при ошибке загрузки статус загрузки сменяется на false, а данные стейта остаются прежними
    case FETCH_INGREDIENTS_FAILURE: {
      return {
        ...state,
        isloading: false,
        ingredients: [],
      };
    }
    default: return state;
  }
};