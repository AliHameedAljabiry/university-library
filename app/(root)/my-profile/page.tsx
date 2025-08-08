
import { auth, signOut } from '@/auth'
import BookCard from '@/components/BookCard'
import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import UserBooks from '@/components/UserBooks'


const Profile = async () => {
  const session = await auth()
 
  return (
    <div className='flex flex-wrap flex-row justify-around gap-5'>
      <div>
         <div className=''>
          <Image src={session?.user?.image ?? '/images/universityCard.png'} alt='user image' width={500} height={500} />
          <div className='flex flex-col text-2xl text-white mt-10 gap-5'>
            <h1 className=' font-semibold'>{`Student Name: ${session?.user?.name}`}</h1>
            <h1 className=' '>{`Student Email: ${session?.user?.email}`}</h1>
          </div>
      </div>
        <form className='mb-10 mt-10 flex justify-center' action={async () => {
            'use server'
            await signOut()
        }}>
            <Button>Logout</Button>
        </form>
      </div>

      <UserBooks/>

    </div>
  )
}

export default Profile