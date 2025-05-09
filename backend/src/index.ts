import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import createApp from './app';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

// Initialize database connection and start server
const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Connected to database successfully');

    const app = createApp();
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`🚀 Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
    });

    // Graceful shutdown handling
    const handleShutdown = async () => {
      console.log('🛑 Received shutdown signal');

      server.close(async () => {
        console.log('⏹️ HTTP server closed');
        
        try {
          await prisma.$disconnect();
          console.log('📫 Database connection closed');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error during shutdown:', error);
          process.exit(1);
        }
      });

      // Force shutdown after 5 seconds
      setTimeout(() => {
        console.error('⚠️ Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 5000);
    };

    // Handle various shutdown signals
    process.on('SIGTERM', handleShutdown);
    process.on('SIGINT', handleShutdown);
    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      handleShutdown();
    });
    process.on('unhandledRejection', (reason) => {
      console.error('❌ Unhandled Rejection:', reason);
      handleShutdown();
    });

  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

startServer();