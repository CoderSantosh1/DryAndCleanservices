import React from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'

export default function DeliveryHome() {
  return (
    <Layout title="Delivery • cdry-clean">
      <h2 className="text-lg font-semibold">Delivery Partner Panel</h2>
      <div className="mt-4 space-y-3">
        <Link href="/delivery/orders" className="block bg-white p-3 rounded shadow">
          My Orders
        </Link>
      </div>
    </Layout>
  )
}
