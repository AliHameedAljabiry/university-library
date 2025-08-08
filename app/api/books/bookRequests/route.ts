
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { borrowRequests, users, books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET() {
  const session = await auth();
  
  // Ensure only admins can access this
  if (session?.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const bookRequests = await db
    .select({
      id: borrowRequests.id,
      status: borrowRequests.status,
      book: {
        id: books.id,
        title: books.title,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
        availableCopies: books.availableCopies,
        totalCopies: books.totalCopies,
        author: books.author,
        genre: books.genre
        
      },
      user: {
        id: users.id,
        fullName: users.fullName,
        email: users.email
      },
      createdAt: borrowRequests.createdAt
    })
    .from(borrowRequests)
    .leftJoin(books, eq(borrowRequests.bookId, books.id))
    .leftJoin(users, eq(borrowRequests.userId, users.id))
    

  return NextResponse.json(bookRequests);
}