import { SantosBeachEnum } from "../enums/Beach";
import { CityEnum } from "../enums/City";
import { IBeach } from "../models/IBeach";

export const MOCK_SANTOS_BEACHES: IBeach[] = [
  {
    value: 'ALL',
    city: '',
    text: {
      pt: 'Todas',
      en: 'All',
      es: 'Todas'
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
    }
  },
  {
    value: SantosBeachEnum.JOSE_MENINO,
    city: CityEnum.SANTOS,
    text: 'José Menino',
    popularName: '',
    located: {
      from: {
        value: '',
        text: 'Emissário'
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
    }
  },
  {
    value: SantosBeachEnum.GONZAGA,
    city: CityEnum.SANTOS,
    text: 'Gonzaga',
    popularName: '',
    located: {
      from: {
        value: '',
        text: ''
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
        text: ''
      }
    }
  },
  {
    value: SantosBeachEnum.BOQUEIRAO,
    city: CityEnum.SANTOS,
    text: 'Boqueirão',
    popularName: '',
    located: {
      from: {
        value: '',
        text: ''
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
        text: ''
      }
    }
  },
  {
    value: SantosBeachEnum.EMBARE,
    city: CityEnum.SANTOS,
    text: 'Embaré',
    popularName: '',
    located: {
      from: {
        value: '',
        text: ''
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
        text: ''
      }
    }
  },
  {
    value: SantosBeachEnum.APARECIDA,
    city: CityEnum.SANTOS,
    text: 'Aparecida',
    popularName: '',
    located: {
      from: {
        value: '',
        text: ''
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
        text: ''
      }
    }
  },
  {
    value: SantosBeachEnum.PONTA_DA_PRAIA,
    city: CityEnum.SANTOS,
    text: 'Ponta da Praia',
    popularName: '',
    located: {
      from: {
        value: '',
        text: ''
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
        text: ''
      }
    }
  },
  {
    value: SantosBeachEnum.POMPEIA,
    city: CityEnum.SANTOS,
    text: 'Pompéia',
    popularName: '',
    located: {
      from: {
        value: '',
        text: ''
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
        text: ''
      }
    }
  }
]

