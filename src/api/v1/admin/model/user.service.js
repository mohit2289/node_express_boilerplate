const pool = require('../../../../config/db');

class User {
	static async getUserData() {
		const data = await pool.query('select * from public.user');
		return data.rows;
	}
}

module.exports = User;
