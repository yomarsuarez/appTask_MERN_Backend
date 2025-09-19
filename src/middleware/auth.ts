import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;
  const bearer = req.headers.authorization;
  if (bearer && bearer.startsWith("Bearer ")) {
    [, token] = bearer.split(" ");
  }

  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    // 4. Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // 5. Busca el usuario en la base de datos
    const user = await User.findById((decoded as any).id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 6. Adjunta el usuario a la request y continúa
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
