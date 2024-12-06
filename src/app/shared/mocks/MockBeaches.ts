import { SantosBeachEnum } from "../enums/Beach";
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
    }
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

