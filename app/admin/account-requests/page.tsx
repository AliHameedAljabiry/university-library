'use client';

import useSWR from 'swr'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn, gitInitials } from '@/lib/utils';
import Link from 'next/link';
import DeleteUser from '@/components/admin-components/DeleteUser';
import { Check, X } from 'lucide-react';
import { rejectUser } from '@/lib/admin/actions/rejectUser';
import { approveUser } from '@/lib/admin/actions/approveUser';

const fetcher = (url: string) => fetch(url).then(res => res.json())

const AccountRequests = () => {
  const {data: pendingAndRejectedUsers = [], isLoading, error, mutate } = useSWR('/api/users/accountRequests', fetcher, {
    refreshInterval: 3000, 
  })
  

  // Sort users by name
  const [sortAsc, setSortAsc] = useState(true);
  const sortedPendingAndRejectedUsers = [... pendingAndRejectedUsers].sort((a, b) => {
    if(!a.fullName || !b.fullName) return 0
    return sortAsc
      ? a.fullName.localeCompare(b.fullName)
      : b.fullName.localeCompare(a.fullName)
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading users.</div>


  
  return (
    <section className='bg-[#FFFFFF] p-5 rounded-2xl'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='font-semibold text-xl'>All Users</h1>
        <Button
          className='bg-inherit flex flex-row shadow rounded-md gap-2'
          onClick={() => setSortAsc((prev) => !prev)}
          title={sortAsc ? "Sort users from A to Z" : "Sort users from Z to A"}
        >
          {sortAsc ? "A-Z" : "Z-A"}
          <Image src="/icons/admin/arrow-swap.svg" alt='swap' width={20} height={20}/>
        </Button>
      </div>

      <table className='min-w-full mt-6 border rounded-lg overflow-hidden'>
        <thead className="bg-light-300 text-[#3A354E] text-sm font-light ">
            <tr>
              <th className="px-4 py-2 text-left font-normal">Name</th>
              <th className="px-4 py-2 text-left font-normal">Date Joined</th>
              <th className="px-4 py-2 text-center font-normal">Status</th>
              <th className="px-4 py-2 text-center font-normal">University ID No</th>
              <th className="px-4 py-2 text-left font-normal">University ID Card</th>
              <th className="px-4 py-2 text-center font-normal">Actions</th>
            </tr>
        </thead>

        <tbody>
          {sortedPendingAndRejectedUsers.map((user: User) => (
            <tr key={user.id} className="border-t">
             
              <td className="px-4 py-2 flex flex-row items-center text-sm gap-3">
                <Avatar>
                    <AvatarFallback className='bg-amber-100'>
                        {gitInitials(user?.fullName || '')}
                    </AvatarFallback>
                </Avatar>
                <div className='flex flex-col max-md:hidden text-sm'>
                  <p className='text-dark-200 font-semibold'>{user?.fullName}</p>
                  <p className='text-light-500 text-xs max-xl:hidden'>{user?.email}</p>
                </div>
              </td>
              

              <td className="px-4 py-2 text-[#3A354E] text-sm">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : 'N/A'}
              </td>
              
              <td className={cn('px-4 py-2 text-center text-sm', user.status === 'REJECTED' ? 'text-red-600' : 'text-[#3A354E]')}>
                {user?.status.charAt(0).toUpperCase() + user.status.slice(1).toLowerCase()}
              </td>

              <td className="px-4 py-2 text-center text-sm text-[#3A354E]">{user.universityId}</td>
              <td className="px-4 py-2 text-center text-sm text-[#3A354E]">
                  {user.universityCard && (
                    <Link href={`/admin/users/userCardId/${user.id}`} className="rounded text-[#0089F1] flex flex-row gap-2 text-sm" >
                      View ID Card
                      <Image src='/icons/admin/export.svg' alt='export user card' width={15} height={15}/>
                    </Link>
                  )}
              </td>
              <td className={cn("px-4 py-2 flex flex-row   items-center justify-center", user.status === 'REJECTED' ? "gap-5" : "")}>
                  <Button className='bg-inherit pe-1 ' onClick={() => approveUser(user.id)}> 
                    <Check className='text-green'/>
                  </Button>
                  {user.status == 'PENDING' && <Button className='bg-inherit pe-4' onClick={() => rejectUser(user.id)} >
                    <X className='text-yellow-600'/>
                  </Button>}
                  <DeleteUser userId={user.id} onDelete={mutate} username={user.fullName as string} />
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </section>
  )
}

export default AccountRequests