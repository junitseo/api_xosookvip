const router = require('express').Router()
const HomeBannerController = require('../controllers/HomeBanner')

router.put(`/update`, HomeBannerController.uploadBanner)
router.get(`/`, HomeBannerController.getBanner)

module.exports = router