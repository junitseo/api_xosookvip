const mongoose = require('mongoose');

const max3DProSchema = new mongoose.Schema({
    dayPrize : {
        type: String,
    },
    dayPrizeNext : {
        type: String,
    },
    specialPrize1 : {
        type: String,
    },
    specialPrize2 : {
        type: String,
    },
    subSpecialPrize1: {
        type: String,
    },
    subSpecialPrize2: {
        type :String,
    },
    firstPrize1: {
        type: String
    },
    firstPrize2: {
        type: String
    },
    firstPrize3: {
        type: String
    },
    firstPrize4: {
        type: String
    },
    secondPrize1: {
        type: String
    },
    secondPrize2: {
        type: String
    },
    secondPrize3: {
        type: String
    },
    secondPrize4: {
        type: String
    },
    secondPrize5: {
        type: String
    },
    secondPrize6: {
        type: String
    },
    thirdPrize1: {
        type :String,
    },
    thirdPrize2: {
        type :String,
    },
    thirdPrize3: {
        type :String,
    },
    thirdPrize4: {
        type :String,
    },
    thirdPrize5: {
        type :String,
    },
    thirdPrize6: {
        type :String,
    },
    thirdPrize7: {
        type :String,
    },
    thirdPrize8: {
        type :String,
    },
    specialPrizeWinners: {
        type :String,
    },
    subSpecialPrizeWinners: {
        type :String,
    },
    firstPrizeWinners: {
        type: String,
    },
    secondPrizeWinners: {
        type :String,
    },
    thirdPrizeWinners: {
        type :String,
    },
    idKy: {
        type:String,
    }
})

max3DProSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

max3DProSchema.set('toJSON', {
    virtuals : true,
});

module.exports = mongoose.model('Max3Dpro', max3DProSchema); 