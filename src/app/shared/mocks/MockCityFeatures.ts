import { PlaceTypeCityEnum } from 'src/app/shared/enums/PlaceType';
import { PeopleTypeCityEnum } from '../enums/PeopleType';
import { LocationEnum } from '../enums/Location';
export const MOCK_CITY_FEATURES = {
  places: [
    {
      loadIconsFromAssets: false,
      value: PlaceTypeCityEnum.RESTAURANTE,
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
      userRespectAgeLimit: null,
      origin: LocationEnum.CIDADE
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeCityEnum.BAR,
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
      userRespectAgeLimit: null,
      origin: LocationEnum.CIDADE
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeCityEnum.CAFETERIA,
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
      userRespectAgeLimit: null,
      origin: LocationEnum.CIDADE
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeCityEnum.ADEGA,
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
      userRespectAgeLimit: null,
      origin: LocationEnum.CIDADE
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeCityEnum.PIZZARIA,
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
      userRespectAgeLimit: null,
      origin: LocationEnum.CIDADE
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeCityEnum.HAMBURGUERIA,
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
      userRespectAgeLimit: null,
      origin: LocationEnum.CIDADE
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeCityEnum.DOCERIA,
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
      userRespectAgeLimit: null,
      origin: LocationEnum.CIDADE
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeCityEnum.SORVETERIA,
      icon: 'ice-cream',
      text: {
        pt: 'Sorveteria',
        en: 'Ice Cream Parlor',
        es: 'Heladería'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: '',
        en: '',
        es: ''
      },
      route: 'sorveteria',
      atLeastOneLength: false,
      ageLimit: null,
      userRespectAgeLimit: null,
      origin: LocationEnum.CIDADE
    }
  ],
  people: [
    {
      loadIconsFromAssets: false,
      value: PeopleTypeCityEnum.AMBULANTE,
      icon: 'person',
      text: {
        pt: 'Ambulantes',
        en: 'Vendors',
        es: 'Ambulantes'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: 'para quem quer comer, beber ou comprar algum item.',
        en: 'who want to eat, drink, or buy something.',
        es: 'quieren comer, beber o comprar algo.'
      },
      route: 'ambulante',
      atLeastOneLength: false,
      ageLimit: null,
      userRespectAgeLimit: null,
      origin: LocationEnum.CIDADE
    }
  ]
}
