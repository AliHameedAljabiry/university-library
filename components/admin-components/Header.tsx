import { Session } from 'next-auth'
import React from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'

const AdminHeader = ( { session }: {session: Session}) => {

    
  return (
    <header className='admin-header'>
        <div>
            <h2 className='text-2xl font-semibold text-dark-400'>Welcome, {session?.user?.name}</h2>
            <p className='text-slate-500 text-base'>Monitor all of your users and books here</p>
        </div>

        
        <form className="flex items-center bg-white rounded-md border border-gray-200 px-3 py-1 shadow-sm min-w-[320px] w-full max-w-md">
          <Search className="text-[#647488] mr-2" size={20} />
          <Input
            type="text"
            placeholder="Search users, books by title, author, or genre."
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-[#647488] placeholder-[#647488]"
          />
        </form>
    </header>
  )
}

export default AdminHeader