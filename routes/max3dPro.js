const vietlottController = require('../controllers/vietlot')
const router = require('express').Router()

router.get('/:date', vietlottController.getMax3DPro)

module.exports = router