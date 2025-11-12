import React from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'

export default function AdminHome() {
  return (
    <Layout title="Admin • cdry-clean">
      <h2 className="text-lg font-semibold">Admin Panel</h2>
      <div className="mt-4 space-y-3">
        <Link href="/admin/cleaners" className="block bg-white p-3 rounded shadow">
          Manage Cleaners
        </Link>
        <Link href="/admin/orders" className="block bg-white p-3 rounded shadow">
          Manage Orders
        </Link>
      </div>
    </Layout>
  )
}
