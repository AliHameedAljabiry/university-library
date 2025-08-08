"use client";

import { toast } from '@/hooks/use-toast';
import { deleteBook } from '@/lib/admin/actions/deleteBook';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteBookProps {
    bookId: string;
    onDelete: () => void;
    title: string;
}

const DeleteBook = ({ bookId, onDelete, title }: DeleteBookProps) => {
    const [open, setOpen] = useState(false);

    const handleDeleteBook = async () => {
        try {
            const result = await deleteBook({ bookId });
            toast({
                title: "Success",
                description: "Book deleted successfully",
            });
            setOpen(false);
            if (onDelete) onDelete();
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while deleting the book",
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
        title="Delete Book"
      >
        <Trash2 className="text-[#EF3A4B] hover:text-red-700 size-5" />
      </button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        Are you sure you want to delete <b>{title}</b>?
      </DialogTitle>
      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDeleteBook}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
};

export default DeleteBook;