import { createRoomSchema } from "@repo/common/schema";
import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export const createRoom = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.user?.id;
    if (!adminId) {
      res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
      return;
    }

    const parsedData = createRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        status: false,
        message: "Invalid Inputd",
      });
      return;
    }

    const { slug } = parsedData.data;

    const room = await prismaClient.room.create({
      data: {
        slug,
        adminId: adminId,
      },
    });

    res.status(201).json({
      message: "Room created",
      status: true,
      data: room.id,
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
