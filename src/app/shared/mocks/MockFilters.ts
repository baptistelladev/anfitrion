import { CityFeaturesEnum } from "../enums/CityFeatures";
import { FilterEnum } from "../enums/FilterEnum";
import { PlaceSpecialtyEnum } from "../enums/PlaceSpecialty";
import { PlaceTypeEnum } from "../enums/PlaceType";
import { IFilter } from "../models/IFilter";
import { ITab } from "../models/ITab";


export const MOCK_FILTERS: IFilter[] = [
  {
    value: FilterEnum.ALL,
    text: {
      pt: 'Todos',
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
    dontShowIn: [PlaceTypeEnum.TABACARIA, PlaceTypeEnum.ADEGA]
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
    dontShowIn: [PlaceTypeEnum.ADEGA, PlaceTypeEnum.DOCERIA, PlaceTypeEnum.CAFETERIA, PlaceTypeEnum.EMPORIO, PlaceTypeEnum.HAMBURGUERIA, PlaceTypeEnum.MERCADO, PlaceTypeEnum.PIZZARIA, PlaceTypeEnum.TABACARIA]
  },
  {
    value: FilterEnum.CHILDREN_SPACE,
    text: {
      pt: 'Espaço kids',
      en: 'Space for children',
      es: 'Área de niños'
    },
    dontShowIn: [PlaceTypeEnum.ADEGA, PlaceTypeEnum.DOCERIA, PlaceTypeEnum.CAFETERIA, PlaceTypeEnum.EMPORIO, PlaceTypeEnum.MERCADO, PlaceTypeEnum.TABACARIA]
  }
]
