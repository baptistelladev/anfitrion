import { SantosBeachEnum, SaoVicenteBeachEnum } from "../enums/Beach";
import { CityEnum } from "../enums/City";
import { IBeach } from "../models/IBeach";

export const MOCK_SANTOS_BEACHES: IBeach[] = [
  {
    value: 'ALL',
    city: CityEnum.SANTOS,
    text: {
      pt: 'Todas as praias',
      en: 'All beaches',
      es: 'Todas las playas'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: ''
      },
      operator: {
        text: {
          pt: 'Disponíveis',
          en: 'Available',
          es: 'Disponibles'
        },
        value: ''
      },
      to: {
        value: '',
        text: ''
      }
    },
    in: {
      pt: 'em',
      en: 'on',
      es: 'en todas'
    },
    location: {
      lat: 0,
      lng: 0
    },
    kmlCoordinates: []
  },
  {
    value: SantosBeachEnum.JOSE_MENINO,
    city: CityEnum.SANTOS,
    text: {
      pt: 'Praia do José Menino',
      es: 'Playa de José Menino',
      en: 'José Menino Beach'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: 'Divisa'
      },
      operator: {
        text: {
          pt: 'até',
          en: 'until',
          es: 'a'
        },
        value: 'ATE'
      },
      to: {
        value: '',
        text: 'Canal 1'
      }
    },
    in: {
      pt: 'na',
      en: 'on',
      es: 'en la'
    },
    location: {
      lat: -23.969867,
      lng: -46.350651
    },
    kmlCoordinates: []
  },
  {
    value: SantosBeachEnum.POMPEIA,
    city: CityEnum.SANTOS,
    text: {
      pt: 'Praia do Pompéia',
      es: 'Playa de Pompéia',
      en: 'Pompéia Beach'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: 'Canal 1'
      },
      operator: {
        text: {
          pt: 'até',
          en: 'until',
          es: 'a'
        },
        value: 'ENTRE'
      },
      to: {
        value: '',
        text: 'Canal 2'
      }
    },
    in: {
      pt: 'na',
      en: 'on',
      es: 'en la'
    },
    location: {
      lat: -23.969121965234972,
      lng: -46.34263554212077
    },
    kmlCoordinates: []
  },
  {
    value: SantosBeachEnum.GONZAGA,
    city: CityEnum.SANTOS,
    text: {
      pt: 'Praia do Gonzaga',
      es: 'Playa de Gonzaga',
      en: 'Gonzaga Beach'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: 'Canal 2'
      },
      operator: {
        text: {
          pt: 'até',
          en: 'until',
          es: 'a'
        },
        value: 'ENTRE'
      },
      to: {
        value: '',
        text: 'Canal 3'
      }
    },
    in: {
      pt: 'na',
      en: 'on',
      es: 'en la'
    },
    location: {
      lat: -23.970552455131553,
      lng: -46.33425639263376
    },
    kmlCoordinates: []
  },
  {
    value: SantosBeachEnum.BOQUEIRAO,
    city: CityEnum.SANTOS,
    text: {
      pt: 'Praia do Boqueirão',
      en: 'Boqueirão Beach',
      es: 'Playa de Boqueirão'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: 'Canal 3'
      },
      operator: {
        text: {
          pt: 'até',
          en: 'until',
          es: 'a'
        },
        value: 'ENTRE'
      },
      to: {
        value: '',
        text: 'Canal 4'
      }
    },
    in: {
      pt: 'na',
      en: 'on',
      es: 'en la'
    },
    location: {
      lat: -23.972813959159687,
      lng: -46.32581760530018
    },
    kmlCoordinates: []
  },
  {
    value: SantosBeachEnum.EMBARE,
    city: CityEnum.SANTOS,
    text: {
      pt: 'Praia do Embaré',
      en: 'Embaré Beach',
      es: 'Playa de Embaré'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: 'Canal 4'
      },
      operator: {
        text: {
          pt: 'até',
          en: 'until',
          es: 'a'
        },
        value: 'ENTRE'
      },
      to: {
        value: '',
        text: 'Canal 5'
      }
    },
    in: {
      pt: 'na',
      en: 'on',
      es: 'en la'
    },
    location: {
      lat: -23.976451355287853,
      lng: -46.31861630764783
    },
    kmlCoordinates: []
  },
  {
    value: SantosBeachEnum.APARECIDA,
    city: CityEnum.SANTOS,
    text: {
      pt: 'Praia da Aparecida',
      en: 'Aparecida Beach',
      es: 'Playa de Aparecida'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: 'Canal 5'
      },
      operator: {
        text: {
          pt: 'até',
          en: 'until',
          es: 'a'
        },
        value: 'ENTRE'
      },
      to: {
        value: '',
        text: 'Canal 6'
      }
    },
    in: {
      pt: 'na',
      en: 'on',
      es: 'en la'
    },
    location: {
      lat: -23.98135554702469,
      lng: -46.31253322417445
    },
    kmlCoordinates: []
  },
  {
    value: SantosBeachEnum.PONTA_DA_PRAIA,
    city: CityEnum.SANTOS,
    text: {
      pt: 'Praia da Ponta da Praia',
      en: 'Ponta da Praia Beach',
      es: 'Playa de Ponta da Praia'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: 'Canal 6'
      },
      operator: {
        text: {
          pt: 'até',
          en: 'until',
          es: 'a'
        },
        value: 'ENTRE'
      },
      to: {
        value: '',
        text: 'Balsa Santos/Guarujá'
      }
    },
    in: {
      pt: 'na',
      en: 'on',
      es: 'en la'
    },
    location: {
      lat: -23.98538774251839,
      lng: -46.30940222554454
    },
    kmlCoordinates: []
  }
]

export const MOCK_SAO_VICENTE_BEACHES: IBeach[] = [
  {
    value: 'ALL',
    city: CityEnum.SAO_VICENTE,
    text: {
      pt: 'Todas as praias',
      en: 'All beaches',
      es: 'Todas las playas'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: ''
      },
      operator: {
        text: {
          pt: 'Disponíveis',
          en: 'Available',
          es: 'Disponibles'
        },
        value: ''
      },
      to: {
        value: '',
        text: ''
      }
    },
    in: {
      pt: 'em',
      en: 'on',
      es: 'en todas'
    },
    location: {
      lat: 0,
      lng: 0
    },
    kmlCoordinates: []
  },
  {
    value: SaoVicenteBeachEnum.ITARARE,
    city: CityEnum.SAO_VICENTE,
    text: {
      pt: 'Praia do Itararé',
      es: 'Playa de Itararé',
      en: 'Itararé Beach'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: 'Divisa'
      },
      operator: {
        text: {
          pt: 'até',
          en: 'until',
          es: 'a'
        },
        value: 'ENTRE'
      },
      to: {
        value: '',
        text: 'R. Saldanha da Gama'
      }
    },
    in: {
      pt: 'na',
      en: 'on',
      es: 'en la'
    },
    location: {
      lat: -23.97167889629475,
      lng: -46.36682825819055
    },
    kmlCoordinates: []
  },
  {
    value: SaoVicenteBeachEnum.MILIONARIOS,
    city: CityEnum.SAO_VICENTE,
    text: {
      pt: 'Praia dos Milionários',
      es: 'Playa de los Milionarios',
      en: 'Milionários Beach'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: 'Ilha Porchat'
      },
      operator: {
        text: {
          pt: 'até',
          en: 'until',
          es: 'a'
        },
        value: 'ENTRE'
      },
      to: {
        value: '',
        text: 'Burgman'
      }
    },
    in: {
      pt: 'na',
      en: 'on',
      es: 'en la'
    },
    location: {
      lat: -23.975994198335087,
      lng: -46.371669476317834
    },
    kmlCoordinates: []
  },
  {
    value: SaoVicenteBeachEnum.PONTINHA_DA_PRAIA,
    city: CityEnum.SAO_VICENTE,
    text: {
      pt: 'Praia Pontinha da Praia',
      es: 'Playa Pontinha de la Playa',
      en: 'Pontinha da Praia Beach'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: 'Milionários'
      },
      operator: {
        text: {
          pt: 'até',
          en: 'until',
          es: 'a'
        },
        value: 'ATE'
      },
      to: {
        value: '',
        text: 'Gonzaguinha'
      }
    },
    in: {
      pt: 'na',
      en: 'on',
      es: 'en la'
    },
    location: {
      lat: -23.97033645432574,
      lng: -46.374620226101484
    },
    kmlCoordinates: []
  },
  {
    value: SaoVicenteBeachEnum.PARANAPUA,
    city: CityEnum.SAO_VICENTE,
    text: {
      pt: 'Praia de Paranapuã',
      es: 'Playa Paranapuã',
      en: 'Paranapuã Beach'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: ''
      },
      operator: {
        text: {
          pt: 'próximo á Ponte Pênsil',
          en: 'Next to the Ponte Pênsil',
          es: 'Cerca del Ponte Pênsil'
        },
        value: ''
      },
      to: {
        value: '',
        text: ''
      }
    },
    in: {
      pt: 'na',
      en: 'on',
      es: 'en la'
    },
    location: {
      lat: -23.97812036192007,
      lng: -46.385824165278024
    },
    kmlCoordinates: []
  },
  {
    value: SaoVicenteBeachEnum.ITAQUITANDUVA,
    city: CityEnum.SAO_VICENTE,
    text: {
      pt: 'Praia do Itaquitanduva',
      es: 'Playa Itaquitanduva',
      en: 'Itaquitanduva Beach'
    },
    popularName: '',
    located: {
      from: {
        value: '',
        text: ''
      },
      operator: {
        text: {
          pt: 'Próximo a Itaquitanduva',
          en: 'Near Itaquitanduva',
          es: 'Cerca de Itaquitanduva'
        },
        value: ''
      },
      to: {
        value: '',
        text: ''
      }
    },
    in: {
      pt: 'na',
      en: 'on',
      es: 'en la'
    },
    location: {
      lat: -24.000217336106452,
      lng: -46.39233134738474
    },
    kmlCoordinates: []
  }
]
