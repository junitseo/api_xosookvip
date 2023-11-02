const mongoose = require('mongoose');
const lotoStatisticsSchema = new mongoose.Schema({
    dayPrize : {
        type : String,
    },
    loto : {
        type : String,
    },
    isShow : {
        type : Boolean,
    },
    countShow : {
        type : Number
    },
    typeClass : {
        type : String
    },
    isDacBiet : {
        type : Boolean
    },
    dateTime : {
        type : Date
    }
})
lotoStatisticsSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

lotoStatisticsSchema.set('toJSON', {
    virtuals : true,
});

module.exports = mongoose.model('lotoStatistics', lotoStatisticsSchema); 