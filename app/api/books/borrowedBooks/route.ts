import { auth } from "@/auth"
import { db } from "@/database/drizzle"
import { books, borrowRecords } from "@/database/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await auth()
    const userId = session?.user?.id
     
    if (!userId) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }
      
    try {
        const borrowedBooks = await db
            .select({
                borrowRecords: borrowRecords,
                book: books
            })
            .from(borrowRecords)
            .innerJoin(books, eq(borrowRecords.bookId, books.id))
            .where(eq(borrowRecords.userId, userId))

        return NextResponse.json(borrowedBooks)
    } catch (error) {
        console.error("Error fetching borrowed books:", error)
        return NextResponse.json(
            { error: "Failed to fetch borrowed books" },
            { status: 500 }
        )
    }
}