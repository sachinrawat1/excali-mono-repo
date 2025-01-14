import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import { createUserSchema } from "@repo/common/schema";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedData = createUserSchema.safeParse(req.body);
    if (!parsedData) {
      res.status(400).json({
        status: false,
        message: "Incorrect inputs",
      });
    }
    // const new_user = prismaClient.user.create({
    //   data: {
    //     name: parsedData.data?.name,
    //     email: parsedData.data?.email,
    //     password: parsedData.data?.password,
    //   },
    // });
  } catch (error) {}
};
