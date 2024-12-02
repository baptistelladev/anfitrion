import { PlaceTypeEnum } from 'src/app/shared/enums/PlaceType';
export const MOCK_CITY_FEATURES = {
  places: [
    {
      loadIconsFromAssets: false,
      value: PlaceTypeEnum.RESTAURANTE,
      icon: 'restaurant',
      text: {
        pt: 'Restaurantes',
        en: 'Restaurants',
        es: 'Restaurantes'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: '',
        en: '',
        es: ''
      },
      route: 'restaurante',
      atLeastOneLength: false,
      ageLimit: null,
      userRespectAgeLimit: null
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeEnum.BAR,
      icon: 'beer',
      text: {
        pt: 'Bares',
        en: 'Bars',
        es: 'Bares'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: '',
        en: '',
        es: ''
      },
      route: 'bar',
      atLeastOneLength: false,
      ageLimit: null,
      userRespectAgeLimit: null
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeEnum.CAFETERIA,
      icon: 'cafe',
      text: {
        pt: 'Cafeterias',
        en: 'Coffee Shops',
        es: 'Cafetería'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: '',
        en: '',
        es: ''
      },
      route: 'cafeteria',
      atLeastOneLength: false,
      ageLimit: null,
      userRespectAgeLimit: null
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeEnum.ADEGA,
      icon: 'wine',
      text: {
        pt: 'Adegas',
        en: 'Beverage Stores',
        es: 'Bodegas'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: '',
        en: '',
        es: ''
      },
      route: 'adega',
      atLeastOneLength: false,
      ageLimit: 18,
      userRespectAgeLimit: null
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeEnum.PIZZARIA,
      icon: 'pizza',
      text: {
        pt: 'Pizzarias',
        en: 'Pizzerias',
        es: 'Pizzerías'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: '',
        en: '',
        es: ''
      },
      route: 'pizzaria',
      atLeastOneLength: false,
      ageLimit: null,
      userRespectAgeLimit: null
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeEnum.HAMBURGUERIA,
      icon: 'fast-food',
      text: {
        pt: 'Hamburguerias',
        en: 'Burger Joints',
        es: 'Hamburgueserías'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: '',
        en: '',
        es: ''
      },
      route: 'hamburgueria',
      atLeastOneLength: false,
      ageLimit: null,
      userRespectAgeLimit: null
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeEnum.DOCERIA,
      icon: 'pie-chart',
      text: {
        pt: 'Docerias',
        en: 'Sweet Shops',
        es: 'Dulcería'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: '',
        en: '',
        es: ''
      },
      route: 'doceria',
      atLeastOneLength: false,
      ageLimit: null,
      userRespectAgeLimit: null
    }
  ]
}
