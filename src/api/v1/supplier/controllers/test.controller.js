/**
 * @description Create function
 * @param {object} req Request Object
 * @param {object} res Response Object
 * @param {object} next next step
 */
exports.create = async (req, res, next) => {
	try {
		res.status(200);
		res.send(req.body);
	} catch (error) {
		return next(error);
	}
};

/**
 * @description Update function
 * @param {object} req Request Object
 * @param {object} res Response Object
 * @param {object} next next step
 */
exports.update = async (req, res, next) => {
	try {
		req.body.banner = req.file.location;
		res.status(200);
		res.send(req.body);
	} catch (error) {
		return next(error);
	}
};
/**
 * @description Remove function
 * @param {object} req Request Object
 * @param {object} res Response Object
 * @param {object} next next step
 */
exports.remove = async (req, res, next) => {
	try {
		res.status(200);
		res.send(req.body);
	} catch (error) {
		return next(error);
	}
};
