import express from 'express';
import cors from 'cors';
import auditRoutes from './routes/auditRoutes.js';

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register API routes
app.use('/api', auditRoutes);

// Basic API health status route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Page Pulse API is healthy and operational',
    timestamp: new Date().toISOString(),
  });
});

// Catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `API endpoint not found: ${req.originalUrl}`,
  });
});

// Global central error handler middleware
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err);
  
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;
