const express = require("express");
const router = express.Router();
const Max4DController = require('../controllers/vietlot')

router.get('/:date', Max4DController.getMax4D)

module.exports = router;