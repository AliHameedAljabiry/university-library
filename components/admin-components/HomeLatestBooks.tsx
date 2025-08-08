'use client';
import useSWR from 'swr';
import React from 'react'
import BookCover from '../BookCover';
import Link from 'next/link';
import { Calendar, Eye } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const HomeLatestBooks = () => {
    const { data: latestBooks = [], isLoading, error } = useSWR('/api/books/all-books', fetcher, {
        refreshInterval: 3000,
    });
    if (isLoading) return <div>Loading Latest Books...</div>;
    if (error) return <div>Error loading latest books.</div>;
    if (!latestBooks || latestBooks.length === 0) return <div>No Latest Books found</div>;

  return (
    <div className='flex flex-col gap-5 overflow-y-auto max-h-[450px]'>
        {latestBooks.map((book: BookParams) => (
            <div key={book.id} className='px-5 py-1 pb-6 flex flex-row gap-1 items-center  h-fit rounded-2xl'>
                <div className="relative w-[60px] h-[80px] pt-3">
                    <BookCover
                        variant="small"
                        className="z-10"
                        coverColor={book.coverColor}
                        coverImage={book.coverUrl}
                    />
                </div>

                <div className='flex flex-col w-full pt-2'>
                    <div className='flex flex-row items-center justify-between w-full'>
                        <p className='text-[16px] ml-2 text-[#1E293B] font-semibold'>{book.title}</p>
                        <Link href={`books/${book.id}`} className='bg-[#FFFFFF] px-2 py-1 rounded-md shadow'>
                            <Eye className='text-[#475569] w-[20px] h-[20px]'/>
                        </Link>
                    </div>
                    <div className='flex flex-row gap-2 ml-2'>
                        <p className='text-[14px]  text-[#64748B]'>By {book.author}</p>
                        <p className='text-[40px] -mt-8 text-[#64748B]'>.</p>
                        <p className='text-[14px]  text-[#64748B]'>{book.genre}</p>
                    </div>
                    
                    <div className='flex flex-row gap-1 items-center ml-2'>
                        <Calendar   className='text-[#3A354E]' width={12} height={12}/>
                        <p className='text-[#3A354E] text-[12px] '>
                            {new Date(book.createdAt as Date).toLocaleDateString('en-US',  {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                   
                </div>
            </div>
        ))}
      
    </div>
  )
}

export default HomeLatestBooks