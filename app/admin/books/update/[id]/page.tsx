import BookForm from '@/components/admin-components/Forms/BookForm'
import GoBack from '@/components/GoBack'
import { Button } from '@/components/ui/button'
import { G } from '@upstash/redis/zmscore-DzNHSWxc'
import Link from 'next/link'
import React from 'react'

const UpdateBook = async ({ params }: { params: Promise<{id: string}>}) => {
  const id = (await params).id 
  return (
    <>
        <GoBack/>

        <section className='w-full max-w-2xl mt-5'>
            <BookForm type="update" bookId={id}/>
        </section>
    </>
  )   
}

export default UpdateBook