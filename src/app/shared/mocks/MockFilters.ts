import { FilterEnum } from "../enums/FilterEnum";
import { PlaceSpecialtyEnum } from "../enums/PlaceSpecialty";
import { PlaceTypeBeachEnum, PlaceTypeCityEnum } from "../enums/PlaceType";
import { SuggestionsEnum } from "../enums/Suggestions";
import { IFilter } from "../models/IFilter";
import { ITab } from "../models/ITab";


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
    dontShowIn: [PlaceTypeCityEnum.TABACARIA, PlaceTypeCityEnum.ADEGA, PlaceTypeBeachEnum.QUIOSQUE, SuggestionsEnum.FESTIVAL_COMIDA_JAPONESA]
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
    dontShowIn: [PlaceTypeCityEnum.ADEGA, PlaceTypeCityEnum.DOCERIA, PlaceTypeCityEnum.CAFETERIA, PlaceTypeCityEnum.EMPORIO, PlaceTypeCityEnum.HAMBURGUERIA, PlaceTypeCityEnum.MERCADO, PlaceTypeCityEnum.PIZZARIA, PlaceTypeCityEnum.TABACARIA, PlaceTypeBeachEnum.QUIOSQUE, PlaceTypeCityEnum.SORVETERIA, SuggestionsEnum.FESTIVAL_COMIDA_JAPONESA]
  },
  {
    value: FilterEnum.CHILDREN_SPACE,
    text: {
      pt: 'Espaço kids',
      en: 'Space for children',
      es: 'Área de niños'
    },
    dontShowIn: [PlaceTypeCityEnum.ADEGA, PlaceTypeCityEnum.DOCERIA, PlaceTypeCityEnum.CAFETERIA, PlaceTypeCityEnum.EMPORIO, PlaceTypeCityEnum.MERCADO, PlaceTypeCityEnum.TABACARIA, PlaceTypeBeachEnum.QUIOSQUE, SuggestionsEnum.FESTIVAL_COMIDA_JAPONESA]
  },
  {
    value: FilterEnum.DELIVERY_ON_THE_SAND,
    text: {
      pt: 'Entrega na areia',
      en: 'Delivery on the sand',
      es: 'Entrega en la arena'
    },
    dontShowIn: [PlaceTypeCityEnum.ADEGA, PlaceTypeCityEnum.DOCERIA, PlaceTypeCityEnum.CAFETERIA, PlaceTypeCityEnum.EMPORIO, PlaceTypeCityEnum.MERCADO, PlaceTypeCityEnum.TABACARIA, SuggestionsEnum.FESTIVAL_COMIDA_JAPONESA]
  }
]
