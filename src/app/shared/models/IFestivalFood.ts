import { ICourtesy } from "./ICourtesy"
import { IFestivalFoodType } from "./IFestivalFoodType"


export interface IFestivalFood {
  food_type?: IFestivalFoodType,
  last_update?: string,
  rules?: [
    {
      benefit_type: any,
      condition_end: number,
      condition_start: number,
      consumer_festival_type: any,
      discount: number,
      operator: any,
      price: number
    }
  ],
  has_courtesy?: boolean
  courtesies?: {
    number: number,
    courtesy: ICourtesy
  }[]
}
