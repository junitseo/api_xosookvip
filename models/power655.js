const mongoose = require('mongoose');

const power655Schema = new mongoose.Schema({
    dayPrize : {
        type: String,
    },
    dayPrizeNext : {
        type: String,
    },
    number1 : {
        type: String,
    },
    number2: {
        type: String,
    },
    number3: {
        type :String,
    },
    number4: {
        type :String,
    },
    number5: {
        type :String,
    },
    number6: {
        type :String,
    },
    number7: {
        type :String,
    },
    jackpot1: {
        type :String,
    },
    jackpot2: {
        type :String,
    },
    match3: {
        type :String,
    },
    match4: {
        type :String,
    },

    match5: {
        type :String,
    },
    jackpotWinner: {
        type :String,
    },
    jackpot2Winner: {
        type :String,
    },

    match3Winner: {
        type :String,
    },
    match4Winner: {
        type :String,
    },
    match5Winner: {
        type :String,
    },
    idKy: {
        type :String,
    },

    
})

power655Schema.virtual('id').get(function(){
    return this._id.toHexString();
});

power655Schema.set('toJSON', {
    virtuals : true,
});

module.exports = mongoose.model('Power655', power655Schema); 