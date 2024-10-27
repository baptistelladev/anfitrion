import { IContact } from "./IContact";
import { ISocialNetwork } from "./INetwork";

export interface IAppInfo {
  networks: ISocialNetwork[],
  contact: IContact
}
