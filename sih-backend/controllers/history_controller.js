// Get Historical Bandwidth Usage
const pool = require('../config/database');
exports.getTrafficHistory = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT DATE_TRUNC('hour', start_time) AS hour, SUM(bytes_count) AS total_bytes
        FROM netflow_data
        WHERE start_time >= NOW() - INTERVAL '7 DAYS'
        GROUP BY hour
        ORDER BY hour;
      `);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get Device Uptime History
  exports.getUptimeHistory = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT device_id, hostname, COUNT(*) AS total_uptime_records,
               SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) AS uptime_count,
               (SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS uptime_percentage
        FROM devices
        GROUP BY device_id, hostname;
      `);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  