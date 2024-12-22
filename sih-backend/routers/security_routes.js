const express = require('express');
const { getUnauthorizedDevices, getEIGRPFailures, getSNMPFailures } = require('../controllers/security_controller');
const router = express.Router();

router.get('/unauthorized-devices', getUnauthorizedDevices);
router.get('/eigrp-failures', getEIGRPFailures);
router.get('/snmp-failures', getSNMPFailures);

module.exports = router;
