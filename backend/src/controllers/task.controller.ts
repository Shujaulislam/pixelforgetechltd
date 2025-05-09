import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
import expressAsyncHandler from 'express-async-handler';

const prisma = new PrismaClient();

interface CreateTaskInput {
  title: string;
  description?: string;
}

interface UpdateTaskInput {
  title?: string;
  description?: string;
}

interface AuthenticatedRequest extends Request {
  user?: { userId: string; email: string };
}

// Create a new task
export const createTask = expressAsyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const input: CreateTaskInput = req.body;
  
  if (!input.title) {
     res.status(400).json({ success: false, message: 'Title is required' });
  }

  const task = await prisma.task.create({
    data: {
      ...input,
      userId: req.user!.userId,
    },
  });

   res.status(201).json({
    success: true,
    data: task,
    message: 'Task created successfully'
  });
});

// Get all tasks for current user
export const getUserTasks = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.user!.userId },
    orderBy: { createdAt: 'desc' },
  });

   res.status(200).json({
    success: true,
    data: tasks,
    message: 'Tasks retrieved successfully'
  });
});

// Update a task
export const updateTask = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const input: UpdateTaskInput = req.body;

  const existingTask = await prisma.task.findUnique({ where: { id } });
  if (!existingTask) {
     res.status(404).json({ success: false, message: 'Task not found' });
     return;
  }

  if (existingTask.userId !== req.user!.userId) {
     res.status(403).json({ success: false, message: 'You do not have permission to access this task' });
     return;
  }

  const task = await prisma.task.update({
    where: { id },
    data: input,
  });

   res.status(200).json({
    success: true,
    data: task,
    message: 'Task updated successfully'
  });
});

// Toggle task completion status
export const toggleTaskStatus = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const existingTask = await prisma.task.findUnique({ where: { id } });
  if (!existingTask) {
     res.status(404).json({ success: false, message: 'Task not found' });
     return;
  }

  if (existingTask.userId !== req.user!.userId) {
     res.status(403).json({ success: false, message: 'You do not have permission to access this task' });
     return;
  }

  const task = await prisma.task.update({
    where: { id },
    data: { completed: !existingTask?.completed },
  });

   res.status(200).json({
    success: true,
    data: task,
    message: 'Task status toggled successfully'
  });
});

// Delete a task
export const deleteTask = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const existingTask = await prisma.task.findUnique({ where: { id } });
  if (!existingTask) {
     res.status(404).json({ success: false, message: 'Task not found' });
     return;
  }

  if (existingTask.userId !== req.user!.userId) {
     res.status(403).json({ success: false, message: 'You do not have permission to access this task' });
     return;
  }

  await prisma.task.delete({ where: { id } });

   res.status(200).json({
    success: true,
    data: null,
    message: 'Task deleted successfully'
  });
});