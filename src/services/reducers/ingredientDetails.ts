import {
  SET_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS
} from '../actions/ingredientDetails';
import { TIngredientItem } from "../types/types";
import { TIngredientDetailsActions } from "../actions/ingredientDetails";

type TIngredientDetailsState = {
  ingredient: TIngredientItem | null,
}

const initialState: TIngredientDetailsState = {
  ingredient: null,
}

export function ingredientDetails(state = initialState, action: TIngredientDetailsActions): TIngredientDetailsState {
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
