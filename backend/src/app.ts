import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';

// Initialize express application
const createApp = () => {
  const app = express();

  // Configure middleware
  app.use(express.json());
  app.use(cors());

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/tasks', taskRoutes);

  // Global error handler
  app.use(errorHandler);

  return app;
};

export default createApp;