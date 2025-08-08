'use client';
import React, { useState } from 'react'
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { deleteBookRequest } from '@/lib/admin/actions/deleteBookRequest';

interface DeleteBookProps {
    requestId: string;
    onDelete: () => void;
    username: string;
}

const DeleteBookRequest = ({ requestId, onDelete, username }: DeleteBookProps) => {
     const [open, setOpen] = useState(false);

    const handleDeleteBookRequest = async () => {
        try {
            const result = await deleteBookRequest({ requestId });
            toast({
                title: "Success",
                description: "Book request deleted successfully",
            });
            setOpen(false);
            if (onDelete) onDelete();
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while deleting the book request",
                variant: "destructive",
            });
        }
    };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <button
        type="button"
        className="bg-inherit pb-4"
        title="Delete Book Request"
      >
        <Trash2 className="text-[#EF3A4B] hover:text-red-700 size-5" />
      </button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        Are you sure you want to delete <b>{username} request</b>?
      </DialogTitle>
      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDeleteBookRequest}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default DeleteBookRequest