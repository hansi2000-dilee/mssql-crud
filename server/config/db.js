const sql = require('mssql');
require('dotenv').config();

const config = {
    user: "hansimssql", // Hardcoded as requested
    password: "MyStrongPassword123", // Hardcoded as requested
    server: "DESKTOP-MBK9PSQ",
    database: "InventoryDB",
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log('Connected to MSSQL!');
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
};

module.exports = { connectDB, sql };
