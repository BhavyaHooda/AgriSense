const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files with cache control
app.use(express.static(__dirname, {
  maxAge: '1h',
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html');
    }
  }
}));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for checking server status
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', message: 'AgriSense Pro server is running properly' });
});

// API endpoint for simulated sensor data
app.get('/api/sensors', (req, res) => {
  // Sample data that could be replaced with real sensor readings
  const sensorData = {
    sensors: [
      { id: 'Sensor 1', temp: 72, humid: 65, light: 14, ph: 7.5, battery: 95, status: 'Active' },
      { id: 'Sensor 2', temp: 71, humid: 64, light: 13.8, ph: 7.4, battery: 88, status: 'Active' },
      { id: 'Sensor 3', temp: 73, humid: 66, light: 14.2, ph: 7.6, battery: 92, status: 'Active' },
      { id: 'Sensor 4', temp: 70, humid: 63, light: 13.5, ph: 7.3, battery: 90, status: 'Active' }
    ],
    timestamp: new Date().toISOString()
  };
  res.json(sensorData);
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <title>Page Not Found</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          h1 { color: #4caf50; }
          a { color: #4caf50; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/">Return to AgriSense Pro Dashboard</a>
      </body>
    </html>
  `);
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`
    <html>
      <head>
        <title>Server Error</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          h1 { color: #c62828; }
          a { color: #4caf50; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>500 - Server Error</h1>
        <p>Something went wrong. Please try again later.</p>
        <a href="/">Return to AgriSense Pro Dashboard</a>
      </body>
    </html>
  `);
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=== AgriSense Pro Server ===`);
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Access your app at: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
  console.log(`✅ Farm monitoring interface initialized successfully`);
  console.log(`=== Ready for connections ===`);

  // Log system information
  console.log(`Memory usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`);
  console.log(`Node.js version: ${process.version}`);
  console.log(`Platform: ${process.platform}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️ Port ${PORT} is already in use. The application might already be running.`);
    console.log(`ℹ️ Try stopping any running instances first or use a different port.`);
  } else {
    console.error('Failed to start server:', err);
  }
});

// Enable proper error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Server-side code only