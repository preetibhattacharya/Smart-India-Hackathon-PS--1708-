const express = require('express');
const { getDashboardStats, getTrafficSummary } = require('../controllers/dashboard');
const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/traffic', getTrafficSummary);

module.exports = router;
