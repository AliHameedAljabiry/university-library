'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { cn, gitInitials } from '@/lib/utils'
import Image from 'next/image'
import logo from '@/public/icons/logo.svg' 
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Session } from 'next-auth'


const Header = ( {session}: { session: Session}) => {
    const pathname = usePathname()
  return (
    <header className='my-10 flex items-center  justify-between gap-5'>
        <Link href='/'>
            <Image src={logo}  alt='logo' width={100} />
        </Link>
        <ul className='flex flex-row items-center gap-8'>
            <li>
                <Link href='/librery' className={cn('text-base cursor-pointer capitalize', pathname === '/librery' ? 'text-light-200 font-semibold' : 'text-light-100')}>Library</Link>
               
            </li>
            <li>
                <Link href='/sign-in' className={cn('text-base cursor-pointer capitalize', pathname === '/sign-in' ? 'text-light-200 font-semibold' : 'text-light-100')}>Sign In</Link>
               
            </li>
            <li>
                <Link href='/sign-up' className={cn('text-base cursor-pointer capitalize', pathname === '/sign-up' ? 'text-light-200 font-semibold' : 'text-light-100')}>Sign Up</Link>
               
            </li>
            <li>
                <Link href='/my-profile'> 
                    <Avatar>
                        <AvatarFallback className='bg-amber-100'>
                            {gitInitials(session?.user?.name || '')}
                        </AvatarFallback>
                    </Avatar>
                </Link>
               
            </li>
        </ul>
      
    </header>
  )
}

export default Header
