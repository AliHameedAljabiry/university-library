'use server';

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";

// updateBook.ts
export const updateBook = async (params: BookParams) => {
    try {
        const { id, ...rest } = params;
        if (!id) {
            return {
                success: false,
                message: "Book ID is required for update",
            };
        }
        const updatedBook = await db
            .update(books)
            .set({ ...rest })
            .where(eq(books.id, id));

        return {
            success: true,
            data: JSON.parse(JSON.stringify(updatedBook)),
        };
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while updating the book",
        };
    }
}