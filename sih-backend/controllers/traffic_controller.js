const pool = require('../config/database');

//protocol percentage
exports.getProtocolStatistics = async (req, res) => {
  try {
    // SQL query to get protocol statistics with their count and percentage
    const query = `
      SELECT 
        protocol,
        COUNT(*) AS protocol_count,
        (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM netflow_data)) AS protocol_percentage
      FROM netflow_data
      GROUP BY protocol
      ORDER BY protocol_percentage DESC;
    `;
    
    // Execute the query
    const result = await pool.query(query);
    
    // Send back the result as a JSON response
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching protocol statistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Top Talkers((users)
exports.getTopUsers = async (req, res) => {
  try {
      // Default limit to 10 if not specified
      const limit = parseInt(req.query.limit) || 10;

      // SQL query to fetch top users sorted by bandwidth usage
      const result = await pool.query(`SELECT 
    da.username, 
    MAX(dt.bandwidth) AS max_bandwidth,
    FROM 
    device_auth da
    JOIN 
    device_traffic dt ON da.last_updated = dt.last_updated
    GROUP BY 
    da.username
    ORDER BY 
    max_bandwidth DESC;`);

      // Sending the result to the frontend as JSON
      res.json({
          total_users: result.rows.length,
          top_users: result.rows
      });
  } catch (error) {
      console.error('Error in getTopUsers:', error);
      res.status(500).json({ 
          error: 'Internal Server Error', 
          message: error.message 
      });
  }
};

//
// Get Bandwidth Utilization
exports.getBandwidthUtilization = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.source_device_id, c.target_device_id, 
             SUM(n.bytes_count) AS total_bytes,
             SUM(n.bytes_count / EXTRACT(EPOCH FROM (n.end_time - n.start_time))) AS bandwidth_usage
      FROM connections c
      JOIN netflow_data n ON c.source_device_id = n.device_id
      WHERE n.start_time >= NOW() - INTERVAL '30 MINUTES'
      GROUP BY c.source_device_id, c.target_device_id;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching bandwidth utilization:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Protocol Breakdown
exports.getProtocolBreakdown = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT protocol, COUNT(*) AS count, SUM(bytes_count) AS total_bytes
      FROM netflow_data
      GROUP BY protocol
      ORDER BY total_bytes DESC;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching protocol breakdown:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
