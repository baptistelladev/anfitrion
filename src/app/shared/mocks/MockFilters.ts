import { FilterEnum } from "../enums/FilterEnum";
import { PlaceTypeBeachEnum, PlaceTypeCityEnum } from "../enums/PlaceType";
import { SuggestionsEnum } from "../enums/Suggestions";
import { IFilter } from "../models/IFilter";

export const MOCK_FILTERS: IFilter[] = [
  {
    value: FilterEnum.ALL,
    text: {
      pt: 'Todos(as)',
      en: 'All',
      es: 'Todos'
    },
    dontShowIn: []
  },
  {
    value: FilterEnum.PET_FRIENDLY,
    text: {
      pt: 'Pode levar pet',
      en: 'Pets allowed',
      es: 'Se permiten mascotas'
    },
    dontShowIn: [
      PlaceTypeCityEnum.ADEGA,
      PlaceTypeCityEnum.EMPORIO,
      PlaceTypeCityEnum.MERCADO,
      PlaceTypeCityEnum.TABACARIA,
      PlaceTypeBeachEnum.QUIOSQUE,
      PlaceTypeBeachEnum.CARRINHO,
      SuggestionsEnum.FESTIVAL_DE_COMIDA_JAPONESA
    ]
  },
  {
    value: FilterEnum.TICKET,
    text: {
      pt: 'Aceita vale refeição',
      en: 'Accept meal vouchers ',
      es: 'Acepta vales de comida'
    },
    dontShowIn: []
  },
  {
    value: FilterEnum.LIVEMUSIC,
    text: {
      pt: 'Tem música ao vivo',
      en: 'Has live music',
      es: 'Tiene música en vivo'
    },
    dontShowIn: [
      PlaceTypeCityEnum.ADEGA,
      PlaceTypeCityEnum.CAFETERIA,
      PlaceTypeCityEnum.DOCERIA,
      PlaceTypeCityEnum.EMPORIO,
      PlaceTypeCityEnum.HAMBURGUERIA,
      PlaceTypeCityEnum.MERCADO,
      PlaceTypeCityEnum.PIZZARIA,
      PlaceTypeCityEnum.SORVETERIA,
      PlaceTypeCityEnum.TABACARIA,
      PlaceTypeBeachEnum.QUIOSQUE,
      PlaceTypeBeachEnum.CARRINHO,
      SuggestionsEnum.FESTIVAL_DE_COMIDA_JAPONESA
    ]
  },
  {
    value: FilterEnum.CHILDREN_SPACE,
    text: {
      pt: 'Espaço kids',
      en: 'Space for children',
      es: 'Área de niños'
    },
    dontShowIn: [
      PlaceTypeCityEnum.ADEGA,
      PlaceTypeCityEnum.BAR,
      PlaceTypeCityEnum.CAFETERIA,
      PlaceTypeCityEnum.DOCERIA,
      PlaceTypeCityEnum.EMPORIO,
      PlaceTypeCityEnum.MERCADO,
      PlaceTypeCityEnum.PIZZARIA,
      PlaceTypeCityEnum.SORVETERIA,
      PlaceTypeCityEnum.TABACARIA,
      PlaceTypeBeachEnum.QUIOSQUE,
      PlaceTypeBeachEnum.CARRINHO,
      SuggestionsEnum.FESTIVAL_DE_COMIDA_JAPONESA
    ]
  },
  {
    value: FilterEnum.DELIVERY_ON_THE_SAND,
    text: {
      pt: 'Entrega na areia',
      en: 'Delivery on the sand',
      es: 'Entrega en la arena'
    },
    dontShowIn: [
      PlaceTypeCityEnum.ADEGA,
      PlaceTypeCityEnum.BAR,
      PlaceTypeCityEnum.RESTAURANTE,
      PlaceTypeCityEnum.CAFETERIA,
      PlaceTypeCityEnum.CHURRASCARIA,
      PlaceTypeCityEnum.DOCERIA,
      PlaceTypeCityEnum.EMPORIO,
      PlaceTypeCityEnum.HAMBURGUERIA,
      PlaceTypeCityEnum.MERCADO,
      PlaceTypeCityEnum.PIZZARIA,
      PlaceTypeCityEnum.SORVETERIA,
      PlaceTypeCityEnum.TABACARIA,
      SuggestionsEnum.FESTIVAL_DE_COMIDA_JAPONESA,
      SuggestionsEnum.RUA_GASTRONOMICA_DE_SANTOS
    ]
  }
]
