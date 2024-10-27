export interface IParking {
  name: string,
  value: string,
  adress: {
    zip_code: string,
    number: string,
    neighborhood: string,
    street: string,
    type: any
  },
  phone: {
    ddd: string,
    number: string
  }
}
