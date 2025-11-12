import type { NextApiRequest, NextApiResponse } from 'next'

type Cleaner = {
  id: string
  name: string
  address: string
  image: string
  rating: string
  reviews: number
  distance: string
  phone: string
  active: boolean
}

const cleaners: Cleaner[] = [
  {
    id: 'tumbledry-s76',
    name: 'Tumbledry Dry Clean & Laundry Service',
    address: 'Shop No - 11, JM ORCHID Market, Sector 122, Noida, UP 201316',
    image: 'https://tumbledry.in/wp-content/uploads/2023/08/Store-locator-feature-image-1.jpeg',
    rating: '4.4',
    reviews: 421,
    distance: '2.1 km',
    phone: '+916201553036',
    active: true
  },
  // {
  //   id: 'cleanwell-s62',
  //   name: 'CleanWell Laundry',
  //   address: 'Sector 62, Noida',
  //   image: 'https://via.placeholder.com/300x200.png?text=CleanWell',
  //   rating: '4.2',
  //   reviews: 203,
  //   distance: '3.8 km',
  //   phone: '+919876543210',
  //   active: true
  // }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(cleaners)
}
