export interface ISuggestion {
  id?: string,
  hashtag: any,
  name: {
    text: any,
    title: any
  },
  value: string,
  created_at: string,
  updated_at: string,
  route: string,
  address: any,
  location?: {
    lat: number,
    lng: number
  }
}
