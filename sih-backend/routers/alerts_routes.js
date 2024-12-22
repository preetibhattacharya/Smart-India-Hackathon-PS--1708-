const express = require('express');
const { getRecentAlerts, getCriticalAlerts ,getSecurityEvents} = require('../controllers/alerts_controller');
const router = express.Router();
router.get("/security-events", getSecurityEvents);
router.get('/', getRecentAlerts);
router.get('/critical', getCriticalAlerts);

module.exports = router;
