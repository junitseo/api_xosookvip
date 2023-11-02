const mongoose = require('mongoose')

const HomeBanner = mongoose.Schema({
    bannerLeft: String,
    bannerRight1: String,
    bannerRight2: String,
    bannerTopCenter: String,
    bannerBottomCenter: String,
    linkBannerRight1: String,         
    linkBannerRight2: String,
    linkBannerLeft:String,
    linkBannerTopCenter: String,
    linkBannerBottomCenter: String

})

module.exports = mongoose.model('homebanners', HomeBanner)