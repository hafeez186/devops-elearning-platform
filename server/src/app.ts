import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';

// Import routes
import authRoutes from './routes/auth';
import courseRoutes from './routes/courses';
import userRoutes from './routes/users';
import progressRoutes from './routes/progress';
import labRoutes from './routes/labs';
import contentRoutes from './routes/content';
import monitoringRoutes from './routes/monitoring';
import aiRoutes from './routes/ai';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

const app = express();

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(limiter);
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/labs', labRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/monitoring', monitoringRoutes);
app.use('/api/ai', aiRoutes);

// API documentation endpoint
app.get('/api', (_req, res) => {
  res.json({
    message: 'DevOps E-Learning Platform API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      courses: '/api/courses',
      users: '/api/users',
      progress: '/api/progress',
      labs: '/api/labs',
      content: '/api/content',
      monitoring: '/api/monitoring',
      ai: '/api/ai',
    },
    docs: '/api/docs',
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export { app };
