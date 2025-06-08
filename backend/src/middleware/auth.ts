import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: jwt.JwtPayload & { id: string };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "SECRET") as jwt.JwtPayload & { id: string };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
    return;
  }
};
