'use server';

import { db } from "@/database/drizzle";
import {borrowRequests } from "@/database/schema";
import { eq } from "drizzle-orm";

export const deleteBookRequest =  async ({ requestId }: { requestId: string}) => {
    try {
        await db
            .delete(borrowRequests)
            .where(eq(borrowRequests.id, requestId))

    } catch (error) {
        console.log(error)
    }
}