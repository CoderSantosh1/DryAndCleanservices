import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

export default function AdminCleaners() {
  const [cleaners, setCleaners] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/cleaners').then(r => r.json()).then(setCleaners)
  }, [])

  return (
    <Layout title="Admin • Cleaners">
      <h2 className="text-lg font-semibold">Cleaners</h2>
      <div className="mt-4 space-y-3">
        {cleaners.map(c => (
          <div key={c.id} className="bg-white p-3 rounded shadow flex items-center justify-between">
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-gray-500">{c.address}</div>
            </div>
            <div className="flex items-center gap-2">
              <a href={`/cleaners/${c.id}`} className="text-indigo-600 text-sm">View</a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
