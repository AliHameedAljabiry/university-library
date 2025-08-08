'use client';

import useSWR from 'swr'

import HomeAccountRequests from '@/components/admin-components/HomeAccountRequests'
import HomeBorrowRequests from '@/components/admin-components/HomeBorrowRequests'
import HomeLatestBooks from '@/components/admin-components/HomeLatestBooks'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Admin = () => {
  const { data: totalBorrrowedBooks = [], error: borrowError } = useSWR('/api/books/borrowedBooks', fetcher, {
    refreshInterval: 3000,
  })
  const { data: totalUsers = [], error: userError } = useSWR('/api/users/all-users', fetcher, {
    refreshInterval: 3000,
  })
  const { data: totalBooks = [], error: bookError } = useSWR('/api/books/all-books', fetcher, {
    refreshInterval: 3000,
  })

  return (
    <section className='flex flex-col gap-7'>
      <div className='flex flex-row gap-5 w-full'>
        <div className='bg-[#FFFFFF] p-5 rounded-2xl w-full'>
          <div className='flex flex-row gap-4'>
            <h3 className='text-[#64748B] font-medium'>Borrowed Books</h3>
            <div className='flex flex-row gap-1 items-center'>
              <Image src='icons/admin/vector.svg' alt='vector' width={15} height={15}/>
              <span className='text-[#E27233] font-normal' ></span>
            </div>
          </div>

          <h1 className='font-semibold text-[30px] mt-3'>{totalBorrrowedBooks.length}</h1>
        </div>
        <div className='bg-[#FFFFFF] p-5 rounded-2xl w-full'>
          <div className='flex flex-row gap-4'>
            <h3 className='text-[#64748B] font-medium'>Total Users</h3>
            <div className='flex flex-row gap-1 items-center'>
              <Image src='icons/admin/vector.svg' alt='vector' width={15} height={15}/>
              <span className='text-[#E27233] font-normal' ></span>
            </div>
          </div>

          <h1 className='font-semibold text-[30px] mt-3'>{totalUsers.length}</h1>
        </div>
        <div className='bg-[#FFFFFF] p-5 rounded-2xl w-full'>
          <div className='flex flex-row gap-4'>
            <h3 className='text-[#64748B] font-medium'>Total Books</h3>
            <div className='flex flex-row gap-1 items-center'>
              <Image src='icons/admin/vector.svg' alt='vector' width={15} height={15}/>
              <span className='text-[#E27233] font-normal' ></span>
            </div>
          </div>

          <h1 className='font-semibold text-[30px] mt-3 '>{totalBooks.length}</h1>
        </div>
      </div>

      <div className='flex flex-row gap-3 w-full'>
        <div className='flex flex-col gap-5 w-full'>
          <div className='w-full bg-[#FFFFFF] p-5 rounded-2xl'>
            <div className='flex flex-row items-center justify-between mb-3'>
              <h1 className='font-semibold text-[20px] text-[#1E293B]'>Borrow Requests</h1>
              <Link href='admin/book-requests' className='text-[#25388C] shadow p-2 rounded-sm text-[14px] font-semibold'>View all</Link>
            </div>

            <HomeBorrowRequests/>
          </div>
          <div className='w-full bg-[#FFFFFF] p-5 rounded-2xl'>
            <div className='flex flex-row items-center justify-between mb-3'>
              <h1 className='font-semibold text-[20px] text-[#1E293B]'>Account Requests</h1>
              <Link href='admin/account-requests' className='text-[#25388C] shadow p-2 rounded-sm text-[14px] font-semibold'>View all</Link>
            </div>

            <HomeAccountRequests/>
          </div>
        </div>

        <div className='w-full bg-[#FFFFFF] p-5 rounded-2xl'>
          <div className='flex flex-row items-center justify-between mb-3'>
            <h1 className='font-semibold text-[20px] text-[#1E293B]'>Recently Added Books</h1>
            <Link href='/admin/books' className='text-[#25388C] shadow p-2 rounded-sm text-[14px] font-semibold'>View all</Link>
          </div>

          <div className='flex flex-row items-center gap-3 bg-light-300 p-4 rounded-lg mb-3'>
            <Link href="admin/books/new" className='flex items-center justify-center rounded-full w-12 h-12  bg-[#FFFFFF]'>
              <span className='text-[35px] pb-1'>+</span>
            </Link>
            <h1 className='text-[#1E293B] font-medium text-[18px]'>Add New Book</h1>
          </div>

          <HomeLatestBooks/>
        </div>
      </div>
      
    </section>
  )
}

export default Admin