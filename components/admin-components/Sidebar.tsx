'use client'
import { adminSideBarLinks } from '@/constants'
import { cn, gitInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Session } from 'next-auth'


const Sidebar =  ({ session }: {session: Session}) => {


  const pathname = usePathname();

  return (
    <div className='admin-sidebar'>
      <div>
        <Link className='logo' href="/">
          <Image src='/icons/admin/logo.svg' alt='logo' width={37} height={37}/>
          <h1>BookWise</h1>
        </Link>

        <div className='mt-10 flex flex-col gap-5'>
          {adminSideBarLinks.map((link) => {
            //isSelected will be true when: 
              // 1- if the pathname  is equel to /admin this will be the admin home page wich has the path /admin
              // 2- if the pathname is note equel to /admin and includes any link.route (this means 
                  // that the /admin is part of the path not all of it) and pathname length has more than one charecter it means more than / 
            // otherwise it will be false
            const isSelected = (link.route !== '/admin' && pathname.includes(link.route) && link.route.length > 1) || pathname == link.route;

            return (
                <Link href={link.route} key={link.route}>
                  <div className={cn('link', isSelected && 'bg-primary-admin shadow-sm')}>
                    <div className='relative size-5'>
                    <Image src={link.img} alt='admin' className={`${isSelected ? 'brightness-0 invert' : ''} object-contain`} width={20} height={20}/>
                    </div>

                    <p className={cn(isSelected ? 'text-white' : 'text-dark')}>{link.text}</p>
                  </div>
                </Link>
            )
          })}
        </div>
      </div>

      <div className='user'>
          <Avatar>
              <AvatarFallback className='bg-amber-100'>
                  {gitInitials(session?.user?.name || '')}
              </AvatarFallback>
          </Avatar>

          <div className='flex flex-col max-md:hidden'>
            <p className='text-dark-200 font-semibold'>{session?.user?.name}</p>
            <p className='text-light-500 text-xs'>{session?.user?.email}</p>
          </div>
      </div>
    </div>
  )
}

export default Sidebar