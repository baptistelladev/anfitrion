import { CityEnum } from "../enums/City";
import { ICity } from "../models/ICity";

export const MOCK_CITIES: ICity[] = [
  {
    value: CityEnum.SAO_VICENTE,
    name: 'São Vicente',
    sigla: 'sv',
    isDisabled: false,
    from: {
      pt: 'de',
      en: 'from',
      es: 'de'
    },
    in: {
      pt: 'em',
      en: 'in',
      es: 'en'
    }
  },
  {
    value: CityEnum.SANTOS,
    name: 'Santos',
    sigla: 'santos',
    isDisabled: false,
    from: {
      pt: 'de',
      en: 'from',
      es: 'de'
    },
    in: {
      pt: 'em',
      en: 'in',
      es: 'en'
    }
  },
  {
    value: CityEnum.PRAIA_GRANDE,
    name: 'Praia Grande',
    sigla: 'pg',
    isDisabled: true,
    from: {
      pt: 'de',
      en: 'from',
      es: 'de'
    },
    in: {
      pt: 'na',
      en: 'at',
      es: 'en la'
    }
  },
  {
    value: CityEnum.GUARUJA,
    name: 'Guarujá',
    sigla: 'guaru',
    isDisabled: true,
    from: {
      pt: 'de',
      en: 'from',
      es: 'de'
    },
    in: {
      pt: 'no',
      en: 'at',
      es: 'en el'
    }
  },
  {
    value: CityEnum.PERUIBE,
    name: 'Peruíbe',
    sigla: 'peruibe',
    isDisabled: true,
    from: {
      pt: 'de',
      en: 'from',
      es: 'de'
    },
    in: {
      pt: 'em',
      en: 'in',
      es: 'en'
    }
  },
  {
    value: CityEnum.BERTIOGA,
    name: 'Bertioga',
    sigla: 'bertioga',
    isDisabled: true,
    from: {
      pt: 'de',
      en: 'from',
      es: 'de'
    },
    in: {
      pt: 'em',
      en: 'in',
      es: 'en'
    }
  },
  {
    value: CityEnum.CUBATAO,
    name: 'Cubatão',
    sigla: 'cubatao',
    isDisabled: true,
    from: {
      pt: 'de',
      en: 'from',
      es: 'de'
    },
    in: {
      pt: 'em',
      en: 'in',
      es: 'en'
    }
  },
  {
    value: CityEnum.ITANHAEM,
    name: 'Itanhaém',
    sigla: 'itanhaem',
    isDisabled: true,
    from: {
      pt: 'de',
      en: 'from',
      es: 'de'
    },
    in: {
      pt: 'em',
      en: 'in',
      es: 'en'
    }
  },
  {
    value: CityEnum.MONGAGUA,
    name: 'Mongaguá',
    sigla: 'mongagua',
    isDisabled: true,
    from: {
      pt: 'de',
      en: 'from',
      es: 'de'
    },
    in: {
      pt: 'em',
      en: 'in',
      es: 'en'
    }
  }
]
