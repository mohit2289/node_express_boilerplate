/**
 * @author Mohd Mohibuddin
 * @description this file has to configure all routes, setup PORT and start listner.
 */
const config = require('../config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('../middlewares/error-handler');
const helmet = require('helmet');

const adminRouterV1 = require('../api/v1/admin/routes');
const supplierRouterV1 = require('../api/v1/supplier/routes');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
const corsConfig = {
	credentials: true,
	origin: true,
};
app.use(cors(corsConfig));

app.use(helmet());

// passport
app.use('/health', (req, res) => {
	res.status(200).send('OK');
});
app.use('/api/v1/admin', adminRouterV1);
app.use('/api/v1/supplier', supplierRouterV1);

app.use(errorHandler.handleNotFound);
app.use(errorHandler.handleError);
/**
 * @description Server start
 */
exports.start = () => {
	app.listen(config.port, (err) => {
		if (err) {
			// eslint-disable-next-line
			console.log(`Error : ${err}`);
			// eslint-disable-next-line
			process.exit(-1);
		}
		// eslint-disable-next-line
		console.log(
			// eslint-disable-next-line
			`${config.app} is running on ${config.port} env: ${process.env.NODE_ENV}`
		);
	});
};

exports.app = app;
