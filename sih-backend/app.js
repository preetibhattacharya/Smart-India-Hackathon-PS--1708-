const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import Routers
const dashboardRoutes = require('./routers/dashboard_routes');
const topologyRoutes = require('./routers/topology_routes');
const trafficRoutes = require('./routers/traffic_routes');
const deviceRoutes = require('./routers/device_routes');
const alertsRoutes = require('./routers/alerts_routes');
const historyRoutes = require('./routers/history_routes');
const securityRoutes = require('./routers/security_routes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/dashboard', dashboardRoutes); // Dashboard APIs
app.use('/api/topology', topologyRoutes);   // Topology APIs
app.use('/api/traffic', trafficRoutes);     // Traffic Analysis APIs
app.use('/api/device', deviceRoutes);       // Device Monitoring APIs
app.use('/api/alerts', alertsRoutes);       // Alerts & Notifications APIs
app.use('/api/history', historyRoutes);     // Historical Data APIs
app.use('/api/security', securityRoutes);   // Security Insights APIs

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Network API is running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
