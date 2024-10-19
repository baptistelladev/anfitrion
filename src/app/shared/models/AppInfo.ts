import { IContact } from "./Contact";
import { ISocialNetwork } from "./Network";

export interface IAppInfo {
  networks: ISocialNetwork[],
  contact: IContact
}
