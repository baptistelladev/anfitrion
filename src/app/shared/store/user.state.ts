import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store"
import { IUSer } from "../models/IUser"

export interface IUserState {
  user: IUSer
}

export const userInitialState: IUserState = {
  user: {
    firstName: '',
    uid: '',
    email: ''
  }
}

// ACTIONS
export const setUser = createAction(
  '[USER] Definir usuário logado',
  props<{ user: IUSer }>()
)

export const setUserEmail = createAction(
  '[USER] Definir email do usuário logado',
  props<{ email: string }>()
)

export const userReducer = createReducer(
  userInitialState,
  on(
    setUser,
    (state, { user }): IUserState => ({ ...state, user: user })
  ),
  on(
    setUserEmail,
    (state, { email }): IUserState => ({ ...state, user: { ...state.user, email: email }  })
  )
)

// SELETORES
export const selectUserState = createFeatureSelector<IUserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: IUserState) => state.user
);
