import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
import { comparePassword, generateToken, hashPassword } from '../utils/auth';

const prisma = new PrismaClient();

interface SignupInput {
  email: string;
  password: string;
  name: string;
}

interface LoginInput {
  email: string;
  password: string;
}

// Handle user registration
export const handleSignup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const input: SignupInput = req.body;
  
  if (!input.email || !input.password || !input.name) {
    res.status(400).json({ success: false, message: 'Missing required fields' });
    return;
  }

  const existingUser = await prisma.user.findUnique({ where: { email: input.email } });
  if (existingUser) {
    res.status(409).json({ success: false, message: 'Email already registered' });
    return;
  }

  const hashedPassword = await hashPassword(input.password);
  const user = await prisma.user.create({
    data: {
      ...input,
      password: hashedPassword,
    },
  });

  const { password: _, ...userWithoutPassword } = user;
  const token = generateToken({ userId: user.id, email: user.email });

res.status(201).json({
    success: true,
    data: { user: userWithoutPassword, token },
    message: 'User registered successfully'
  });
});

// Handle user login
export const handleLogin = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const input: LoginInput = req.body;

  if (!input.email || !input.password) {
    res.status(400).json({ success: false, message: 'Missing required fields' });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
    return;
  }

  const isPasswordValid = await comparePassword(input.password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
    return;
  }

  const { password: _, ...userWithoutPassword } = user;
  const token = generateToken({ userId: user.id, email: user.email });

   res.status(200).json({
    success: true,
    data: { user: userWithoutPassword, token },
    message: 'Login successful'
  });
});

// Get current user profile
export const getCurrentUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
   res.status(200).json({
    success: true,
    data: { user: (req as any).user },
    message: 'User profile retrieved'
  });
});