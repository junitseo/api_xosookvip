const router = require('express').Router()
const dreamController = require('../controllers/dream')

router.get('/crawlDream', dreamController.crawlDream)
router.get('/', dreamController.getDream)

module.exports = router