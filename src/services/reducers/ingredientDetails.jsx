import {
  SET_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS
} from '../actions/ingredientDetails';

const initialState = {
  ingredient: null,
}

export function ingredientDetails(state = initialState, action) {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredient: action.ingredient
      };
    }
    case RESET_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredient: null
      };
    }
    default:
      return state;
  }
};