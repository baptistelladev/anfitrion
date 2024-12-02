import { PlaceTypeBeachEnum } from 'src/app/shared/enums/PlaceType';
import { PeopleTypeBeachEnum } from '../enums/PeopleType';

export const MOCK_BEACH_FEATURES = {
  places: [
    {
      loadIconsFromAssets: false,
      value: PlaceTypeBeachEnum.QUIOSQUE,
      icon: 'storefront',
      text: {
        pt: 'Quiosques',
        en: 'Kiosks',
        es: 'Quiscos'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: 'quer comer ou beber na orla praia.',
        en: 'who want to eat or drink on the beach.',
        es: 'quieren comer o beber en la orla de la playa.'
      },
      route: 'quiosque',
      atLeastOneLength: false,
      ageLimit: null,
      userRespectAgeLimit: null
    },
    {
      loadIconsFromAssets: false,
      value: PlaceTypeBeachEnum.CARRINHO,
      icon: 'cart',
      text: {
        pt: 'Carrinhos',
        en: 'Carts',
        es: 'Carritos'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: 'quer comer, beber ou ficar em guarda-sol na faixa de areia.',
        en: 'who want to eat, drink, or stay under a sunshade on the sand.',
        es: 'quieren comer, beber o quedarse bajo una sombrilla en la arena.'
      },
      route: 'carrinho',
      atLeastOneLength: false,
      ageLimit: null,
      userRespectAgeLimit: null
    }
  ],
  people: [
    {
      loadIconsFromAssets: false,
      value: PeopleTypeBeachEnum.AMBULANTE,
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
      userRespectAgeLimit: null
    }
  ]
}
