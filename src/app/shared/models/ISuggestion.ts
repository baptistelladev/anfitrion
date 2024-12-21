import { IProfileType } from "./IProfileType"

export interface ISuggestion {
  id: string,
  hashtag: any,
  filter: string[],
  name: {
    text: any,
    title: any
  },
  value: string,
  created_at: string,
  updated_at: string,
  route: string,
  address: {
    type: any,
    street: string,
    neighborhood: string
  },
  location?: {
    lat: number,
    lng: number
  },
  icon: string,
  specific_place: any,
  indication: IProfileType[]
}
