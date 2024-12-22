const express = require('express');
const { getDevices, getConnections, getDeviceById,getTopology } = require('../controllers/topology');
const router = express.Router();
router.get('/getTopology', getTopology);

// Get all devices for topology
router.get('/devices', getDevices);

// Get all connections for topology
router.get('/connections', getConnections);

// Get details of a specific device by ID
router.get('/device/:device_id', getDeviceById);

module.exports = router;
