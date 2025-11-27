const sql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();

// ---------------- SQL Server Configuration ----------------
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: process.env.DB_TRUST_CERT === "true",
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect
  .then(() => console.log(`✅ SQL Server Connected to database "${config.database}" on server "${config.server}"`))
  .catch(err => console.error("❌ SQL Connection Error:", err));

// ---------------- QUERY FUNCTION ----------------
const query = async (queryString, params = []) => {
  await poolConnect;
  const request = pool.request();
  params.forEach((p, index) => {
    request.input(`param${index}`, p);
  });
  return request.query(queryString);
};

// Export the query function directly
module.exports = { query };
