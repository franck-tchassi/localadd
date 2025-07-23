"use client"

import {
  LayoutDashboard,
  MapPin,
  BarChart2,
  MessageCircle,
  CreditCard,
  Percent,
  Settings,
  User,
  HelpCircle,
  LogOut,
  PlusSquare,
} from 'lucide-react';
import { logoutUser } from "@/actions/auth";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

type IconType = React.ComponentType<{ className?: string; size?: number | string; color?: string }>;

const sidebarLinks = [
  { label: 'Accueil', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Statistiques locales', href: '/dashboard/analytics', icon: BarChart2 },
  { label: 'Établissements', href: '/dashboard/businesses', icon: MapPin },
  { label: 'Ajouter un établissement', href: '/dashboard/create-business', icon: PlusSquare },
  { label: 'Demandes clients', href: '/dashboard/orders', icon: MessageCircle },
  { label: 'Facturation', href: '/dashboard/payments', icon: CreditCard },
  { label: 'Offres & promotions', href: '/dashboard/discount-codes', icon: Percent },
  { label: 'Paramètres', href: '/dashboard/settings', icon: Settings },
  { label: 'Profil utilisateur', href: '/dashboard/profile', icon: User },
  { label: 'Centre d’aide', href: '/dashboard/help', icon: HelpCircle },
  { label: 'Déconnexion', href: '/logout', icon: LogOut, isLogout: true },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarClassNames = `fixed top-0 left-0 h-screen w-72 bg-white dark:bg-gray-900 shadow-xl z-40 flex flex-col justify-between transition-all duration-300 ${isOpen ? '' : '-translate-x-full'} md:translate-x-0`;

  return (
    <>
      {/* Hamburger Menu (mobile) */}
      {!isOpen && isMobile && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-4 top-4 z-50 rounded-md bg-white p-2 shadow-md hover:bg-gray-100 md:hidden"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      )}
      {/* Close Button (mobile) */}
      {isOpen && isMobile && (
        <button
          onClick={() => setIsOpen(false)}
          className="fixed left-72 top-4 z-50 rounded-md bg-white p-2  hover:bg-gray-100 md:hidden"
          style={{ marginLeft: '-40px' }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
      <aside className={sidebarClassNames}>
        {/* Logo */}
        <div className="flex items-center justify-center py-6 bg-gradient-to-r from-orange-400 to-orange-500">
          <span className="ml-3 text-2xl font-bold text-white tracking-wide drop-shadow">Localadd</span>
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarLinks.map(({ label, href, icon: Icon, isLogout }) => {
            const isActive = pathname === href;
            if (isLogout) {
              return (
                <button
                  key={label}
                  onClick={async () => {
                    await logoutUser();
                    router.refresh();
                  }}
                  className="block w-full text-left cursor-pointer"
                >
                  <div className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors font-medium text-base hover:bg-red-50 text-red-600 group relative`}>
                    <Icon className="h-5 w-5 text-red-500" />
                    <span>{label}</span>
                  </div>
                </button>
              );
            }
            return (
              <Link href={href} key={label} className="block">
                <div className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors font-medium text-base
                  ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100 text-gray-700 dark:text-gray-300'}
                  group relative`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-orange-500' : 'text-gray-400'}`} />
                  <span>{label}</span>
                  {isActive && <span className="absolute left-0 top-0 h-full w-1 bg-orange-500 rounded-r" />}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};



