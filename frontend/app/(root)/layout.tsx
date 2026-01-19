import React from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

const Layout = ({ children }: {children: React.ReactNode}) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#040B18] to-[#0B1E3A] flex flex-col">
        <Header />
        <div className="flex-1">
            {children}
        </div>
        <Footer />
    </main>
  )
}

export default Layout