import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT
} from '../actions/constructor';

const initialState = {
  bun: null,
  toppings: []
};

export const constructorData = (state = initialState, action) => {
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
