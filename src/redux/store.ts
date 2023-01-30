import { AnyAction, Store } from "redux";

import thunk from "redux-thunk";

import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

export const store: Store<unknown, AnyAction> = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
