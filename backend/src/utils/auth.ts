import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

type TokenPayload = {
  userId: string;
  email: string;
};

// Hash password using bcrypt
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

// Compare password with hash
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
export const generateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET || 'your-default-secret';
  return jwt.sign(payload, Buffer.from(secret), {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

// Verify JWT token
export const verifyToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET || 'your-default-secret';
  try {
    return jwt.verify(token, Buffer.from(secret)) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Extract token from authorization header
export const extractTokenFromHeader = (authHeader?: string): string => {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('Invalid token format');
  }

  return token;
};