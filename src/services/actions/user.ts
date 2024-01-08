import { api } from "../../components/utils/Api";
import { Dispatch } from 'redux';
import { setCookie, getCookie } from "../../components/utils/cookies";
import { SERVER_URL } from "../../components/utils/serverUrl";
import { AppThunk, AppDispatch, TRegisterUser, TLoginUser } from "../types/types";
import { TActionCreatorsOrder } from "../actions/order";

export const FETCH_REGISTER_REQUEST: 'FETCH_REGISTER_REQUEST' = 'FETCH_REGISTER_REQUEST';
export const FETCH_REGISTER_SUCCESS: 'FETCH_REGISTER_SUCCESS' = 'FETCH_REGISTER_SUCCESS';
export const FETCH_REGISTER_FAILED: 'FETCH_REGISTER_FAILED' = 'FETCH_REGISTER_FAILED';
export const FETCH_LOGIN_REQUEST: 'FETCH_LOGIN_REQUEST' = 'FETCH_LOGIN_REQUEST';
export const FETCH_LOGIN_SUCCESS: 'FETCH_LOGIN_SUCCESS' = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILED: 'FETCH_LOGIN_FAILED' = 'FETCH_LOGIN_FAILED';
export const FETCH_TOKEN_REQUEST: 'FETCH_TOKEN_REQUEST' = 'FETCH_TOKEN_REQUEST';
export const FETCH_TOKEN_SUCCESS: 'FETCH_TOKEN_SUCCESS' = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAILED: 'FETCH_TOKEN_FAILED' = 'FETCH_TOKEN_FAILED';
export const FETCH_AUTH_USER_REQUEST: 'FETCH_AUTH_USER_REQUEST' = 'FETCH_AUTH_USER_REQUEST';
export const FETCH_AUTH_USER_SUCCESS: 'FETCH_AUTH_USER_SUCCESS' = 'FETCH_AUTH_USER_SUCCESS';
export const FETCH_AUTH_USER_FAILED: 'FETCH_AUTH_USER_FAILED' = 'FETCH_AUTH_USER_FAILED';
export const FETCH_LOGOUT_REQUEST: 'FETCH_LOGOUT_REQUEST' = 'FETCH_LOGOUT_REQUEST';
export const FETCH_LOGOUT_SUCCESS: 'FETCH_LOGOUT_SUCCESS' = 'FETCH_LOGOUT_SUCCESS';
export const FETCH_LOGOUT_FAILED: 'FETCH_LOGOUT_FAILED' = 'FETCH_LOGOUT_FAILED';
export const FETCH_PASSWORD_RECOVER_REQUEST: 'FETCH_PASSWORD_RECOVER_REQUEST' = 'FETCH_PASSWORD_RECOVER_REQUEST';
export const FETCH_PASSWORD_RECOVER_SUCCESS: 'FETCH_PASSWORD_RECOVER_SUCCESS' = 'FETCH_PASSWORD_RECOVER_SUCCESS';
export const FETCH_PASSWORD_RECOVER_FAILED: 'FETCH_PASSWORD_RECOVER_FAILED' = 'FETCH_PASSWORD_RECOVER_FAILED';
export const FETCH_PASSWORD_RESET_REQUEST: 'FETCH_PASSWORD_RESET_REQUEST' = 'FETCH_PASSWORD_RESET_REQUEST';
export const FETCH_PASSWORD_RESET_SUCCESS: 'FETCH_PASSWORD_RESET_SUCCESS' = 'FETCH_PASSWORD_RESET_SUCCESS';
export const FETCH_PASSWORD_RESET_FAILED: 'FETCH_PASSWORD_RESET_FAILED' = 'FETCH_PASSWORD_RESET_FAILED';
export const FETCH_EDIT_USER_REQUEST: 'FETCH_EDIT_USER_REQUEST' = 'FETCH_EDIT_USER_REQUEST';
export const FETCH_EDIT_USER_SUCCESS: 'FETCH_EDIT_USER_SUCCESS' = 'FETCH_EDIT_USER_SUCCESS';
export const FETCH_EDIT_USER_FAILED: 'FETCH_EDIT_USER_FAILED' = 'FETCH_EDIT_USER_FAILED';

// ======= ACTION CREATORS =============================================================================
/** TYPES общие ------------ */
type TUserData = {
  email: string;
  name: string;
}
type TFetchUserResponse = {
  user: TUserData;
  success: boolean;
};

type TServerResResetPassLogout = {
  success: boolean,
  message: string
}

type TServerResRegisterLogin = {
  success: boolean,
  user: TUserData,
  accessToken: string,
  refreshToken: string
}

type TServerResRefToken = {
  success: boolean,
  accessToken: string,
  refreshToken: string
} 


/** TYPES обновления регистрации пользователя ------------ */
type TRegisterData = {
  success: boolean,
  user: TUserData,
  accessToken: string,
  refreshToken: string,
}
type TRegisterRequest = {
  readonly type: typeof FETCH_REGISTER_REQUEST
}
type TRegisterSuccess = {
  readonly type: typeof FETCH_REGISTER_SUCCESS,
  success: boolean,
  email: string,
  name: string,
  accessToken: string,
  refreshToken: string,
}
type TRegisterFailed = {
  readonly type: typeof FETCH_REGISTER_FAILED,
  error: string,
}
/** action creators регистрации */
export function fetchRegisterRequest(): TRegisterRequest {
  return { type: FETCH_REGISTER_REQUEST };
};
export function fetchRegisterSuccess(data: TRegisterData): TRegisterSuccess {
  return {
    type: FETCH_REGISTER_SUCCESS,
    success: data.success,
    email: data.user.email,
    name: data.user.name,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken
  };
};
export function fetchRegisterFailed(err: Error): TRegisterFailed {
  return { type: FETCH_REGISTER_FAILED, error: err.message };
};


/** TYPES обновления данных пользователя ------------ */
type TLoginRequest = {
  readonly type: typeof FETCH_LOGIN_REQUEST,
}
type TLoginSuccess = {
  readonly type: typeof FETCH_LOGIN_SUCCESS,
  success: boolean,
  email: string,
  name: string,
  accessToken: string,
  refreshToken: string,
}
type TLoginFailed = {
  readonly type: typeof FETCH_LOGIN_FAILED,
  error: string,
}
type TLoginData = {
  success: boolean,
  user: TUserData;
  accessToken: string,
  refreshToken: string,
}
/** action creators логина */
export function fetchLoginRequest(): TLoginRequest {
  return { type: FETCH_LOGIN_REQUEST };
};
export function fetchLoginSuccess(data: TLoginData): TLoginSuccess {
  return {
    type: FETCH_LOGIN_SUCCESS,
    success: data.success,
    email: data.user.email,
    name: data.user.name,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken
  };
};
export function fetchLoginFailed(err: Error): TLoginFailed {
  return { type: FETCH_LOGIN_FAILED, error: err.message };
};


/** TYPES обновления токена ------------ */
type TFetchToken = {
  success: boolean,
  accessToken: string,
  refreshToken: string,
}
type TTokenRequest = {
  readonly type: typeof FETCH_TOKEN_REQUEST,
}
type TTokenSuccess = {
  readonly type: typeof FETCH_TOKEN_SUCCESS,
  accessToken: string,
  refreshToken: string,
}
type TTokenFailed = {
  readonly type: typeof FETCH_TOKEN_FAILED,
  error: string,
}
/** action creators обновления токена */
export function fetchTokenRequest(): TTokenRequest {
  return { type: FETCH_TOKEN_REQUEST };
};
export function fetchTokenSuccess(data: TFetchToken): TTokenSuccess {
  return {
    type: FETCH_TOKEN_SUCCESS,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};
export function fetchTokenFailed(err: Error): TTokenFailed {
  return { type: FETCH_TOKEN_FAILED, error: err.message };
};


/** TYPES обновления данных пользователя ------------ */
type TAuthUserRequest = {
  readonly type: typeof FETCH_AUTH_USER_REQUEST,
}
type TAuthUserSuccess = {
  readonly type: typeof FETCH_AUTH_USER_SUCCESS,
  email: string,
  name: string,
  success: boolean,
  isAuthChecked: boolean,
}
type TAuthUserFailed = {
  readonly type: typeof FETCH_AUTH_USER_FAILED,
  error: string,
}

type TAuthUserRequestAction = () => TAuthUserRequest;
type TAuthUserSuccessAction = (response: TFetchUserResponse) => TAuthUserSuccess;
type TAuthUserFailedAction = (error: Error) => TAuthUserFailed;

export type TActionCreatorsUpdateUser = {
  request: TAuthUserRequestAction,
  success: TAuthUserSuccessAction,
  failure: TAuthUserFailedAction,
}
/** action creators обновления данных пользователя */
export function fetchAuthUserRequest(): TAuthUserRequest {
  return { type: FETCH_AUTH_USER_REQUEST };
};
export function fetchAuthUserSuccess(data: TFetchUserResponse): TAuthUserSuccess {
  return {
    type: FETCH_AUTH_USER_SUCCESS,
    email: data.user.email,
    name: data.user.name,
    success: data.success,
    isAuthChecked: data.success,
  };
};
export function fetchAuthUserFailed(error: Error): TAuthUserFailed {
  return { type: FETCH_AUTH_USER_FAILED, error: error.message };
};


/** TYPES LogOut ------------ */
type TLogOutRequest = {
  readonly type: typeof FETCH_LOGOUT_REQUEST,
}
type TLogOutSuccess = {
  readonly type: typeof FETCH_LOGOUT_SUCCESS,
  accessToken: string,
  refreshToken: string,
  success: boolean,
}
type TLogOutFailed = {
  readonly type: typeof FETCH_LOGOUT_FAILED,
  error: string,
}
/** action creators LogOut */
export function fetchLogOutRequest(): TLogOutRequest {
  return { type: FETCH_LOGOUT_REQUEST };
};
export function fetchLogOutSuccess(data: TServerResResetPassLogout): TLogOutSuccess {
  return {
    type: FETCH_LOGOUT_SUCCESS,
    accessToken: "",
    refreshToken: "",
    success: data.success,
  };
};
export function fetchLogOutFailed(error: Error): TLogOutFailed {
  return { type: FETCH_LOGOUT_FAILED, error: error.message };
};


/** TYPES восстановления пароля  ------------ */
type TPasswordRecoverRequest = {
  readonly type: typeof FETCH_PASSWORD_RECOVER_REQUEST,
}
type TPasswordRecoverSuccess = {
  readonly type: typeof FETCH_PASSWORD_RECOVER_SUCCESS,
  success: boolean,
  isPassRecover: boolean,
}
type TPasswordRecoverFailed = {
  readonly type: typeof FETCH_PASSWORD_RECOVER_FAILED,
  error: string,
}
/** action creator восстановления пароля */
export function fetchPasswordRecoverRequest(): TPasswordRecoverRequest {
  return { type: FETCH_PASSWORD_RECOVER_REQUEST };
};
export function fetchPasswordRecoverSuccess(data: TServerResResetPassLogout): TPasswordRecoverSuccess {
  return {
    type: FETCH_PASSWORD_RECOVER_SUCCESS,
    success: data.success,
    isPassRecover: data.success,
  };
};
export function fetchPasswordRecoverFailed(error: Error): TPasswordRecoverFailed {
  return { type: FETCH_PASSWORD_RECOVER_FAILED, error: error.message };
};

/** TYPES сброса пароля  ------------ */
type TPasswordResetRequest = {
  readonly type: typeof FETCH_PASSWORD_RESET_REQUEST,
}
type TPasswordResetSuccess = {
  readonly type: typeof FETCH_PASSWORD_RESET_SUCCESS,
  success: boolean,
  reset: boolean,
}
type TPasswordResetFailed = {
  readonly type: typeof FETCH_PASSWORD_RESET_FAILED,
  error: string,
}
/** action creators сброса пароля */
export function fetchPasswordResetRequest(): TPasswordResetRequest {
  return { type: FETCH_PASSWORD_RESET_REQUEST };
};
export function fetchPasswordResetSuccess(data: TServerResResetPassLogout): TPasswordResetSuccess {
  return {
    type: FETCH_PASSWORD_RESET_SUCCESS,
    success: data.success,
    reset: data.success
  };
};
export function fetchPasswordResetFailed(error: Error): TPasswordResetFailed {
  return { type: FETCH_PASSWORD_RESET_FAILED, error: error.message };
};


/** TYPES изменения данных пользователя ------------ */
type TEditUserRequest = {
  readonly type: typeof FETCH_EDIT_USER_REQUEST,
}
type TEditUserSuccess = {
  readonly type: typeof FETCH_EDIT_USER_SUCCESS,
  email: string,
  name: string,
  success: boolean,
}
type TEditUserFailed = {
  readonly type: typeof FETCH_EDIT_USER_FAILED,
  error: string,
}

type TEditUserRequestAction = () => TEditUserRequest;
type TEditUserSuccessAction = (response: TFetchUserResponse) => TEditUserSuccess;
type TEditUserFailedAction = (error: Error) => TEditUserFailed;

type TActionCreatorsEditUser = {
  request: TEditUserRequestAction,
  success: TEditUserSuccessAction,
  failure: TEditUserFailedAction,
}
/** action creators изменения данных пользователя */
export function fetchEditUserRequest(): TEditUserRequest {
  return { type: FETCH_EDIT_USER_REQUEST };
};
export function fetchEditUserSuccess(response: TFetchUserResponse): TEditUserSuccess {
  return {
    type: FETCH_EDIT_USER_SUCCESS,
    email: response.user.email,
    name: response.user.name,
    success: response.success
  };
};
export function fetchEditUserFailed(error: Error): TEditUserFailed {
  return { type: FETCH_EDIT_USER_FAILED, error: error.message };
};

export type TLoginActions = TLoginRequest | TLoginSuccess | TLoginFailed;
export type TUpdateCurrentUserActions = TAuthUserRequest | TAuthUserSuccess | TAuthUserFailed;
export type TEditUserActions = TEditUserRequest | TEditUserSuccess | TEditUserFailed;
export type TTokenActions = TTokenRequest | TTokenSuccess | TTokenFailed;
export type TLogOutActions = TLogOutRequest | TLogOutSuccess | TLogOutFailed;
export type TPasswordRecoverActions = TPasswordRecoverRequest | TPasswordRecoverSuccess | TPasswordRecoverFailed;
export type TPasswordResetActions = TPasswordResetRequest | TPasswordResetSuccess | TPasswordResetFailed;
export type TRegisterActions = TRegisterRequest | TRegisterSuccess | TRegisterFailed;

export type TUserActions = TLoginActions | TUpdateCurrentUserActions | TEditUserActions | TTokenActions |
  TLogOutActions | TPasswordRecoverActions | TPasswordResetActions | TRegisterActions;

// ======= ACTIONS ========================================================================================

/** action регистрации пользователя */
export function registerUser(user: TRegisterUser): AppThunk<void> {
  return async function (dispatch: Dispatch) {
    dispatch(fetchRegisterRequest());
    try {
      const response = await api.registerUser<TServerResRegisterLogin>(user);
      setCookie("refreshToken", response.refreshToken);
      setCookie("accessToken", response.accessToken.split("Bearer ")[1], { expires: 1200 });
      dispatch(fetchRegisterSuccess(response));
    } catch (error) {
      if (error instanceof Error && (error.message as string)) {
        dispatch(
          fetchRegisterFailed(error));
        console.log('Ошибка, не получилось зарегистрировать пользователя', error);
      } else {
        console.log('Неожиданная ошибка регистрации error message', error);
      }
    }
  }
};

/** action логина пользователя */
export function loginUser(user: TLoginUser): AppThunk<void> {
  return async function (dispatch: Dispatch) {
    dispatch(fetchLoginRequest());
    try {
      const response = await api.loginUser<TServerResRegisterLogin>(user);
      setCookie("refreshToken", response.refreshToken);
      setCookie("accessToken", response.accessToken.split("Bearer ")[1], { expires: 1200 });
      const acctoken = getCookie('accessToken');
      const refftoken = getCookie('refreshToken');
      console.log('получение acctoken куки' + acctoken);
      console.log('получение refftoken куки' + refftoken);
      dispatch(fetchLoginSuccess(response));
    } catch (error) {
      if (error instanceof Error && (error.message as string)) {
        dispatch(
          fetchLoginFailed(error));
        console.log('Ошибка, не получилось войти', error);
      } else {
        console.log('Неожиданная ошибка error message', error);
      }
    }
  }
};

/** action обновления токена пользователя */
export function updateUserToken(token: string | undefined): AppThunk<void> {
  return async function (dispatch: Dispatch) {
    dispatch(fetchTokenRequest());
    try {
      const response = await api.refreshToken<TServerResRefToken>(token);
      setCookie("accessToken", response.accessToken.split("Bearer ")[1], { expires: 1200 });
      setCookie("refreshToken", response.refreshToken);
      dispatch(fetchTokenSuccess(response));
    } catch (error: any) {
      if (error instanceof Error && (error.message as string)) {
      dispatch(fetchTokenFailed(error));
      console.log('Ошибка, не получилось обновить токен', error);
      } else {
        console.log('Неожиданная ошибка обновления токена error massage', error);
      }
    }
  }
};

/** action LogOut пользователя */
export function logOut(refreshToken: string | undefined): AppThunk<void> {
  return async function (dispatch: Dispatch) {
    dispatch(fetchLogOutRequest());
    try {
      const response = await api.logOut<TServerResResetPassLogout>(refreshToken);
      setCookie("accessToken", "");
      setCookie("refreshToken", "");
      const acctoken = getCookie('accessToken');
      const refftoken = getCookie('refreshToken');
      console.log('очищение acctoken куки' + acctoken);
      console.log('очищение refftoken куки' + refftoken);
      dispatch(fetchLogOutSuccess(response));
      console.log('logOut', response.message); //убрать при сдаче
    } catch (error) {
      if (error instanceof Error && (error.message as string)) {
        dispatch(fetchLogOutFailed(error));
        console.log('Ошибка, не получилось выйти', error);
      } else {
        console.log('Неожиданная ошибка logOut error message', error);
      }
    }
  }
};

/** action восстановления пароля */
export function passwordRecover(email: string) {
  return async function (dispatch: Dispatch) {
    dispatch(fetchPasswordRecoverRequest());
    try {
      const response = await api.recoverPassword<TServerResResetPassLogout>(email);
      dispatch(fetchPasswordRecoverSuccess(response));
      console.log('passwordRecover', response.message); //убрать при сдаче
    } catch (error) {
      if (error instanceof Error && (error.message as string)) {
        dispatch(fetchPasswordRecoverFailed(error));
        console.log('Ошибка, не получилось восстановить пароль', error);
      } else {
        console.log('Неожиданная ошибка passwordRecover error message', error);
      }
    }
  }
};

// /** action сброса пароля */
export function passwordReset(inputPassword: string, inputCode: string) {
  return async function (dispatch: Dispatch) {
    dispatch(fetchPasswordResetRequest());
    try {
      const response = await api.resetPassword<TServerResResetPassLogout>(inputPassword, inputCode);
      dispatch(fetchPasswordResetSuccess(response));
      console.log('resetPassword', response.message);
    } catch (error) {
      if (error instanceof Error && (error.message as string)) {
        dispatch(fetchPasswordResetFailed(error));
        console.log('Ошибка, не получилось сбросить пароль', error);
      } else {
        console.log('Неожиданная ошибка passwordReset error message', error);
      }
    }
  }
};

// ---- fetchWithRefresh ----------------------------------------------------------------------
const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

//универсальная функция запроса на сервер и обновления токена в случае ошибки
type TFetchOptionsBase = {
  method: string;
  headers: {
    "Content-Type": string;
    authorization: string;
  };
};
type TFetchOptions = TFetchOptionsBase & {
  body: string;
};

export const fetchWithRefresh = async (
  dispatch: Dispatch<any> | AppDispatch,
  // customDispatch: AppDispatch | AppThunk,
  // customDispatch: Dispatch<AppThunk | AppDispatch>,
  // customDispatch: Dispatch<any> | AppDispatch,
  url: string,
  options: TFetchOptionsBase | TFetchOptions,
  actionCreators: TActionCreatorsEditUser | TActionCreatorsUpdateUser | TActionCreatorsOrder
) => {
  const { request, success, failure } = actionCreators;
  dispatch(request());
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    try {
      const response = await fetch(url, options);
      const res = await checkResponse(response);
      dispatch(success(res));
    } catch (error) {
      if (error instanceof Error && ['jwt expired', 'jwt malformed'].includes(error.message as string)) {
        dispatch(updateUserToken(getCookie('refreshToken')));//рефрешу токен и записываю в куки
        const response = await fetch(url, options); //снова пробую авторизоваться
        const res = await checkResponse(response);
        dispatch(success(res));
      } else {
        dispatch(failure(error as Error));
      }
    }
  }
};

// // ---- actions на fetchWithRefresh ----------------------------------------------------------------------
export function editUser(user: { email: string, name: string, password: string, }): AppThunk<void> {
  return async function (dispatch: Dispatch) {
    return fetchWithRefresh(dispatch, `${SERVER_URL}auth/user`,
      {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + getCookie('accessToken'),
        },
        body: JSON.stringify(user),
      },
      {
        request: fetchEditUserRequest,
        success: fetchEditUserSuccess,
        failure: fetchEditUserFailed,
      }
    );
  }
}

/**action обновления данных авторизованного пользователя */
export function updateCurrentUser(): AppThunk<void> {
  return async function (dispatch: Dispatch) {
    return fetchWithRefresh(dispatch, `${SERVER_URL}auth/user`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: "Bearer " + getCookie('accessToken'),
        },
      },
      {
        request: fetchAuthUserRequest,
        success: fetchAuthUserSuccess,
        failure: fetchAuthUserFailed,
      }
    );
  }
};
