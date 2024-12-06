export interface IBeach {
  value: string,
  city: string,
  text: any,
  popularName: string,
  located: {
    from: {
      value: string,
      text: string
    },
    operator: {
      text: any,
      value: string
    },
    to: {
      value: string,
      text: string
    }
  },
  in: any,
  location?: {
    lat: number,
    lng: number
  },
  kmlCoordinates?: any[] | undefined
}
