import { IContactEmail } from "./IContactEmail";
import { IContactPhone } from "./IContactPhone";

export interface IContact {
  phone: IContactPhone,
  email: IContactEmail
}
