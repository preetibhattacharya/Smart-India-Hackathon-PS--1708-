const pool = require('../config/database');

// device controller
exports.getDeviceDetails = async (req, res) => {
  try {
    // Query to fetch all the required device details
    const result = await pool.query(`
      SELECT 
        d.ip_address,
        CASE 
          WHEN d.layer = 'CORE' THEN 'Core Router'
          WHEN d.layer = 'DISTRIBUTION' THEN 'Distribution Switch'
          WHEN d.layer = 'ACCESS' THEN 'Access Switch'
        END AS role,
        d.hostname AS device_name,
        string_agg(i.mac_address::text, ', ') AS mac_address,
        d.status,
        s_cpu.metric_value AS cpu_usage,
        NOW() - d.last_seen AS uptime,
        string_agg(i.interface_name, ', ') AS ports,
        string_agg(c.protocol, ', ') AS protocols,
        SUM(CASE 
                WHEN snmp.metric_type = 'Traffic In' THEN snmp.metric_value 
                WHEN snmp.metric_type = 'Traffic Out' THEN snmp.metric_value 
                ELSE 0 
            END) AS bandwidth_usage
      FROM devices d
      LEFT JOIN interfaces i ON d.device_id = i.device_id
      LEFT JOIN snmp_data s_cpu ON d.device_id = s_cpu.device_id AND s_cpu.metric_type = 'CPU Usage'
      LEFT JOIN snmp_data snmp ON d.device_id = snmp.device_id AND (snmp.metric_type = 'Traffic In' OR snmp.metric_type = 'Traffic Out')
      LEFT JOIN connections c ON d.device_id = c.source_device_id
      GROUP BY 
        d.device_id, d.hostname, d.ip_address, d.layer, d.status, s_cpu.metric_value, d.last_seen;
    `);

    // Check if data exists
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No devices found' });
    }

    // Send the result as a response
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Interface Stats
/*exports.getInterfaceStats = async (req, res) => {
  try {
    const { device_id, interface_id } = req.params;
    const result = await pool.query(`
      SELECT metric_type, metric_value, timestamp
      FROM snmp_data
      WHERE device_id = $1 AND interface_id = $2
      ORDER BY timestamp DESC
      LIMIT 10;
    `, [device_id, interface_id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};*/

exports.getDeviceOverview = async (req, res) => {
  try {
      // SQL query to fetch the connections with the EIGRP protocol
      const result = await pool.query(`
          SELECT 
    d.hostname AS device_name,
    i.interface_name,
    i.ip_address AS interface_ip,
    i.mac_address,
    i.status
    FROM devices d
    JOIN interfaces i ON d.device_id = i.device_id;`);

      // Sending the result to the frontend as JSON
      res.json(result.rows);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

//EIGRP Neighbours
exports.getEIGRPNeighbors = async (req, res) => {
  try {
      // SQL query to fetch the connections with the EIGRP protocol
      const result = await pool.query(`SELECT DISTINCT source_device_id, target_device_id
  FROM connections
  WHERE protocol = 'EIGRP';`);

      // Sending the result to the frontend as JSON
      res.json(result.rows);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

//DEVICE TRAFFIC
exports.getTrafficPattern = async (req, res) => {
  try {
      // SQL query to fetch the connections with the EIGRP protocol
      const result = await pool.query(`SELECT *
      FROM device_traffic;`);

      // Sending the result to the frontend as JSON
      res.json(result.rows);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

//SNMP Data
exports.getSNMPData = async (req, res) => {
  try {
      // SQL query to fetch the connections with the EIGRP protocol
      const result = await pool.query(`SELECT * FROM snmp_data;`);

      // Sending the result to the frontend as JSON
      res.json(result.rows);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};