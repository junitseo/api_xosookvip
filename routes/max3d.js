const router = require('express').Router()
const {getMax3D} = require('../controllers/vietlot')

router.get('/:ngay', getMax3D)

module.exports = router