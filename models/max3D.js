const mongoose = require('mongoose');

const max3DSchema = new mongoose.Schema({
    dayPrize : {
        type: String,
    },
    dayPrizeNext : {
        type: String,
    },
    firstPrize1 : {
        type: String,
    },
    firstPrize2 : {
        type: String,
    },
    secondPrize1: {
        type: String,
    },
    secondPrize2: {
        type :String,
    },
    secondPrize3: {
        type :String,
    },
    secondPrize4: {
        type :String,
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
    resultsConsolation1: {
        type :String,
    },
    resultsConsolation2: {
        type :String,
    },
    resultsConsolation3: {
        type :String,
    },
    resultsConsolation4: {
        type :String,
    },
    resultsConsolation5: {
        type :String,
    },
    resultsConsolation6: {
        type :String,
    },
    resultsConsolation7: {
        type :String,
    },
    resultsConsolation8: {
        type :String,
    },
    firstTotalWinners: {
        type :String,
    },
    secondTotalWinners: {
        type :String,
    },
    thirdTotalWinners: {
        type :String,
    },

    consolationTotalWinners: {
        type :String,
    },
    win1StAmount: {
        type :String,
    },

    win2StAmount: {
        type :String,
    },
    win3StAmount: {
        type :String,
    },
    winConsolationAmount: {
        type :String,
    },
    idKy: {
        type:String,
    }
})

max3DSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

max3DSchema.set('toJSON', {
    virtuals : true,
});

module.exports = mongoose.model('Max3D', max3DSchema); 