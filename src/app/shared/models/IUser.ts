
export interface IUSer {
  uid?: string,
  createdAt?: string,
  firstName: string,
  email?: string,
  lastName?: string,
  birthDate?: string,
  userType?: any,
  sex?: string,
  readAndAcceptedTerms: boolean,
  premiumInfo: {
    isPremium: boolean
  }
}
