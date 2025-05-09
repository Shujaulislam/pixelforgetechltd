import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getUserTasks,
  toggleTaskStatus,
  updateTask,
} from '../controllers/task.controller';
import { authenticateUser } from '../middleware';

const router = Router();

// All routes require authentication
router.use(authenticateUser);

// Task CRUD operations
router.post('/', createTask);
router.get('/', getUserTasks);

// Task-specific operations
router.patch('/:id', updateTask);
router.patch('/:id/toggle', toggleTaskStatus);
router.delete('/:id', deleteTask);

export default router;