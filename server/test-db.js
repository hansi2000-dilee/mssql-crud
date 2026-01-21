const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

console.log('Testing connection with config:');
console.log(`Server: ${config.server}`);
console.log(`User: ${config.user}`);
console.log(`Database: ${config.database}`);

(async () => {
    try {
        await sql.connect(config);
        console.log('✅ SUCCESS: Connected to SQL Server!');
        process.exit(0);
    } catch (err) {
        console.error('❌ ERROR: Connection failed.');
        console.error(err.message);
        if (err.code === 'ESOCKET') {
            console.log('\n💡 TIP: "ESOCKET" usually means TCP/IP is disabled in SQL Server Configuration Manager.');
        }
        process.exit(1);
    }
})();
