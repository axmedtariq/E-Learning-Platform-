const sql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();

// SQL Server configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // keep secret, do not log
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10), // make sure port is a number
  options: {
    encrypt: false,
    trustServerCertificate: process.env.DB_TRUST_CERT === "true",
  },
};

// Create connection pool
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect()
  .then(() => {
    console.log(`✅ SQL Server Connected to database "${process.env.DB_DATABASE}" on server "${process.env.DB_SERVER}"`);
  })
  .catch(err => {
    console.error("❌ SQL Connection Error:", err.message);
  });

// Function to execute queries
const query = async (queryString, params = []) => {
  await poolConnect;
  const request = pool.request();
  params.forEach((p, index) => {
    request.input(`param${index}`, p);
  });
  return request.query(queryString);
};

module.exports = { query, pool };
