import { ISuggestion } from 'src/app/shared/models/ISuggestion';
import { IParking } from 'src/app/shared/models/IParking';
import { createAction, createReducer, createSelector, on, props, createFeatureSelector } from "@ngrx/store";
import { ILang } from "../models/ILang";
import { IPlace } from "../models/IPlace";
import { ITicket } from "../models/ITicket";
import { ISocialNetwork } from "../models/INetwork";
import { IContact } from "../models/IContact";
import { ICity } from '../models/ICity';

export interface IAppState {
  currentLanguage: ILang,
  currentCity: ICity,
  currentPlace: IPlace,
  appInfoNetworks: ISocialNetwork[],
  appInfoContact: IContact,
  currentSuggestion: ISuggestion,
  hasConnection: boolean
}

export const appInitialState: IAppState = {
  currentCity: {
    value: '',
    name: '',
    sigla: '',
    isDisabled: false,
    from: {
      pt: '',
      en: '',
      es: ''
    },
    in: {
      pt: '',
      en: '',
      es: ''
    },
    hasBeach: false
  },
  currentLanguage: {
    text: {
      pt: '',
      en: '',
      es: ''
    },
    value: ''
  },
  currentPlace: {
    beachInfo: {
      value: '',
      city: '',
      text: null,
      popularName: '',
      located: {
        from: {
          value: '',
          text: ''
        },
        operator: {
          text: '',
          value: ''
        },
        to: {
          value: '',
          text: ''
        }
      },
      in: null,
      location: {
        lat: 0,
        lng: 0
      },
      kmlCoordinates: []
    },
    mainBeach: '',
    delivery_sand: {
      make_delivery: false,
      delivery_is_free: false
    },
    festival_info: {
      has_any_festival_type: false,
      show_field: false,
      festivals: []
    },
    last_update: '',
    work_place: [],
    created_at: '',
    suggestions: [],
    isBuilding: false,
    isPremium: false,
    id: '',
    name: '',
    sub_name: '',
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
    origin: {
      value: '',
      name: '',
      sigla: '',
      isDisabled: false,
      from: {
        pt: '',
        en: '',
        es: ''
      },
      in: {
        pt: '',
        en: '',
        es: ''
      },
      hasBeach: false
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
    children_space: {
      has_space: false,
      show_field: false,
      is_paid: false
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
        user: '',
        appBaseUrl: ''
      }
    ]
  },
  appInfoNetworks: [
    {
      text: '',
      value: '',
      baseUrl: '',
      appBaseUrl: '',
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
  },
  currentSuggestion: {
    id: '',
    icon: '',
    hashtag: {
      pt: '',
      en: '',
      es: ''
    },
    name: {
      text: {
        pt: '',
        en: '',
        es: ''
      },
      title: {
        pt: '',
        en: '',
        es: ''
      }
    },
    value: '',
    created_at: '',
    updated_at: '',
    route: '',
    address: {
      pt: '',
      en: '',
      es: ''
    }
  },
  hasConnection: true
}

// ACTIONS
export const setCurrentLanguage = createAction(
  '[APP] Definir idioma usado no app',
  props<{ language: ILang }>()
)

export const setCurrentCity = createAction(
  '[APP] Definir cidade selecionada',
  props<{ city: ICity }>()
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

export const setCurrentSuggestion = createAction(
  '[APP] Definir sugestão selecionada',
  props<{ suggestion: ISuggestion }>()
)

export const setHasConnection = createAction(
  '[APP] Identificar se está com conexão á internet',
  props<{ hasConnection: boolean }>()
)

export const appReducer = createReducer(
  appInitialState,
  on(
    setCurrentLanguage,
    (state, { language }): IAppState => ({ ...state, currentLanguage: language })
  ),
  on(
    setCurrentCity,
    (state, { city }): IAppState => ({ ...state, currentCity: city })
  ),
  on(
    setCurrentEstablishment,
    (state, { establishment }): IAppState => ({ ...state, currentPlace: establishment })
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
    setCurrentSuggestion,
    (state, { suggestion }): IAppState => ({ ...state, currentSuggestion: suggestion })
  ),
  on(
    setHasConnection,
    (state, { hasConnection }): IAppState => ({ ...state, hasConnection: hasConnection })
  )
)

// SELETORES
export const selectAppState = createFeatureSelector<IAppState>('app');

export const selectAppCurrentLanguage = createSelector(
  selectAppState,
  (state: IAppState) => state.currentLanguage
);

export const selectAppCurrentCity = createSelector(
  selectAppState,
  (state: IAppState) => state.currentCity
);

export const selectCurrentEstablishment = createSelector(
  selectAppState,
  (state: IAppState) => state.currentPlace
);

export const selectAppInfoNetworks = createSelector(
  selectAppState,
  (state: IAppState) => state.appInfoNetworks
);

export const selectAppInfoContact = createSelector(
  selectAppState,
  (state: IAppState) => state.appInfoContact
);

export const selectCurrentSuggestion = createSelector(
  selectAppState,
  (state: IAppState) => state.currentSuggestion
);

export const selectHasConnection = createSelector(
  selectAppState,
  (state: IAppState) => state.hasConnection
);
