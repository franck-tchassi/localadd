"use client"

import { Search, Settings, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'


import { debounce } from 'lodash'

//import LocaleSelectLanguage from '@/app/[locale]/LocaleSelectLanguage'
import ShopSeller from '../info/Info'
import Info from '../info/Info'


const NavbarTop = ({ user } : any) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Recherche avec debounce
  const handleSearch = debounce((query: string) => {
    if (query.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(query)}`)
    }
  }, 500)

  const clearSearch = () => {
    setSearchQuery('')
    router.push('/dashboard')
  }

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between h-20 border-b border-orange-200 bg-white shadow-xl dark:border-orange-700 dark:bg-gray-900 transition-all duration-300"
      style={{ paddingLeft: '18rem' }} // 72*4=288px
    >
      {/* Barre de recherche */}
      <div className="flex items-center gap-4 w-full max-w-xl ml-4">
        <div className={`relative flex h-11 transition-all duration-200 ${isSearchFocused ? 'w-80' : 'w-64'}`}>
         
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-orange-400 hover:text-orange-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      {/* Profil utilisateur et paramètres */}
      <div className="flex items-center gap-4 mr-8">
        <Info user={user} />
        <Link href="/dashboard/settings" className="rounded-full p-2 bg-orange-50 hover:bg-orange-100 transition-colors">
          <Settings className="h-5 w-5 text-orange-500" />
        </Link>
      </div>
    </header>
  )
}

export default NavbarTop