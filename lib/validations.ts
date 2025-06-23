import { z } from 'zod';

export const singUpSchema = z.object({
    fullName: z.string().min(3, 'Full name is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    universityId: z.coerce.number(),
    universityCard: z.string().min(1, 'University card is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const signInSchema = z.object({
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});