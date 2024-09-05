export interface User {
  id: number
  name: string
  username: string // Added username field
  email: string
  phone: string
  website: string // Added website field
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}
