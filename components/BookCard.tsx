import Link from 'next/link'
import React from 'react'
import BookCover from './BookCover'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from './ui/button'
import { Calendar } from 'lucide-react'

const BookCard = ({id, title, genre, color, cover, isLoanedBook=false}: Book) => {
  return (
    <Link href={`/book/${id}`} className={cn(isLoanedBook && 'flex flex-col items-center w-full')}>
      <BookCover coverColor={color} coverImage={cover}/>

      <div className={cn('mt-4', !isLoanedBook && 'xs:max-w-40 max-w-28')}>
        <p className='book-title'>{title}</p>
        <p className='book-genre'>{genre}</p>
      </div>

      {isLoanedBook && (
        <div className='mt-3 w-full'>
          <div className='book-loaned'>
            <Calendar className='text-light-100' size={16}/>
            <p className='text-light-100'>11 days left to return</p>
          </div>
          <Button className='book-btn text-black'>Download receipt</Button>
      </div>)}
    </Link>
  )
}

export default BookCard 
