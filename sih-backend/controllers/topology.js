// Get All Devices
const pool = require('../config/database');

// Fetch topology connection data (id, status, protocol, last_verified) from the database
exports.getTopology = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT source_device_id, status, protocol, last_verified
      FROM connections
      ORDER BY last_verified DESC;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// to get total,active and down devices
exports.getDevices = async (req, res) => {
    try {
      const result = await pool.query(`SELECT COUNT(*) AS total_devices,
    COUNT(CASE WHEN status = 'ACTIVE' THEN 1 END) AS active_devices,
    COUNT(CASE WHEN status = 'DOWN' THEN 1 END) AS down_devices
    FROM devices`);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get All Connections.
  .0120
  
exports.getConnections = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT c.source_device_id, c.target_device_id, d1.hostname AS source_hostname, 
               d2.hostname AS target_hostname, c.protocol, c.status
        FROM connections c
        JOIN devices d1 ON c.source_device_id = d1.device_id
        JOIN devices d2 ON c.target_device_id = d2.device_id;
      `);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get Device by ID
  exports.getDeviceById = async (req, res) => {
    try {
      const { device_id } = req.params;
      const result = await pool.query(`
        SELECT * FROM devices WHERE device_id = $1;
      `, [device_id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  