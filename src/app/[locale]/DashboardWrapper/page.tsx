"use client"

import { useRouter } from 'next/navigation'
//import useSeller from "@/hooks/useSeller"
import { useEffect } from 'react'
import NavbarTop from './(components)/navbar/navbar'
import { Sidebar } from './(components)/Sidebar/Sidebar'

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  //const { seller, isLoading } = useSeller()
  const router = useRouter()
  return (
    <div className='flex min-h-screen w-full bg-orange-50 text-gray-900 dark:bg-gray-950'>
      <Sidebar />
      <main className={`flex w-full flex-col transition-all duration-300 md:pl-72`}>
        <NavbarTop />
        <div className="p-6 md:p-8 bg-white rounded-t-2xl shadow-lg min-h-[calc(100vh-80px)]">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardWrapper