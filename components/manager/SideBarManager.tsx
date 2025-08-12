"use client"
import { ManagerSideBarLink } from '@/constant/AppData'
import { cn, getInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { Session } from 'next-auth'
import { ManagerSibarLink } from '@/types'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"




const Sidebar = () => {

    const session = "jack onek"
    const pathname = usePathname()
  return (
    <div className='sidebar'>
        <div>
            <div className='logo'>
                <Image src="/icons/admin/logo.svg" alt='logo' height={37} width={37} />
                <h1>Bookwise</h1>
            </div>

             <div className='mt-10 flex flex-col gap-2'>
                {ManagerSideBarLink.map(({title,icon:Icon,route}:ManagerSibarLink) => {

                   const isSelected =(route !== "/admin" && pathname.includes(route!) && route!.length > 1) || pathname === route;
                    return (
                        <Link href={route!} key={route}>
                            <div className={cn("link transition duration-200 ease-linear",
                                isSelected && "shadow-sm bg-blue-600",)}>
                            <div className=' size-9'>
                                <Icon className={`${isSelected ?'brightness-0 invert' : ''}  object-contain  `} />
                            </div>
                            <p className={cn("text-[13px] font-medium",isSelected ? "text-white" : "text-dark-500")}>{title}</p>
                            </div>
                        </Link>
                    )
                })}
             </div>
        </div>

        <div className='flex gap-3'>
            <Avatar>
                  <AvatarFallback className='bg-amber-700 font-semibold'>
                     {getInitials(session|| "ON") }
                  </AvatarFallback>
            </Avatar>
        <div className='flex flex-col max-md:hidden'>
           <p className='font-semibold text-dark-200'> {session} </p>
           <p className='text-light-500 text-xs'> {session} </p>
        </div>
        </div>
    </div>
  )
}

export default Sidebar