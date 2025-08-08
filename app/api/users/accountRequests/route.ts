import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { error } from "console";
import { eq, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET()  {
    const session = await auth();
    if (session?.user.role !== 'ADMIN') {
        return NextResponse.json(
            { error: 'Unauthorized'},
            {status: 401}
        );
    }
    const pendingUsers = await db
        .select({
            id: users.id,
            status: users.status,
            email: users.email,
            fullName: users.fullName,
            universityId: users.universityId,
            universityCard: users.universityCard,
            createdAt: users.createdAt
        })
        .from(users)
        .where(or(eq(users.status, 'PENDING'), eq(users.status, 'REJECTED')))
    return NextResponse.json(pendingUsers)
}