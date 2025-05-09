import { Request, Response, NextFunction } from 'express';
import { extractTokenFromHeader, verifyToken } from '../utils/auth';

// Middleware to authenticate requests using JWT
export const authenticateUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    _res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

// Simple error handling middleware
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err);
  return res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}