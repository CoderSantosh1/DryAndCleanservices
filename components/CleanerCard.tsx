import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assistes/Icon/tide.png';
type Cleaner = {
  id: string
  name: string
  address: string
  image: string
  rating: string
  reviews: number
  distance: string
  phone: string
}

export default function CleanerCard({ cleaner }: { cleaner: Cleaner }) {
  return (
    <Link href={`/cleaners/${cleaner.id}`} className="block bg-white rounded-lg shadow-sm overflow-hidden mb-4">
      <div className="p-4 flex gap-3 items-center">
        <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden">
          <Image src={logo} alt={cleaner.name} className="object-cover w-full h-full" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold">{cleaner.name}</h3>
            <div className="text-xs text-gray-600">{cleaner.distance}</div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{cleaner.address}</p>
          <div className="mt-2 flex gap-2 items-center text-xs">
            <span className="px-2 py-1 bg-green-50 text-green-700 rounded">{cleaner.rating} ★</span>
            <span className="text-gray-500">{cleaner.reviews} reviews</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
