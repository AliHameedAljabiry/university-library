import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users, borrowRecords } from "@/database/schema";
import { NextResponse } from "next/server";
import { count, eq, and, sql } from "drizzle-orm";

export async function GET() {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const allUsers = await db
            .select({
                id: users.id,
                email: users.email,
                fullName: users.fullName,
                universityId: users.universityId,
                universityCard: users.universityCard,
                role: users.role,
                createdAt: users.createdAt,
                borrowedBooksCount: sql<number>`COUNT(borrow_records.id)`.as("borrowedBooksCount"),
            })
            .from(users)
            .leftJoin(borrowRecords, and(
                eq(users.id, borrowRecords.userId),
                eq(borrowRecords.status, 'BORROWED')
            ))
            .groupBy(users.id);


      

        return NextResponse.json(allUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}