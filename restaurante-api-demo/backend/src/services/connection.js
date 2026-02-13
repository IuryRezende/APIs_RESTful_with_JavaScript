const mysql = require("mysql2/promise");
require("dotenv").config({path: "../.env"});



console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD);
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    waitForConnections: true,
    ssl: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: true
    },
    connectionLimit: 10
});


module.exports = pool;