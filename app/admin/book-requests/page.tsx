'use client';

import useSWR from 'swr';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import BookCover from '@/components/BookCover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { gitInitials } from '@/lib/utils';
import { CircleCheckBig, Delete, Trash, Trash2Icon, XCircle } from 'lucide-react';
import DeleteBookRequest from '@/components/admin-components/DeleteBookRequest';
import { rejectBookRequest } from '@/lib/admin/actions/rejectBookRequest';
import { toast } from '@/hooks/use-toast';
import { approveBookRequest } from '@/lib/admin/actions/approveBookRequest';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const BorrowRequests = () => {
  const { data: borrowRequests = [], isLoading, error, mutate } = useSWR('/api/books/bookRequests', fetcher, {
    refreshInterval: 3000,
  });
  
  const [sortAsc, setSortAsc] = useState(true);
  
  const sortedBookRequests = [...borrowRequests].sort((a, b) => {
    return sortAsc 
      ? a.book.title.localeCompare(b.book.title)
      : b.book.title.localeCompare(a.book.title);
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  

  const handleRejectingBookRequest = async (requestId: string) => {
    try {
          const result = await rejectBookRequest(requestId);
          toast({
              title: "Success",
              description: "Book request rejected successfully",
          });
           
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while rejecting the book request",
                variant: "destructive",
            });
        }
  }

  const handleApprovingBookRequest = async (bookId: string, userId: string, requestId: string) => {
    try {
          const result = await approveBookRequest({bookId, userId, requestId});
          toast({
              title: "Success",
              description: "Book request approved successfully",
          });
           
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while approving the book request",
                variant: "destructive",
            });
        }
  }

  return (
    <section className='bg-[#FFFFFF] p-5 rounded-2xl'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='font-semibold text-xl'>Borrow Book Requests</h1>
        <Button
          className='bg-inherit flex flex-row shadow rounded-md gap-2'
          onClick={() => setSortAsc((prev) => !prev)}
          title={sortAsc ? "Sort users from A to Z" : "Sort users from Z to A"}
        >
          {sortAsc ? "A-Z" : "Z-A"}
          <Image src="/icons/admin/arrow-swap.svg" alt='swap' width={20} height={20}/>
        </Button>
      </div>

      <table className='min-w-full mt-6 border rounded-lg overflow-hidden'>
        <thead className='bg-light-300 text-[#3A354E] text-sm font-light'>
          <tr>
            <th className="px-4 py-2 text-left font-normal">Requested Book</th>
            <th className="px-4 py-2 text-center font-normal">Available Copies</th>
            <th className="px-4 py-2 text-left font-normal">Requested By</th>
            <th className="px-4 py-2 text-center font-normal">Status</th>
            <th className="px-4 py-2 text-center font-normal">Actions</th>
          </tr>
        </thead>

        <tbody >
          {sortedBookRequests.map((request: any) => {
            return (
              <tr key={request.id} className="border-t ">
                <td className='px-4 py-2  text-[#1E293B] font-semibold '>
                  <Link href={`book-requests/${request.book.id}`} className='flex flex-row items-center gap-0'>
                    <div className="relative w-[40px] h-[60px] pt-3">
                      <BookCover
                        variant="extraSmall"
                        className="z-10"
                        coverColor={request.book.coverColor}
                        coverImage={request.book.coverUrl}
                      />
                    </div>
                    <p className='text-[14px] ml-2'>{request.book.title}</p>
                   </Link>
                </td>

                <td className='px-4 py-2 text-center'>
                  {request.book.availableCopies} / {request.book.totalCopies}
                </td>

                <td className=" px-4 py-2   ">
      
                  <div className='flex flex-col max-md:hidden text-sm '>
                    <p className='text-dark-200 font-semibold'>{request.user?.fullName}</p>
                    <p className='text-light-500 text-xs max-xl:hidden'>{request.user?.email}</p>
                  </div>
                </td>

                <td className='px-4 pt-2 text-center'>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    request.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    request.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status}
                  </span>
                </td>

                <td className='flex flex-row items-center justify-center mt-7  gap-3'>
                  {request.status !== 'APPROVED'  && <button type='submit' title='Approve Book Request' className='bg-inherit size-fit pb-4' onClick={() => {handleApprovingBookRequest(request.book.id, request.user.id, request.id)}}>
                    <CircleCheckBig className='text-green size-5'/>
                  </button>}

                  {request.status === 'PENDING' && <button type='submit' title='Reject Book Request' className='bg-inherit size-fit pb-4' onClick={() => {handleRejectingBookRequest(request.id)}}>
                     <XCircle className="w-5 h-5 text-red-500" />
                  </button>}

                  <DeleteBookRequest requestId={request.id} onDelete={mutate} username={request.user.fullName}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default BorrowRequests;