import { SantosBeachEnum, SaoVicenteBeachEnum } from "../enums/Beach";
import { CityEnum } from "../enums/City";
import { IBeach } from "../models/IBeach";

export const MOCK_SANTOS_BEACHES: IBeach[] = [
  {
    value: 'ALL',
    city: '',
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
          pt: 'disponíveis',
          en: 'available',
          es: 'disponibles'
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
    }
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
        value: 'ENTRE'
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
    city: '',
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
          pt: 'disponíveis',
          en: 'available',
          es: 'disponibles'
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
    }
  },
  {
    value: SaoVicenteBeachEnum.ITARARE,
    city: CityEnum.SANTOS,
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
        text: 'Canal 1'
      }
    },
    in: {
      pt: 'na',
      en: 'on',
      es: 'en la'
    }
  }
]

