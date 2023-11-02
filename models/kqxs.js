const mongoose = require('mongoose');

const KQXSSchema = new mongoose.Schema({
    provinceId: {
        type: Number,
    },
    code: {
        type: String,
    },
    region: {
        type: Number,
    },
    firstDigit: {
        type: String,
    },
    secondDigit: {
        type: String,
    },
    thirdDigit: {
        type: String,
    },
    fourthDigit: {
        type: String,
    },
    fifthDigit: {
        type: String,
    },
    sixthDigit: {
        type: String,
    },
    number: {
        type: String,
    },
    loto: {
        type: String,
    },
    lotoMixed: {
        type: String,
    },
    firstNumber: {
        type: String,
    },
    lastNumber: {
        type: String,
    },
    dayPrize: {
        type: String,
    },
    prizeId: {
        type: Number,
    },
    prId : {
        type: Number,
    },
    prizeColumn: {
        type: Number,
    },
    provinceName: {
        type: String
    },
    provinceRegion :{
        type : Number
    },
    provinceNameNoSign :{
        type: String
    },
    winningName : {
        type : String,
    },
    winningMoney : {
        type: String
    },
    isRunning: {
        type: String,
        default: false,
    }
});

KQXSSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

KQXSSchema.set('toJSON', {
    virtuals : true,
});

module.exports = mongoose.model('KQXS', KQXSSchema); 