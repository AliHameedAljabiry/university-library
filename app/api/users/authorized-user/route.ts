import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth()
    const userId = session?.user?.id;
    if (!userId) {
        // Handle unauthorized or missing user id
        return new Response("Unauthorized", { status: 401 });
    }
    const authorizedUser = await db
        .select({
            id: users.id,
            email: users.email,
            fullName: users.fullName,
            universityId: users.universityId,
            universityCard: users.universityCard,
            role: users.role,
            createdAt: users.createdAt,
            status: users.status
        })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1)

    return NextResponse.json(authorizedUser[0])
}



