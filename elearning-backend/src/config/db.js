import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

export async function query(queryString, params = []) {
    await poolConnect;
    const request = pool.request();
    params.forEach((p, index) => {
        request.input(`param${index}`, p);
    });
    return request.query(queryString);
}

console.log("SQL Server Connected");
