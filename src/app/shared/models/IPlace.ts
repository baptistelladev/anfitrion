import { IPlaceSpecialty } from "./IPlaceSpecialty"
import { IPlaceType } from "./IPlaceType"
import { ISocialNetwork } from "./INetwork"
import { IPhone } from "./IPhone"
import { ITicket } from "./ITicket"
import { ITime } from "./ITime"

export interface IPlace {
  id?: string,
  name: string,
  value: string,
  adress: {
    number: string,
    neighborhood: string,
    street: string,
    zip_code: string,
    type: any
  },
  specialty: IPlaceSpecialty[];
  mainType: IPlaceType,
  ticket_info: {
    accept_ticket: boolean,
    show_field: boolean,
    tickets: ITicket[]
  },
  market_ticket_info: {
    accept_ticket: boolean,
    show_field: boolean,
    tickets: ITicket[]
  },
  petfriendly_info: {
    accept_petfriendly: boolean,
    show_field: boolean
  },
  livemusic_info: {
    has_livemusic: boolean,
    show_field: boolean
  },
  air_conditioned_info: {
    has_air_conditioned: boolean,
    show_field: boolean
  },
  booking_info: {
    accept_booking: boolean,
    show_field: boolean
  },
  working_time: ITime[],
  phones: IPhone[],
  networks: ISocialNetwork[],
  isBuilding: boolean,
  isPremium: boolean
}

export interface ILongEstablishment {

}
