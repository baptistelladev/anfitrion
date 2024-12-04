export interface IBeach {
  value: string,
  city: string,
  text: string,
  popularName: string,
  located: {
    from: {
      value: string,
      text: string
    },
    to: {
      value: string,
      text: string
    }
  }
}
