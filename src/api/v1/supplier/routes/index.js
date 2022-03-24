const express = require('express');
const router = express.Router();
const test = require('./test.route');

router.get('/health', async (req, res) => {
	res.send({ status: 'OK', data: [] });
});

// mount paths

router.use('/test', test);

module.exports = router;
