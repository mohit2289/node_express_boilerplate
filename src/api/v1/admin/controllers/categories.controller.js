/**
 * @author Mohd Mohibuddin
 * @description this is a categories controller file has method to sync with micro-services to  perform crud operation
 */
const { handleSuccess, handleFailure } = require('../../../../utils/helpers');
const conf = require('../../../../config');
const axios = require('axios');

/**
 * @description Get category data
 * @param {object} req Request Object
 * @param {object} res Response Object
 */
exports.getCategoriesData = async (req, res) => {
	const finalArr = {};
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'client-id': 'node-supplier-admin-service',
		},
	};
	const params = req.query.levels;
	if (typeof params != undefined && params != '') {
		const levelsArr = params.split(',');
		for (let i = 0; i < levelsArr.length; i++) {
			const levelname = levelsArr[i].toUpperCase();
			const option = {
				searchParams: {
					level: {
						comparativeRelation: 'eq',
						value: levelname,
					},
				},
			};
			const categoryData = await axios.post(
				conf.micro.categoryUrl + '/search',
				option,
				config
			);
			if (categoryData.data.data.length > 0) {
				finalArr[levelname] = categoryData.data.data;
			}
		}
	}

	try {
		if (Object.keys(finalArr).length > 0) {
			handleSuccess(res, finalArr);
		} else {
			handleSuccess(res, finalArr, 'No Record Found');
		}
	} catch (error) {
		handleFailure(res, 500, error);
	}
};

/**
 * @description update category
 * @param {object} req Request Object
 * @param {object} res Response Object
 */
exports.updateCategoriesStatus = async (req, res) => {
	try {
		const bodyData = req.body;
		const userName = req.userName;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'client-id': 'node-supplier-admin-service',
			},
		};
		for (let i = 0; i < bodyData.length; i++) {
			bodyData[i]['reviewedBy'] = userName;
		}
		const updatecategoryResp = await axios.put(
			conf.micro.categoryUrl,
			bodyData,
			config
		);
		handleSuccess(res, updatecategoryResp.data.data);
	} catch (error) {
		handleFailure(res, 500, error);
	}
};
