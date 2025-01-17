import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const createRoomSchema = z.object({
  slug: z.string(),
});
