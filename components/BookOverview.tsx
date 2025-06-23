import { Star } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import book from '@/public/icons/book.svg'
import Image from 'next/image'
import BookCover from '@/components/BookCover'

const BookOverview = ({ 
  title, 
  author, 
  genre, 
  rating, 
  total_copies, 
  available_copies, 
  description, 
  color, 
  cover 

}: Book) => {
  return (
    <section className='book-overview'>
      <div className='flex flex-1 flex-col gap-5'>
        <h1>{title}</h1>

        <div className='book-info'>
          <p>
            By <span className='font-semibold text-light-200'>{author}</span>
          </p>
          <p>
            By <span className='font-semibold text-light-200'>{genre}</span>
          </p>

          <div className='flex flex-row items-center gap-1'>
            <Star className='h-5 w-5 text-wight-300'/>
            <p>{rating}</p>
          </div>
        </div>

        <div className='book-copies'>
          <p>
            Total Copies: <span className='font-semibold text-light-200'>{total_copies}</span>
          </p>
          <p>
            Available Books: <span className='font-semibold text-light-200'>{available_copies}</span>
          </p>
        </div>

        <p className='book-description'>{description}</p>

        <Button className='book-overview_btn gap-2' >
          <Image src={book} alt="book" width={20} height={20}/>
          <p className='font-bebas-neue text-xl text-dark-100'>Borrow</p>
        </Button>
      </div>

      <div className='relative flex flex-1 items-center justify-center'>
        <div className='relative'>
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={color}
            coverImage={cover}
          />
          <div className='absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden'>
            <BookCover
            variant="wide"
            coverColor={color}
            coverImage={cover}
          />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookOverview
