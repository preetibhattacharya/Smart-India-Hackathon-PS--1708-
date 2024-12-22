// Get Unauthorized Devices
const pool = require('../config/database');
exports.getUnauthorizedDevices = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT event_id, device_id, description, timestamp
        FROM security_events
        WHERE event_type = 'UNAUTHORIZED_DEVICE'
        ORDER BY timestamp DESC;
      `);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get EIGRP Authentication Failures
  exports.getEIGRPFailures = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT event_id, device_id, description, timestamp
        FROM security_events
        WHERE event_type = 'EIGRP_AUTH_FAILURE'
        ORDER BY timestamp DESC;
      `);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get SNMP Authentication Failures
  exports.getSNMPFailures = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT event_id, device_id, description, timestamp
        FROM security_events
        WHERE event_type = 'SNMP_AUTH_FAILURE'
        ORDER BY timestamp DESC;
      `);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  