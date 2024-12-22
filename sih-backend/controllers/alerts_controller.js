// Get Recent Alerts
const pool = require('../config/database');
 // Assuming you have a pool object to interact with your database

// Controller function to fetch security events
/*exports.getSecurityEvents = async (req, res) => {
  try {
    // SQL query to fetch the latest security events
    const query = `
      SELECT 
        se.severity,
        se.timestamp,
        se.event_type AS alert_type,
        d.hostname AS device,
        se.description
      FROM 
        security_events se
      JOIN 
        devices d ON se.device_id = d.device_id
      ORDER BY 
        se.timestamp DESC
      LIMIT 20;
    `;
    
    // Execute the query
    const result = await pool.query(query);
    
    // Send back the result as a JSON response
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching security events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};*/

exports.getRecentAlerts = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT  severity,  timestamp, event_type,device,description
        FROM security_events
        ORDER BY timestamp DESC
        LIMIT 3;
      `);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get Unresolved Critical Alerts
  exports.getCriticalAlerts = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT event_id, device_id, event_type, severity, description, timestamp
        FROM security_events
        WHERE resolved = FALSE AND severity = 'CRITICAL'
        ORDER BY timestamp DESC;
      `);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  