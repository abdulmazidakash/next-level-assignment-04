
import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

export default function CommonLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
        <Navbar/>
        <div className='w-full mx-auto'>
            {children}
        </div>
        <Footer/>
    </div>
  )
}
