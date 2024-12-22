const pool = require('../config/database');

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT COUNT(*) AS total_devices,
             SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) AS online_devices,
             SUM(CASE WHEN status = 'INACTIVE' THEN 1 ELSE 0 END) AS offline_devices
      FROM devices;
    `);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Traffic Summary
exports.getTrafficSummary = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT SUM(bytes_count) AS total_data,
             MAX(bytes_count / EXTRACT(EPOCH FROM (end_time - start_time))) AS peak_bandwidth
      FROM netflow_data
      WHERE start_time >= NOW() - INTERVAL '24 HOURS';
    `);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
