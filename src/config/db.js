const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'postgres',
	database: 'postgres',
	password: 'root',
	port: 5432,
	host: 'localhost',
});

pool.connect();
pool.on('connect', () => {
	console.log('Database connected...');
});

module.exports = pool;
