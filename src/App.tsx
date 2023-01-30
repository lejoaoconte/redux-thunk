import React, { FormEvent } from "react";

import { connect } from "react-redux";

import { userPropsState, TypedDispatch, UserState } from "./redux/@types";

import { getUser } from "./redux/actions/user";

interface AppProps {
  user: UserState;
  dispatch: TypedDispatch;
}

function AppContainer(props: AppProps) {
  const { dispatch, user } = props;

  function handleSubmitUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = e.currentTarget["username"].value;
    dispatch(getUser(user));
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <form onSubmit={handleSubmitUser}>
        <input type="text" name="username" />
        <button type="submit">Fetch User</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state: userPropsState) => state;
export const App = connect(mapStateToProps)(AppContainer);
