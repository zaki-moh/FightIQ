import React from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

const Layout = ({ children }: {children: React.ReactNode}) => {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#040B18] via-[#06142A] to-[#0B1E3A] flex flex-col">
        <Header />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-600 opacity-5 blur-3xl rounded-full"/>
        </div>
        <div className="flex-1">
            {children}
        </div>
        <Footer />
    </main>
  )
}

export default Layout