
import Navbar from '@/components/shared/Navbar'
import React from 'react'

export default function CommonLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
        <Navbar/>
        <div className='container mx-auto px-4 py-8'>
            {children}
        </div>
    </div>
  )
}
