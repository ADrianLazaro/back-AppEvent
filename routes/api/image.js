// routes/imageRoutes.js

const express = require('express');
const router = express.Router();
const imageController = require('../../controllers/imageController');

router.get('/:fileName', imageController.getImageUrl);

module.exports = router;
