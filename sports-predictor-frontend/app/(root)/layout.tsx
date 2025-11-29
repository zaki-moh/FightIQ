import React from 'react'
import Header from '@/components/Header'

const Layout = ({ children }: {children: React.ReactNode}) => {
  return (
    <main className="min-h-screen text-white">
        <Header />
        <div className="container ">
            {children}
        </div>
    </main>
  )
}

export default Layout