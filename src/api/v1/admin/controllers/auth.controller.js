/**
 * @author Mohd Mohibuddin
 * @description this is a auth controller file has method to sync with micro-services to authenticate user
 */
const { handleSuccess, handleFailure } = require('../../../../utils/helpers');

/**
 * @description Login function
 * @param {object} req Request object
 * @param {object} res Response object
 */
exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const payLoad = {
			username,
			password,
		};
		handleSuccess(res, payLoad, 'login success');
	} catch (error) {
		if (error.status == 400) {
			handleFailure(res, error.status, error.data.message);
		} else {
			handleFailure(res, 500, error);
		}
	}
};

/**
 * @description Reset password function
 * @param {object} req Request object
 * @param {object} res Response object
 */
exports.resetPassword = async (req, res) => {
	try {
		const { newPassword, confirmPassword } = req.body;
		const payLoad = {
			newPassword,
			confirmPassword,
		};
		handleSuccess(res, payLoad, 'reset password');
	} catch (error) {
		if (error.status == 400) {
			handleFailure(res, error.status, error.data.message);
		} else {
			handleFailure(res, 500, error);
		}
	}
};
