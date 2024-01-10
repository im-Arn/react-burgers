import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_INGREDIENTS,
  TConstructorActions
} from '../actions/constructor';
import { TIngredientItem, TIngredientItemConstructor } from "../types/types";

export type TConstructorState = {
  bun: TIngredientItem | null,
  toppings: TIngredientItemConstructor[]
}

const initialState: TConstructorState = {
  bun: null,
  toppings: []
};

export const constructorData = (state = initialState, action: TConstructorActions): TConstructorState => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.bun
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        toppings: [...(state.toppings || []), { ...action.ingredient, uid: action.uid }]
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        toppings: state.toppings.filter(item => item.uid !== action.uid)
      };
    }
    case CLEAR_INGREDIENTS: {
      return {
        ...state,
        bun: null,
        toppings: []
      };
    }
    case MOVE_INGREDIENT: {
      const arrayOfToppings = [...state.toppings];
      arrayOfToppings.splice(action.to, 0, arrayOfToppings.splice(action.from, 1)[0]);
      return {
        ...state,
        toppings: arrayOfToppings
      }
    }
    default:
      return state;
  }
};
