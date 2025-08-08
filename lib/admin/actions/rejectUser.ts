'use server';

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";


export const rejectUser = async (id: string) => {
    try {
       
        if (!id) {
            return {
                success: false,
                message: "User ID is required for update", 
            };
        }
        const rejectedUser = await db
            .update(users)
            .set({ status: 'REJECTED' }) 
            .where(eq(users.id, id))
            .returning(); 

        return {
            success: true,
            data: JSON.parse(JSON.stringify(rejectedUser)),
        };
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while updating the user", 
        };
    }
}