const express = require('express');
const { getTopUsers, getBandwidthUtilization, getProtocolBreakdown,getProtocolStatistics } = require('../controllers/traffic_controller');
const router = express.Router();

// Define the route to fetch protocol statistics
router.get("/protocol-statistics", getProtocolStatistics);

// Get top talkers
router.get('/top-talkers', getTopUsers);

// Get bandwidth utilization
router.get('/utilization', getBandwidthUtilization);

// Get protocol usage breakdown
router.get('/protocol-breakdown', getProtocolBreakdown);

module.exports = router;
