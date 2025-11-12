import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import CleanerCard from '../components/CleanerCard'
import BookingForm from '../components/BookingForm'
import Hero from '@/components/Hero'
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

export default function Home() {
  const [cleaners, setCleaners] = useState<Cleaner[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCleaner, setSelectedCleaner] = useState<Cleaner | null>(null)

  useEffect(() => {
    fetch('/api/cleaners').then(r => r.json()).then(data => { setCleaners(data); setLoading(false) })
  }, [])

  return (
    <Layout title="cdry-clean • Noida">
      <div className="mb-4 flex justify-center">
        <input
          placeholder="Search cleaners, e.g. Tumbledry"
          className="w-full p-3 max-w-3xl  rounded-lg border border-gray-200 bg-white"
        />
      </div>
      <div className="mb-6">
        <Hero />
      </div>
      <section>
        <h2 className="text-sm font-medium text-gray-700 mb-2">
          Nearby cleaners
        </h2>
        {loading ? (
          <div className="text-center py-12">Loading…</div>
        ) : (
          cleaners.map((c) => (
            <div key={c.id} onClick={() => setSelectedCleaner(c)}>
              <CleanerCard cleaner={c} />
            </div>
          ))
        )}
      </section>

      {selectedCleaner && (
        <div className="mt-4 sticky bottom-4 z-40">
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="font-medium">{selectedCleaner.name}</div>
                <div className="text-xs text-gray-500">
                  {selectedCleaner.address}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <BookingForm cleanerId={selectedCleaner.id} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
