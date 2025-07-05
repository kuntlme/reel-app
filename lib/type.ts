import { z } from "zod"
export const createUserSchema = z.object({
    email: z.string().email(),
    profilename: z.string(),
    username: z.string(),
    password: z.string(),
    joining_date: z.coerce.date(),
    location: z.string(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>;


export const updateUserSchema = z.object({
    profilename: z.string().optional(),
    username: z.string().optional(),
    joining_date: z.coerce.date().optional(),
    location: z.string().optional()
})


export type updateUserInput = z.infer<typeof updateUserSchema>;


export const createVideoSchema = z.object({
    description: z.string(),
    sharelink: z.string(),
    uploaded_at: z.coerce.date()
})

export type createVideoInput = z.infer<typeof createVideoSchema>


export const createInteractionSchema = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("comment"),
        comment_text: z.string(),
    }),
    z.object({
        type: z.literal("like"),
        comment_text: z.undefined()
    })
])

export type createInteractionInput = z.infer<typeof createInteractionSchema>