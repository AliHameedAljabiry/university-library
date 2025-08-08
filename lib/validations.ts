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

export const bookSchema = z.object({
    title: z.string().trim().min(2).max(100),
    description: z.string().trim().min(10).max(1000),
    author: z.string().trim().min(2).max(100),
    genre: z.string().trim().min(2).max(100),
    rating: z.coerce.number().min(1).max(5),
    totalCopies: z.coerce.number().int().positive().lte(1000),
    coverUrl: z.string().nonempty(),
    coverColor: z.string().trim().regex(/^#[0-9A-F]{6}$/i),
    videoUrl: z.string().optional().or(z.literal('')),
    summary: z.string().trim().min(10)
})