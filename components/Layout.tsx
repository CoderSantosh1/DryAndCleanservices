import React from 'react'
import Header from './Header'

export default function Layout({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="">
      <Header title={title} />
      <main >{children}</main>
    </div>
  )
}
