import { AnyAction } from "redux";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import store from "../store";
import { TUserActions } from "../actions/user";
import { TWebSocketActions } from "../actions/wsFeed";
import { TWebSocketUserActions } from "../actions/wsUser";
import { TOrderActions } from "../actions/order";
import { TConstructorActions } from "../actions/constructor";
import { TIngredientDetailsActions } from "../actions/ingredientDetails";
import { TIngredientsAct } from "../actions/ingredients";
import { rootReducer } from "../reducers/rootReducer";

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

export type RootState = ReturnType<typeof rootReducer>
// export type RootState = ReturnType<typeof store.getState>;
export type TApplicationActions = TConstructorActions | TOrderActions | TUserActions | TWebSocketActions
  | TWebSocketUserActions | TIngredientDetailsActions | TIngredientsAct;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, //return type
  RootState,
  AnyAction,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, AnyAction, TApplicationActions>;

export const useAppDispatch: () => AppDispatch = dispatchHook;
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => dispatchHook<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
