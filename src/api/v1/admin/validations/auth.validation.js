/**
 * @author Mohd Mohibuddin
 * @description this file has method to validate payload for user auth request
 */
const Joi = require('joi');
const { authMsg } = require('../../../../utils/errorMessages');
const { handleFailure } = require('../../../../utils/helpers');
// eslint-disable-next-line no-useless-escape
const passRegexp =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,16}$/;

const login = Joi.object().keys({
	username: Joi.string().email().required().error(new Error(authMsg.email)),
	password: Joi.string()
		.required()
		.min(8)
		.max(16)
		.regex(passRegexp)
		.error(new Error(authMsg.password)),
});

const resetpass = Joi.object().keys({
	newPassword: Joi.string()
		.required()
		.regex(passRegexp)
		.error(new Error(authMsg.password)),
	confirmPassword: Joi.string()
		.required()
		.valid(Joi.ref('newPassword'))
		.error(new Error(authMsg.confirmPassword)),
});
/**
 * @description Login function
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {*} next Next action
 */
module.exports.login = async (req, res, next) => {
	try {
		const result = Joi.validate(req.body, login);
		if (result.error) throw result.error;
		next();
	} catch (error) {
		handleFailure(res, 400, error.message);
	}
};

/**
 * @description Reset password function
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {*} next Next action
 */
module.exports.resetpass = async (req, res, next) => {
	try {
		const result = Joi.validate(req.body, resetpass);
		if (result.error) throw result.error;
		next();
	} catch (error) {
		handleFailure(res, 400, error.message);
	}
};
