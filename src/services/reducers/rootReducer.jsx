import { combineReducers } from 'redux';
import { constructorData } from './constructor';
import { ingredients } from './ingredients';
import { ingredientDetails } from './ingredientDetails';
import { order } from './order';
import { user } from './user';


export const rootReducer = combineReducers({
  constructorData,
  ingredientDetails,
  ingredients,
  order,
  user
}) 
