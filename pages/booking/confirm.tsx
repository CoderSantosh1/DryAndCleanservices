import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

export default function Confirm() {
  const router = useRouter()
  const { id } = router.query
  const [order, setOrder] = useState<any | null>(null)

  useEffect(() => {
    if (!id) return
    fetch('/api/orders').then(r => r.json()).then((data) => {
      const found = data.find((o: any) => o.id === id)
      setOrder(found ?? null)
    })
  }, [id])

  if (!order) return <Layout><div className="py-20 text-center">order has successfully added get the delivery partner assign to you</div></Layout>

  return (
    <Layout title="Booking Confirmed">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-lg">Booking Confirmed</h2>
        <p className="text-sm text-gray-600 mt-2">Order ID: <strong>{order.id}</strong></p>
        <p className="mt-2">We will pick up from <strong>{order.address}</strong>. Status: <strong>{order.status}</strong></p>
      </div>
    </Layout>
  )
}
