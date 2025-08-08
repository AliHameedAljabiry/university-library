"use server";

import { db } from "@/database/drizzle";
import { books, borrowRequests, users } from "@/database/schema";
import { and, eq } from "drizzle-orm";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    // Check user status first
    const user = await db
      .select({ status: users.status })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (user[0]?.status !== "APPROVED") {
      return {
        success: false,
        error: "Your account is not approved for borrowing",
      };
    }

    // Then check book availability
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    await db.insert(borrowRequests).values({
      userId,
      bookId,
      status: "PENDING",
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};