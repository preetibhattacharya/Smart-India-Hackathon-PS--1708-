const express = require('express');
const { getTrafficHistory, getUptimeHistory } = require('../controllers/history_controller');
const router = express.Router();

router.get('/traffic', getTrafficHistory);
router.get('/uptime', getUptimeHistory);

module.exports = router;
