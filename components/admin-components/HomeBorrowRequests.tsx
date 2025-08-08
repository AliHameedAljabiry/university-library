'use client';

import useSWR from 'swr'
import React from 'react'
import BookCover from '../BookCover';
import { Calendar, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(res => res.json())

const HomeBorrowRequests = () => {
    const { data: borrowRequests = [], isLoading, error, mutate } = useSWR('api/books/bookRequests', fetcher, {
        refreshInterval: 3000
    })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error Borrow Requests: {error.message}</div>
  if (!borrowRequests) return <div>No Borrow Requests found</div>
 
  return (
    <div className='flex flex-col gap-5 overflow-y-auto max-h-[300px]'>
        {borrowRequests.length === 0 && (
            <div className='flex flex-col items-center justify-center px-5 py-2 pb-6  rounded-2xl'>
                <Image src="icons/noBookRequest.svg" alt='' width={150} height={150}/>
                <h3 className='text-[#1E293B] font-semibold'>No Pending Book Requests</h3>
                <p className='text-[#64748B] '>There are no borrow book requests awaiting your review at this time.</p>
            </div>
        )}
            
        {borrowRequests.map((request: any) => (  
        
            <div key={request.id} className='px-5 py-1 pb-6 flex flex-row gap-1 items-center bg-light-300 h-fit rounded-2xl'>
                <div className="relative w-[60px] h-[80px] pt-3">
                    <BookCover
                        variant="small"
                        className="z-10"
                        coverColor={request.book.coverColor}
                        coverImage={request.book.coverUrl}
                    />
                </div>

                <div className='flex flex-col w-full'>
                    <div className='flex flex-row items-center justify-between w-full'>
                        <p className='text-[16px] ml-2 text-[#1E293B] font-semibold'>{request.book.title}</p>
                        <Link href={`admin/book-requests/${request.book.id}`} className='bg-[#FFFFFF] px-2 py-1 rounded-md shadow'><Eye className='text-[#475569] w-[20px] h-[20px]'/></Link>
                    </div>
                    <div className='flex flex-row gap-2 ml-2'>
                        <p className='text-[14px]  text-[#64748B]'>By {request.book.author}</p>
                        <p className='text-[40px] -mt-8 text-[#64748B]'>.</p>
                        <p className='text-[14px]  text-[#64748B]'>{request.book.genre}</p>
                    </div>
                    <div className='flex flex-row gap-5 ml-2'>
                        <p className='text-[#3A354E] text-[12px] '>{request.user.fullName}</p>
                        <div className='flex flex-row gap-1 items-center'>
                            <Calendar   className='text-[#3A354E]' width={12} height={12}/>
                            <p className='text-[#3A354E] text-[12px] '>
                                {new Date(request.createdAt).toLocaleDateString('en-US',  {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ))}
            
    </div>
  )
}

export default HomeBorrowRequests