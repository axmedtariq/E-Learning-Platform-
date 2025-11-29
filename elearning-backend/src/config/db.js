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
        encrypt: false, // for local dev, set true if using Azure
        trustServerCertificate: true
    }
};

// Create a connection pool and export a query function
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("✅ SQL Server Connected to database:", config.database);
        return pool;
    })
    .catch(err => {
        console.error("❌ Database connection failed: ", err);
        process.exit(1);
    });

// Generic query function using async/await
const query = async (queryString, params = []) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        // Add input parameters dynamically
        params.forEach((param, index) => {
            request.input(`param${index}`, param);
        });
        const result = await request.query(queryString);
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = { query };
