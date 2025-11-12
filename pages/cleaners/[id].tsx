import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import BookingForm from '../../components/BookingForm'

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

export default function CleanerDetail() {
  const router = useRouter()
  const { id } = router.query
  const [cleaner, setCleaner] = useState<Cleaner | null>(null)

  useEffect(() => {
    if (!id) return
    fetch('/api/cleaners').then((r) => r.json()).then((data) => {
      const found = data.find((x: Cleaner) => x.id === id)
      setCleaner(found ?? null)
    })
  }, [id])

  if (!cleaner) return <Layout><div className="py-20 text-center">Loading…</div></Layout>

  return (
    <Layout title={cleaner.name}>
      <div className="bg-white rounded-lg shadow p-4">
        <img src={cleaner.image} alt="" className="w-full h-48 object-cover rounded" />
        <h2 className="text-lg font-semibold mt-3">{cleaner.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{cleaner.address}</p>
        <div className="mt-3 flex gap-2">
          <a href={`tel:${cleaner.phone}`} className="flex-1 py-3 rounded border border-indigo-600 text-indigo-600 text-center">Call</a>
          <a href="#book" className="flex-1 py-3 rounded bg-indigo-600 text-white text-center">Book pickup</a>
        </div>

        <section id="book" className="mt-4">
          <h3 className="text-sm font-medium">Request pickup</h3>
          <BookingForm cleanerId={cleaner.id} />
        </section>
      </div>
    </Layout>
  )
}
