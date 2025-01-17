import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import { createUserSchema, loginSchema } from "@repo/common/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedData = createUserSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        status: false,
        message: "Incorrect inputs",
        errors: parsedData.error.errors,
      });
      return;
    }

    const { name, email, password } = parsedData.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        avatar: req.body.avatar,
      },
    });

    if (newUser.id) {
      res.status(201).json({
        status: true,
        message: "user signed up successfully",
        data: newUser,
      });
      return;
    }
    res.status(403).json({
      status: false,
      message: "user signed up failed",
      data: {},
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      error: error,
    });
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedData = loginSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        status: false,
        message: "Incorrect inputs",
        errors: parsedData.error.errors,
      });
      return;
    }

    const { email, password } = parsedData.data;

    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(400).json({
        status: false,
        message: `Wrong email or password`,
      });
      return;
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      res.status(400).json({
        status: false,
        message: `Wrong email or password`,
      });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "secret"
    );

    res.status(200).json({
      status: true,
      message: "signed in successfully",
      data: {
        user,
        token,
      },
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
    return;
  }
};
