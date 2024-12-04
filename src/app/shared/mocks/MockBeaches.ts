import { SantosBeachEnum } from "../enums/Beach";
import { CityEnum } from "../enums/City";
import { IBeach } from "../models/IBeach";

export const MOCK_SANTOS_BEACHES: IBeach[] = [
  {
    value: SantosBeachEnum.JOSE_MENINO,
    city: CityEnum.SANTOS,
    text: 'José Menino',
    popularName: '',
    located: {
      from: {
        value: 'CANAL_1',
        text: 'Canal 1'
      },
      to: {
        value: 'CANAL_2',
        text: 'Canal 2'
      }
    }
  }
]

