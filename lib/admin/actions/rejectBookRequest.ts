'use server';

import { db } from "@/database/drizzle";
import { borrowRequests } from "@/database/schema";
import { eq } from "drizzle-orm";


export const rejectBookRequest = async (requestId: string) => {
    try {
        if (!requestId) {
            return {
                success: false,
                message: "Request ID is required for reject",
            };
        }
        const rejectRequest = await db
            .update(borrowRequests)
            .set({status: 'REJECTED'})
            .where(eq(borrowRequests.id, requestId))
            .returning(); 

        return {
            success: true,
            data: JSON.parse(JSON.stringify(rejectRequest)),
        };
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while rejecting the book request",
        };
    }
}