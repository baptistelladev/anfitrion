import { IParking } from 'src/app/shared/models/IParking';
import { createAction, createReducer, createSelector, on, props, createFeatureSelector } from "@ngrx/store";
import { ILang } from "../models/ILang";
import { IPlace } from "../models/IPlace";
import { ITicket } from "../models/ITicket";
import { ISocialNetwork } from "../models/INetwork";
import { IContact } from "../models/IContact";

export interface IAppState {
  currentLanguage: ILang,
  currentEstablishment: IPlace,
  parkings: IParking[],
  appInfoNetworks: ISocialNetwork[],
  appInfoContact: IContact
}

export const appInitialState: IAppState = {
  parkings: [
    {
      name: '',
      value: '',
      adress: {
        type: {
          pt: '',
          en: '',
          es: ''
        },
        street: '',
        number: '',
        neighborhood: '',
        zip_code: ''
      },
      phone: {
        ddd: '',
        number: ''
      }
    }
  ],
  currentLanguage: {
    text: {
      pt: '',
      en: '',
      es: ''
    },
    value: ''
  },
  currentEstablishment: {
    isBuilding: false,
    isPremium: false,
    id: '',
    name: '',
    value: '',
    adress: {
      number: '',
      zip_code: '',
      street: '',
      neighborhood: '',
      type: {
        pt: '',
        en: '',
        es: ''
      }
    },
    specialty: [
      {
        value: '',
        text: {
          pt: '',
          en: '',
          es: ''
        }
      }
    ],
    mainType: {
      value: '',
      text: {
        pt: '',
        en: '',
        es: ''
      }
    },
    market_ticket_info: {
      accept_ticket: false,
      show_field: false,
      tickets: [
        {
          text: '',
          value: ''
        }
      ]
    },
    ticket_info: {
      accept_ticket: false,
      show_field: false,
      tickets: [
        {
          text: '',
          value: ''
        }
      ]
    },
    petfriendly_info: {
      accept_petfriendly: false,
      show_field: false
    },
    livemusic_info: {
      has_livemusic: false,
      show_field: false
    },
    air_conditioned_info: {
      has_air_conditioned: false,
      show_field: false
    },
    booking_info: {
      accept_booking: false,
      show_field: false
    },
    working_time: [
      {
        day_number: 0,
        text: {
          pt: '',
          en: '',
          es: ''
        },
        opening_time: [
          {
            close: '',
            open: ''
          }
        ]
      }
    ],
    phones: [
      {
        type: '',
        number: '',
        ddd: '',
        text: ''
      }
    ],
    networks: [
      {
        text: '',
        value: '',
        baseUrl: '',
        user: ''
      }
    ]
  },
  appInfoNetworks: [
    {
      text: '',
      value: '',
      baseUrl: '',
      user: ''
    }
  ],
  appInfoContact: {
    phone: {
      ddd: '',
      number: ''
    },
    email: {
      text: '',
      value: ''
    }
  }
}

// ACTIONS
export const setCurrentLanguage = createAction(
  '[APP] Definir idioma usado no app',
  props<{ language: ILang }>()
)

export const setCurrentEstablishment = createAction(
  '[APP] Definir estabelecimento selecionado',
  props<{ establishment: IPlace }>()
)

export const setAppInfoNetworks = createAction(
  '[APP] Definir redes sociais/contato do aplicativo',
  props<{ networks: ISocialNetwork[] }>()
)

export const setAppInfoContact = createAction(
  '[APP] Definir formas de contato do app',
  props<{ contact: IContact }>()
)

export const setParkings = createAction(
  '[APP] Definir estacionamentos',
  props<{ parkings: IParking[] }>()
)

export const appReducer = createReducer(
  appInitialState,
  on(
    setCurrentLanguage,
    (state, { language }): IAppState => ({ ...state, currentLanguage: language })
  ),
  on(
    setCurrentEstablishment,
    (state, { establishment }): IAppState => ({ ...state, currentEstablishment: establishment })
  ),
  on(
    setAppInfoNetworks,
    (state, { networks }): IAppState => ({ ...state, appInfoNetworks: networks })
  ),
  on(
    setAppInfoContact,
    (state, { contact }): IAppState => ({ ...state, appInfoContact: contact })
  ),
  on(
    setParkings,
    (state, { parkings }): IAppState => ({ ...state, parkings: parkings })
  )
)

// SELETORES
export const selectAppState = createFeatureSelector<IAppState>('app');

export const selectAppCurrentLanguage = createSelector(
  selectAppState,
  (state: IAppState) => state.currentLanguage
);

export const selectCurrentEstablishment = createSelector(
  selectAppState,
  (state: IAppState) => state.currentEstablishment
);

export const selectAppInfoNetworks = createSelector(
  selectAppState,
  (state: IAppState) => state.appInfoNetworks
);

export const selectAppInfoContact = createSelector(
  selectAppState,
  (state: IAppState) => state.appInfoContact
);

export const selectParkings = createSelector(
  selectAppState,
  (state: IAppState) => state.parkings
);
