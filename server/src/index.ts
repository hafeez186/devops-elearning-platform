import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { app } from './app';
import { prisma } from './lib/prisma';
import { MonitoringService } from './services/MonitoringService';
import { setMonitoringService } from './controllers/monitoringController';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "https://devops-elearning-frontend.onrender.com",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Initialize monitoring service
const monitoringService = new MonitoringService();

// Database connection
const connectDB = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await prisma.$connect();
      console.log('✅ PostgreSQL connected successfully');
    } else {
      console.log('⚠️ Skipping database connection in test mode');
    }
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error);
    console.log('⚠️ Continuing without database for monitoring testing');
    // Don't exit in development mode to allow monitoring testing
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

// Start server
const startServer = async () => {
  try {
    await connectDB();
    
    // Setup Socket.IO monitoring
    setupMonitoring();
    
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
      console.log(`🌐 API available at: http://localhost:${PORT}/api`);
      console.log(`🔍 Monitoring dashboard available via Socket.IO`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Setup monitoring and Socket.IO
const setupMonitoring = () => {
  // Initialize monitoring service for API controller
  setMonitoringService(monitoringService);
  
  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);
    
    // Send current system info to new client
    monitoringService.getSystemInfo().then(info => {
      if (info) {
        socket.emit('system-info', info);
      }
    });
    
    // Send current metrics to new client
    const latestMetrics = monitoringService.getLatestMetrics(10);
    if (latestMetrics.length > 0) {
      socket.emit('metrics-history', latestMetrics);
    }
    
    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
    
    socket.on('get-current-metrics', async () => {
      try {
        const metrics = await monitoringService.getCurrentMetrics();
        socket.emit('current-metrics', metrics);
      } catch (error) {
        socket.emit('error', { message: 'Failed to get current metrics' });
      }
    });
    
    socket.on('get-metrics-history', () => {
      const history = monitoringService.getMetricsHistory();
      socket.emit('metrics-history', history);
    });
  });

  // Start monitoring service
  monitoringService.start(30000); // Collect metrics every 30 seconds

  // Broadcast metrics to all connected clients
  monitoringService.on('metrics', (metrics) => {
    io.emit('system-metrics', metrics);
  });

  // Broadcast alerts to all connected clients
  monitoringService.on('alerts', (alerts) => {
    io.emit('system-alerts', alerts);
    console.log('🚨 System alerts:', alerts);
  });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('👋 SIGTERM signal received: closing HTTP server');
  monitoringService.stop();
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('👋 SIGINT signal received: closing HTTP server');
  monitoringService.stop();
  await prisma.$disconnect();
  process.exit(0);
});

startServer();

export { app };
