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
    kmlCoordinates: [
      { lat: -23.968751808155897, lng: -46.35661974643433 },
      { lat: -23.970026277361836, lng: -46.35660901759936 },
      { lat: -23.970359597997987, lng: -46.35450616594377 },
      { lat: -23.971310537427392, lng: -46.352929027202066 },
      { lat: -23.9714085720211, lng: -46.35268226399758 },
      { lat: -23.971261520102566, lng: -46.35223165292852 },
      { lat: -23.97087918432902, lng: -46.351148040595795 },
      { lat: -23.971222306229283, lng: -46.35072961603167 },
      { lat: -23.972016384837442, lng: -46.35072961603167 },
      { lat: -23.972408520616792, lng: -46.35036483564244 },
      { lat: -23.97238891385617, lng: -46.350021512923156 },
      { lat: -23.97210461549183, lng: -46.349699647873834 },
      { lat: -23.9705556685577, lng: -46.34975329204872 },
      { lat: -23.969222382868836, lng: -46.349721105543786 },
      { lat: -23.969124346611995, lng: -46.34721055815905 },
      { lat: -23.96968805407037, lng: -46.3463254292734 },
      { lat: -23.96977628631893, lng: -46.3457514366021 },
      { lat: -23.968064516843715, lng: -46.345764393887144 },
      { lat: -23.967910474323745, lng: -46.34731531707903 },
      { lat: -23.96811381041123, lng: -46.349014589445815 },
      { lat: -23.968280176062382, lng: -46.34950009583632 },
      { lat: -23.968551289996697, lng: -46.35121959763603 },
      { lat: -23.96848351156659, lng: -46.35137468995522 },
      { lat: -23.968477349889355, lng: -46.35189391206729 },
      { lat: -23.968902801680557, lng: -46.35604078381653 },
      { lat: -23.968751808155897, lng: -46.35661974643433 }
    ]
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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

