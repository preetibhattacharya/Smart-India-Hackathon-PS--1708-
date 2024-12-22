const express = require('express');
const { getDeviceDetails, getDeviceOverview,getEIGRPNeighbors,getTrafficPattern ,getSNMPData} = require('../controllers/device_controller');
const router = express.Router();

router.get('/alldevices', getDeviceDetails);
router.get('/overview', getDeviceOverview);
router.get('/EIGRP',getEIGRPNeighbors );
router.get('/Traffic',getTrafficPattern);
router.get('/SNMP',getSNMPData);




module.exports = router;
