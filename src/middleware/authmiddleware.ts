import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Auth from "../models/authModel.js";
import type { IUser } from "../types/types.js";

interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // Check for authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];
  
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { id: string };
    
      // Find user in the database and exclude password
      const user = await Auth.findOne({ id: decoded.id })
      if (!user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      req.user = user;
      //6794e660659a4f305aa8125e
      // Proceed to the next middleware
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};
