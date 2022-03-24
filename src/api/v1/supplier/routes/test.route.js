const express = require('express');
const router = express.Router();

const test = require('../controllers/test.controller');
router.post('/', test.create); // validate and create collection

module.exports = router;
