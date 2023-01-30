# Redux Thunk

**redux-thunk** é um middleware redux que pode ser integrado para retornar funções para o redux que pode interagir com o dispatch de forma assíncrona, de forma bem simples o redux-thunk permite que o dispatch possa fazer uma chamada em uma função para fazer requisição, por exemplo.

Para implementar o mesmo basta seguir os passos simples.

---

Começando com a **implementação** do **index** da pasta `@**types**`. Lembrando que a ultima parte ontem tem o tipo do reducer rootReducer pode ser implementado como está, mas depende da implementação do reducer e do rootReducer.

```tsx
import { AnyAction } from "redux";

import { ThunkDispatch } from "redux-thunk";

import rootReucer from "redux/reducers";

export interface UserState {
  login: string;
  avatar_url: string;
  name: string;
  location: string;
} // Tipo dos elementos do usuário

export interface userPropsState {
  user: UserState;
} // Tipo do usuário que tem o user que tem seus tipos

export interface GetUserProps {
  type: "GET_USER";
  payload: UserState;
} // Tipo de props dos users onde temos o tipo get para obter e o payload do tipo UserState

// Combina as interfaces de action em um único tipo para uso no reducer
export type ActionTypes = GetUserProps;

// Tipo para state do redux
export type ReduxState = ReturnType<typeof rootReucer>;
//Tipo para dispatch do redux
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
```

---

Após isso podemos **criar uma action** para obter os dados do usuário.

```tsx
import { Dispatch } from "redux";
// Obtem a configuração do axios
import api from "services/api";

import { UserState } from "redux/@types";

// Action para obter os dados do usuário
function getUserAction(user: UserState) {
  return {
    type: "GET_USER",
    payload: user,
  };
}

// Fetch para obter os dados na API.
export function getUser(name: string) {
  return (dispatch: Dispatch) => {
    api
      .get(`users/${name}`)
      .then((response) => dispatch(getUserAction(response.data)))
      .catch((error) => console.error(error));
  };
}
```

---

Com isso podemos **criar um reducer** do usuário e o rootReducer para unir todos reducer que iremos usar na nossa aplicação.

```tsx
import { ActionTypes, UserState } from "../@types";

// Inicializa com dados vazios antes de obter os dados.
const initialState: UserState = {
  avatar_url: "",
  location: "",
  login: "",
  name: "",
};

// Switch para definir qual será a action que irá ser executada e o que irá ser feito no state
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
```

```tsx
import { combineReducers } from "redux";

import { user } from "./user";

// Une todos reducers que iremos usar, neste caso só tem um
const rootReducer = combineReducers({
  user: user,
});

export default rootReducer;
```

---

Por fim, criamos nossa **store** para finalizar todo processo do redux, com isso temos: 

```tsx
import { AnyAction, Store } from "redux";

import thunk from "redux-thunk";

import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

// Criando store e aplicando o middleware thunk, que pode ser aplicado a parte
export const store: Store<unknown, AnyAction> = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
```

---

Por fim, implementamos o **provider no index.tsx** e podemos ver a implementação simples no App.tsx

```tsx
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

```tsx
import React, { FormEvent } from "react";

import { connect } from "react-redux";

import { userPropsState, TypedDispatch, UserState } from "./redux/@types";

import { getUser } from "./redux/actions/user";

interface AppProps {
  user: UserState;
  dispatch: TypedDispatch;
}

// Recebe a prop passada pelo connect
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

// Função para obter os states gerais
const mapStateToProps = (state: userPropsState) => state;
// Conecta no mapa o app container
export const App = connect(mapStateToProps)(AppContainer);
```

---

Pontos importantes:

- Configuração simples do axios:

```tsx
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/",
});

export default api;
```

- Bibliotecas para instalar:

```bash
yarn add axios redux redux-thunk @reduxjs/toolkit react-redux 
```
