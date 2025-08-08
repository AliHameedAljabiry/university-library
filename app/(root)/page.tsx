'use client'

import BookList from '@/components/BookList';
import BookOverview from '@/components/BookOverview';
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())
const Home = () => {
  const { data: latestBooks = [], isLoading, error, mutate } = useSWR('/api/books/all-books', fetcher, {
    refreshInterval: 3000, 
  })
  


  return (
    <>
     <BookOverview {...latestBooks[0]}  />

     <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;