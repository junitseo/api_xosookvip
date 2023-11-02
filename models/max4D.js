const mongoose = require('mongoose');

const max4DSchema = new mongoose.Schema({
    dayPrize : {
        type: String,
    },
    dayPrizeNext : {
        type: String,
    },
    firstPrize : {
        type: String,
    },
    secondPrize1: {
        type: String,
    },
    secondPrize2: {
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
    resultsConsolation1: {
        type :String,
    },
    resultsConsolation2: {
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

    consolationTotalWinners1: {
        type :String,
    },
    consolationTotalWinners2: {
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
    winConsolation1Amount: {
        type :String,
    },
    winConsolation2Amount: {
        type :String,
    },

    
})

max4DSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

max4DSchema.set('toJSON', {
    virtuals : true,
});

module.exports = mongoose.model('Max4D', max4DSchema); 