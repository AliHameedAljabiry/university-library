import BookForm from '@/components/admin-components/Forms/BookForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'


const CreateNewBook = () => {
  return (
    <>
        <Button className='back-btn'>
            <Link href="/admin/books">Go Back</Link>
        </Button>

        <section className='w-full max-w-2xl'>
            <BookForm type="create" />
        </section>
    </>
    
  )   
}

export default CreateNewBook;