import { IContactEmail } from "./ContactEmail";
import { IContactPhone } from "./ContactPhone";

export interface IContact {
  phone: IContactPhone,
  email: IContactEmail
}
