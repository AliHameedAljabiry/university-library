'use client';
import useSWR from 'swr'
import BookCard from './BookCard';

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
})

const UserBooks = () => {
  const {data: borrowedBooks = [], isLoading, error, mutate} = useSWR('/api/books/borrowedBooks', fetcher)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading borrowed books: {error.message}</div>

  return (
    <div>
      <h2 className='text-xl text-white font-bold mb-4'>My Borrowed Books</h2>
      {borrowedBooks.length === 0 && <p className='text-white'>No borrowed books.</p>}
      
      <ul className='book-list'>
        {borrowedBooks.map(({ borrowRecords, book }: { borrowRecords: any, book: any }) => (
          <div key={borrowRecords.id} className="mb-8 ">
            <BookCard key={book.title} {...book} isLoanedBook={false} />
            <div className="mt-2 text-sm text-gray-500">
              <div>Borrowed on: {new Date(borrowRecords.borrowDate).toLocaleDateString('en-US')}</div>
              <div>Due date: {new Date(borrowRecords.dueDate).toLocaleDateString('en-US')}</div>
              <div>Status: {borrowRecords.status}</div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default UserBooks