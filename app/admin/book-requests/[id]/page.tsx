import BookCover from '@/components/BookCover';
import BookVideo from '@/components/BookVideo';
import GoBack from '@/components/GoBack'
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { Calendar, Edit2, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const AdminBookDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const [bookDetails] = await db
      .select()
      .from(books)
      .where(eq(books.id, id))
      .limit(1);
  if (!bookDetails) redirect("/404");

  return (
    <div className='flex flex-col gap-5'>
      <GoBack/>

      <div className='flex flex-row gap-6 items-center'>
        <div
          className='relative w-[280px] h-[260px] pt-3 pb-3 rounded-lg'
          style={{
            backgroundColor: bookDetails.coverColor
              ? `${bookDetails.coverColor}1A`
              : undefined, // 1A is ~10% opacity in hex
          }}
        >
          <BookCover
            variant="medium"
            className="z-10 absolute top-[30px] left-[63px]"
            coverColor={bookDetails.coverColor}
            coverImage={bookDetails.coverUrl}
          />
        </div>
        
        <div className='flex flex-col gap-2 h-full px-3'>
          <div className='flex flex-row gap-1 items-center text-[18px]'>Created at:  
              <Calendar   className='text-[#64748B] size-4 ml-3' width={12} height={12}/>
              <p className='text-[#64748B] text-[18px] '>
                  {new Date(bookDetails.createdAt as Date).toLocaleDateString('en-US',  {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                  })}
              </p>
          </div>
          <h1 className='text-[24px] font-semibold text-[#1E293B]'>{bookDetails.title}</h1>
          <p className='text-[18px] text-[#3A354E] font-semibold mt-2'>By {bookDetails.author}</p>
          <p className='text-[16px] text-[#64748B] mt-1'>{bookDetails.genre}</p>
          <Link  
            href={`/admin/books/update/${bookDetails.id}`} 
            title='Edit Book' 
            className='flex flex-row items-center justify-center mt-4 h-[44px] gap-2 text-white bg-[#25388C] w-full rounded-md'>
              <Edit3 className='size-5'/>
              <span className='text-[16px] font-semibold'>Edit Book</span>
          </Link>
        </div>
      </div>

      <div className='flex flex-row gap-5 items-center w-full' >
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>

            <div className="space-y-5 text-[16px] pe-3 font-normal text-[#64748B] ">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-7">
            <h3>Video</h3>

            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
      </div>
    </div>
  )
}

export default AdminBookDetails