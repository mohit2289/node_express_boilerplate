/**
 * @author Mohd Mohibuddin
 * @description this file has middleware methods to upload files in S3 bucket using multer
 */
const multer = require('multer');
const multerS3 = require('multer-s3');
//const path = require('path');
//const BUCKET_PATH = 'dev-node-aggregator-bucket';
const AWS = require('aws-sdk');
const config = require('../config/index');

const s3 = new AWS.S3({
	accessKeyId: config.s3AccessKey,
	secretAccessKey: config.s3SecretKey,
});
/**
 * @description Upload file
 * @param {*} key Key
 * @returns
 */
const uploadsFile = (key) => {
	return multer({
		storage: multerS3({
			s3: s3,
			bucket: config.bucketPath,
			acl: 'public-read',
			metadata: (req, file, cb) => {
				cb(null, { fieldName: file.fieldname });
			},
			key: (req, file, cb) => {
				cb(
					null,
					key +
						'/' +
						Date.now().toString() +
						'.' +
						file.originalname.split('.')[1]
				);
			},
		}),
		fileFilter: (req, file, cb) => {
			if (
				file.mimetype === 'image/jpeg' ||
				file.mimetype === 'image/png' ||
				file.mimetype === 'text/csv'
			) {
				cb(null, true);
			} else {
				cb(null, true);
			}
		},
		limits: {
			fileSize: 1080 * 1080 * 5,
		},
	});
};

module.exports.uploadFiles = uploadsFile;
