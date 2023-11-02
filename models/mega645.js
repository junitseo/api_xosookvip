const mongoose = require('mongoose');

const mega645Schema = new mongoose.Schema({
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
    jackpot: {
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
    match3Winner: {
        type :String,
    },
    match4Winner: {
        type :String,
    },
    match5Winner: {
        type :String,
    },
    idKy : {
        type: String
    }
    
})

mega645Schema.virtual('id').get(function(){
    return this._id.toHexString();
});

mega645Schema.set('toJSON', {
    virtuals : true,
});

module.exports = mongoose.model('Mega645', mega645Schema); 