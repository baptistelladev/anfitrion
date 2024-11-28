import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store"
import { IUSer } from "../models/IUser"

export interface IUserState {
  user: IUSer,
  canAccessEighteenContent: boolean
}

export const userInitialState: IUserState = {
  user: {
    firstName: '',
    uid: '',
    email: '',
    createdAt: '',
    lastName: '',
    birthDate: '',
    userType: '',
    sex: ''
  },
  canAccessEighteenContent: true
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

export const setEighteenAccess = createAction(
  '[USER] Permitir acesso a conteúdo +18',
  props<{ canAccessEighteenContent: boolean }>()
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
  ),
  on(
    setEighteenAccess,
    (state, { canAccessEighteenContent }): IUserState => ({ ...state, canAccessEighteenContent: canAccessEighteenContent })
  )
)

// SELETORES
export const selectUserState = createFeatureSelector<IUserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: IUserState) => state.user
);

export const selectAccessEighteenContent = createSelector(
  selectUserState,
  (state: IUserState) => state.canAccessEighteenContent
);
