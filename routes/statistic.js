const router = require('express').Router()
const kqxsController = require('../controllers/kqxs')

router.post('/',kqxsController.getStatistic)

module.exports = router