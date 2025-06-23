import React from 'react'
import BookCard from './BookCard'
import { cn } from '@/lib/utils';

interface Props {
  title?: string;
  books: Book[]; 
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName}: Props) => {
  return (
    <section className={containerClassName}>
      <h2 className='font-bebas-neue text-4xl text-light-100'>{title}</h2>

      <ul className='book-list'>
        {books.map((book: Book) => (
          <li key={book.title} className={cn(book.isLoanedBook && 'xs:w-52 w-full')}>
            <BookCard {...book}/>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BookList
