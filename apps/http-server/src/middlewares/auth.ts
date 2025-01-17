import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(403).json({
        status: false,
        message: "Authorization header missing or malformed",
      });
      return;
    }
    const token = authHeader.split(" ")[1] as string;
    const decodeToken = jwt.verify(token, "secret") as JwtPayload | string;
    (req as any).user = decodeToken;
    next();
  } catch (error) {
    res.status(403).json({
      status: false,
      message: "Unauthorized access",
    });
  }
}
