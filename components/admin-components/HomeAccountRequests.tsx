'use client';
import useSWR from 'swr'
import React from 'react'
import Image from 'next/image';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { gitInitials } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then(res => res.json())

const HomeAccountRequests = () => {
    const { data: accountRequests = [], isLoading, error } = useSWR('api/users/accountRequests', fetcher, {
        refreshInterval: 3000
    })

    if (isLoading) return <div>Loading Account Requests ...</div>
    if (error) return <div>Error Loading Account Requests ...</div>

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-2 overflow-y-auto max-h-[300px]'>
        {accountRequests.length === 0 ? (
            <div className='flex flex-col items-center justify-center px-5 py-2 pb-6 rounded-2xl'>
                <Image src="icons/noAccountRequest.svg" alt='' width={150} height={150}/>
                <h3 className='text-[#1E293B] font-semibold'>No Pending Account Requests</h3>
                <p className='text-[#64748B] '>There are no account requests awaiting your review at this time.</p>
            </div>
        ) : (
            accountRequests.map((request: any) => (
                <div key={request.id} className='flex flex-col items-center justify-center px-5 py-2 pb-6 bg-light-300 rounded-2xl'>
                    <Avatar className='w-[60px] h-[60px] mb-2'>
                        <AvatarFallback className='bg-amber-100'>
                            {gitInitials(request?.fullName || '')}
                        </AvatarFallback>
                    </Avatar>
                    <h3 className='text-[#1E293B] text-[15px] font-semibold'>{request.fullName}</h3>
                    <p className='text-[#64748B] text-sm overflow-x-hidden text-center text-ellipsis whitespace-nowrap w-full max-w-full'>{request.email}</p> 
                </div>
            ))
        )}
    </div>
  )
}

export default HomeAccountRequests