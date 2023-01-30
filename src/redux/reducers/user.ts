import { ActionTypes, UserState } from "../@types";

const initialState: UserState = {
  avatar_url: "",
  location: "",
  login: "",
  name: "",
};

export function user(state = initialState, action: ActionTypes) {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        avatar_url: action.payload.avatar_url,
        location: action.payload.location,
        name: action.payload.name,
        login: action.payload.login,
      };
    default:
      return state;
  }
}
