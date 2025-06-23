import { signOut } from '@/auth'
import BookList from '@/components/BookList'
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants'
import React from 'react'

const Profile = () => {
  return (
    <>
        <form className='mb-10' action={async () => {
            'use server'
            await signOut()
        }}>
            <Button>
                Logout
            </Button>
        </form>

        <BookList title='Boorowed Books' books={sampleBooks}/>
    </>
  )
}

export default Profile