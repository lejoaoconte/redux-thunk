import { AnyAction } from "redux";

import { ThunkDispatch } from "redux-thunk";

import rootReducer from "redux/reducers";

export interface UserState {
  login: string;
  avatar_url: string;
  name: string;
  location: string;
}

export interface userPropsState {
  user: UserState;
}

export interface GetUserProps {
  type: "GET_USER";
  payload: UserState;
}

export type ActionTypes = GetUserProps;

export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
