import { ITab } from "../models/ITab";


export const MOCK_TABS: ITab[] = [
  {
    page: 'explorar',
    icon: 'search',
    value: 'explorar',
    text: {
      pt: 'Explorar',
      en: 'Explore',
      es: 'Explorar'
    }
  },
  {
    page: 'sugestoes-do-anfitriao',
    icon: 'bulb',
    value: 'sugestoes-do-anfitriao',
    text: {
      pt: 'Sugestões',
      en: 'Suggestions',
      es: 'Sugerencias'
    }
  },
  {
    page: 'menu',
    icon: 'grid',
    value: 'menu',
    text: {
      pt: 'Menu',
      en: 'Menu',
      es: 'Menu'
    }
  }
]
