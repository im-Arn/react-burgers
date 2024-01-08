import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Action } from "redux";
import { useDispatch } from "react-redux";
import { ThunkAction } from "redux-thunk";
import store from "../store";
import {
  // TUpdateCurrentUserActions,
  // TEditUserActions,
  // TLoginActions,
  // TTokenActions,
  TUserActions,
} from "../actions/user";
import { TWebSocketActions } from "../actions/wsFeed";
import { TWebSocketUserActions } from "../actions/wsUser";
import { TOrderActions } from "../actions/order";
import { TConstructorActions } from "../actions/constructor";
import { TIngredientDetailsActions } from "../actions/ingredientDetails";

export type TIngredientItem = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
};

export type TOrderData = {
  createdAt: string,
  ingredients: string[],
  name: string,
  number: number,
  status: string,
  updateAt: string,
  _id: string,
};

export type TRegisterUser = { 
  email: string, 
  password: string, 
  name: string,
};

export type TLoginUser = { 
  email: string, 
  password: string, 
};

export type TIngredientItemConstructor = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  id: string;
  index: number,
  ingredient: TIngredientItem;
  uid: string;
};

export type RootState = ReturnType<typeof store.getState>;
export type TApplicationActions = TConstructorActions | TOrderActions | TUserActions | TWebSocketActions 
| TWebSocketUserActions | TIngredientDetailsActions;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, //return type
  RootState,
  Action,
  TApplicationActions
>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
