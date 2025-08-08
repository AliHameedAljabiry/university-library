import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET() {
    const allBooks = await db.select().from(books).orderBy(desc(books.createdAt))
    return NextResponse.json(allBooks)
}


