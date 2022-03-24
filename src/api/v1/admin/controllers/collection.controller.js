/**
 * @author Mohd Mohibuddin
 * @description this is a collection controller file has method to sync with micro-services to perform crud operation
 */
const {
	handleSuccess,
	handleFailure,
	deleteS3Object,
	clean,
} = require('../../../../utils/helpers');
const { microServices } = require('../../../../utils/syncMicroServices');
const config = require('../../../../config');
/**
 * @description Collection create function
 * @param {object} req Request Object
 * @param {object} res Response Object
 */
exports.create = async (req, res) => {
	try {
		const {
			name,
			homepageBannerImage,
			categoryPageBannerImage,
			description,
			status,
		} = req.body;
		const payLoad = {
			name,
			homepageBannerImage,
			categoryPageBannerImage,
			description,
			level: 'L1',
			createdByUsername: req.userName,
			status: status ? 'ACTIVE' : 'INACTIVE',
		};
		const result = await microServices.post(config.micro.categoryUrl, payLoad);
		handleSuccess(res, {}, result.data.message);
	} catch (error) {
		if (Object.entries(req.files).length > 0) {
			await deleteS3Object(
				Object.values(req.files).map((v) => {
					return { Key: v[0].key };
				})
			);
		}
		if (error.status == 400) {
			handleFailure(res, error.status, error.data.message);
		} else {
			handleFailure(res, 500, error);
		}
	}
};

/**
 * @description Collection update function
 * @param {object} req Request Object
 * @param {object} res Response Object
 */
exports.update = async (req, res) => {
	try {
		const {
			id,
			homepageBannerImage,
			categoryPageBannerImage,
			description,
			status,
		} = req.body;
		const payLoad = {
			homepageBannerImage,
			categoryPageBannerImage,
			description,
			updatedByUsername: req.userName,
		};
		if (status != undefined) payLoad['status'] = status ? 'ACTIVE' : 'INACTIVE';
		const result = await microServices.put(
			config.micro.categoryUrl + '/' + id,
			clean(payLoad)
		);
		handleSuccess(res, {}, result.data.message);
	} catch (error) {
		if (Object.entries(req.files).length > 0) {
			await deleteS3Object(
				Object.values(req.files).map((v) => {
					return { Key: v[0].key };
				})
			);
		}
		if (error.status == 400) {
			handleFailure(res, error.status, error.data.message);
		} else {
			handleFailure(res, 500, error.data.message);
		}
	}
};
/**
 * @description Collection remove function
 * @param {object} req Request Object
 * @param {object} res Response Object
 */
exports.remove = async (req, res) => {
	try {
		handleSuccess(res, req.body);
	} catch (error) {
		handleFailure(res, 500, error);
	}
};
