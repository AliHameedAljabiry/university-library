'use client'

import useSWR from 'swr'
import DeleteUser from '@/components/admin-components/DeleteUser'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn, gitInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  universityId: number;
  universityCard: string;
  borrowedBooksCount: number;
}

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }
  return res.json()
})

const AllUsers = () => {
  const { data: allUsers, isLoading, error, mutate } = useSWR<User[]>('/api/users/all-users', fetcher, {
    refreshInterval: 3000, 
  })

  // Sort users by name
  const [sortAsc, setSortAsc] = useState(true);
  const sortedUsers = allUsers ? [...allUsers].sort((a, b) => {
    if (!a.fullName || !b.fullName) return 0;
    return sortAsc
      ? a.fullName.localeCompare(b.fullName)
      : b.fullName.localeCompare(a.fullName)
  }) : [];

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading users: {error.message}</div>
  if (!allUsers) return <div>No users found</div>

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
      <div className='users font-medium'>
        <table className="min-w-full mt-6 border rounded-lg overflow-hidden">
          <thead className="bg-light-300 text-[#3A354E] text-sm font-light ">
            <tr>
                <th className="px-4 py-2 text-left font-normal">Name</th>
                <th className="px-4 py-2 text-left font-normal">Date Joined</th>
                <th className="px-4 py-2 text-center font-normal">Role</th>
                <th className="px-4 py-2 text-center font-normal">Books Borrowed</th>
                <th className="px-4 py-2 text-left font-normal">University ID No</th>
                <th className="px-4 py-2 text-left font-normal">University ID Card</th>
                <th className="px-4 py-2 text-left font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2 flex flex-row items-center text-sm gap-3">
                  <Avatar>
                      <AvatarFallback className='bg-amber-100'>
                          {gitInitials(user.fullName)}
                      </AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col max-md:hidden text-sm'>
                    <p className='text-dark-200 font-semibold'>{user.fullName}</p>
                    <p className='text-light-500 text-xs max-xl:hidden'>{user.email}</p>
                  </div>
                </td>
                <td className="px-4 py-2 text-[#3A354E] text-sm">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </td>
                <td className={"px-4 py-2 text-center text-sm"}>
                  <span 
                    className={cn(
                      'py-1 px-2 rounded-2xl', 
                      user.role === 'ADMIN' 
                        ? 'text-[#027A48] bg-[#ECFDF3]' 
                        : 'text-[#C11574] bg-[#FDF2FA]'
                    )}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
                  </span>
                </td>
                <td className="px-4 py-2 text-center text-sm text-[#3A354E]">
                  {user.borrowedBooksCount}
                </td>
                <td className="px-4 py-2 text-center text-sm text-[#3A354E]">
                  {user.universityId}
                </td>
                <td className="px-4 py-2 text-center text-sm text-[#3A354E]">
                  {user.universityCard && (
                    <Link 
                      href={`/admin/users/userCardId/${user.id}`} 
                      className="rounded text-[#0089F1] flex flex-row gap-2 text-sm"
                    >
                      View ID Card
                      <Image src='/icons/admin/export.svg' alt='export user card' width={15} height={15}/>
                    </Link>
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <DeleteUser userId={user.id} onDelete={mutate} username={user.fullName}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AllUsers