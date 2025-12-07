import React from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

const Layout = ({ children }: {children: React.ReactNode}) => {
  return (
    <main className="min-h-screen text-white">
        <Header />
        <div className="container">
            {children}
        </div>
        <Footer />
    </main>
  )
}

export default Layout