import { LocationEnum } from "../enums/Location";
import { ILocation } from "../models/ILocation";

export const MOCK_LOCATION: ILocation[] = [
  {
    value: LocationEnum.CIDADE,
    text: {
      pt: ["na", "cidade"],
      en: ["in the", "city"],
      es: ["en la", "ciudad"]
    }
  },
  {
    value: LocationEnum.PRAIA,
    text: {
      pt: ["na", "praia"],
      en: ["at the", "beach"],
      es: ["en la", "playa"]
    }
  }
];
