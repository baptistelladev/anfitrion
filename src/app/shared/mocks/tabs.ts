import { ITab } from "../models/Tabs";


export const TABS: ITab[] = [
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
    page: 'sugestoes-do-anfitrion',
    icon: 'bulb',
    value: 'sugestoes-do-anfitrion',
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
