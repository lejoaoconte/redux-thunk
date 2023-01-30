import { Dispatch } from "redux";

import api from "services/api";

import { UserState } from "redux/@types";

function getUserAction(user: UserState) {
  return {
    type: "GET_USER",
    payload: user,
  };
}

export function getUser(name: string) {
  return (dispatch: Dispatch) => {
    api
      .get(`users/${name}`)
      .then((response) => dispatch(getUserAction(response.data)))
      .catch((error) => console.error(error));
  };
}
