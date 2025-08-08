'use server';

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";

export const deleteBook =  async ({ bookId }: { bookId: string}) => {
    try {
        await db
            .delete(books)
            .where(eq(books.id, bookId))

    } catch (error) {
        console.log(error)
    }
}