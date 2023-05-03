import {
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAILURE,
  RESET_ORDER_NUMBER
} from '../actions/order';

const initialState = {
  number: null,
};

export const order = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_REQUEST: {
      return initialState;
    }
    case FETCH_ORDER_SUCCESS: {
      return {
        ...state,
        number: action.number
      }
    }
    case FETCH_ORDER_FAILURE: {
      return initialState;
    }
    case RESET_ORDER_NUMBER: {
      return {
        ...state,
        number: action.number
      }
    }
    default:
      return state;
  }
};