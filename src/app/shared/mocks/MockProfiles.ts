import { HashtagEnum } from "../enums/Hashtag";
import { ProfileTypeEnum } from "../enums/ProfileType";
import { IHashtag } from "../models/IHashtag";
import { IProfileType } from "../models/IProfileType";

export const MOCK_PROFILES: IProfileType[] = [
  {
    value: ProfileTypeEnum.MORADOR,
    singularText: {
      pt: "Morador",
      en: "Resident",
      es: "Residente"
    },
    pluralText: {
      pt: "Moradores",
      en: "Residents",
      es: "Residentes"
    }
  },
  {
    value: ProfileTypeEnum.TURISTA,
    singularText: {
      pt: "Turista",
      en: "Tourist",
      es: "Turista"
    },
    pluralText: {
      pt: "Turistas",
      en: "Tourists",
      es: "Turistas"
    }
  }

]
