'use client';

import useSWR from 'swr'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'
import BookCover from '@/components/BookCover';
import { Edit3 } from 'lucide-react';
import Image from 'next/image';
import DeleteBook from '@/components/admin-components/DeleteBook';


const fetcher = (url: string) => fetch(url).then(res => res.json())

const AllBooks = () => {
  const { data: allBooks = [], isLoading, error, mutate } = useSWR('/api/books/all-books', fetcher, {
    refreshInterval: 3000, 
  }) 

  // Sort users by name
    const [sortAsc, setSortAsc] = useState(true);
    const sortedBooks = [...allBooks].sort((a, b) => {
      if (!a.title || !b.title) return 0;
      return sortAsc
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading users.</div>

  return (
    <section className='w-full rounded-2xl bg-white p-7'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
            <h2 className='text-2xl font-semibold'>All Books</h2>
            <div className='flex flex-row gap-5'>
              <Button 
                className='bg-inherit flex flex-row shadow rounded-md gap-2'
                onClick={() => setSortAsc((prev) => !prev)}
                title={sortAsc ? "Sort users from A to Z" : "Sort users from Z to A"}
              >
                {sortAsc ? "A-Z" : "Z-A"}
                <Image src="/icons/admin/arrow-swap.svg" alt='swap' width={20} height={20}/>
              </Button>

              <Button className='bg-primary-admin' asChild>
                  <Link className='text-light-800' href="/admin/books/new">+ Create a New  Book</Link> 
              </Button>
            </div>
        </div>

        <div className=''>
           <table className='min-w-full mt-6 border rounded-lg overflow-hidden'>
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-normal">Book Title</th>
                  <th className="px-4 py-2 text-left font-normal">Author</th>
                  <th className="px-4 py-2 text-left font-normal">Genre</th>
                  <th className="px-4 py-2 text-left font-normal">Date Created</th>
                  <th className="px-4 py-2 text-left font-normal">Action</th>
                </tr>
              </thead>

              <tbody>
                 {sortedBooks.map((book: Book) => (
                    <tr key={book.id} className='border-t'>
                      <td className='px-4 py-2 flex flex-row items-center  gap-0 text-[#1E293B] font-semibold'>
                          <div className="relative w-[40px] h-[60px] pt-3">
                           <BookCover
                              variant="extraSmall"
                              className="z-10"
                              coverColor={book.coverColor}
                              coverImage={book.coverUrl}
                            />
                          </div>

                          <p className='text-[14px]'>{book.title}</p>
                      </td>

                      <td className='text-[#3A354E] text-[15px] font-medium '>{book.author}</td>
                      <td className='text-[#3A354E] text-[15px] font-medium '>{book.genre}</td>
                      <td className='text-[#3A354E] text-[15px] font-medium '>{new Date(book.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</td>

                      <td className='flex flex-row gap-4 items-center justify-center'>
                          <Link href={`/admin/books/update/${book.id}`} title='Edit Book' className='bg-inherit pb-4'>
                              <Edit3 className='text-[#0089F1] hover:text-[#383bf8] size-5'/>
                          </Link>
                          <DeleteBook bookId={book.id} onDelete={mutate} title={book.title}/>
                      </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
    </section>
  )
}

export default AllBooks