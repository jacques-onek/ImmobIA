"use client"
import { navLinks } from '@/constant/AppData'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {

  const pathname = usePathname()
  return (
    <header className=' fixed z-50 flex items-center justify-between rounded-b-md py-10 w-full px-10  h-5 shadow-card  bg-white'>
      <section className='flex py-2 gap-8 rounded-full px-8 text-center h-fit bg-slate-50   border-transparent inset-1 border-0'>
        {navLinks.map(({title,href}) => (
           <Link key={href} href={href} className={cn("text-sm font-mono text-gray-700",pathname === href && "bg-white rounded-full shadow-sm text-center py-[3px] px-4 ")}>
            {title}
           </Link>
        ))}
      </section>
      <section>
        searchbar
        profile
      </section>
    </header>
  )
}

export default Navbar
