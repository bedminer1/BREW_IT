import { z } from 'zod';

export const messageSchema = z.object({
    userMessage: z.string()
})