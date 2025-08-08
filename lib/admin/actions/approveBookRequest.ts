"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, borrowRequests, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

interface ApproveParams {
  bookId: string
  userId: string
  requestId: string
}

export const approveBookRequest = async ({bookId, userId, requestId}: ApproveParams) => {


  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    
    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    const approveRequest = await db
      .update(borrowRequests)
      .set({status: 'APPROVED'})
      .where(eq(borrowRequests.id, requestId))
      .returning(); 

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    
    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};