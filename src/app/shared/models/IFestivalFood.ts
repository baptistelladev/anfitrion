import { IFestivalFoodType } from "./IFestivalFoodType"


export interface IFestivalFood {
  food_type?: IFestivalFoodType,
  rules?: [
    {
      type?: string,
      operator?: string,
      condition?: {
        start?: string
        end?: string
      },
      benefit_type?: string,
      price?: number
    }
  ],
  last_update?: string
}
