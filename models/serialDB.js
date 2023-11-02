const mongoose = require('mongoose');

const SerialDBSchema = new mongoose.Schema({
    provinceId: {
        type: Number,
    },
    serial: {
        type: String,
    },
    dayPrize: {
        type: String,
    },
    orderNum: {
        type: String,
    },
});

SerialDBSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

SerialDBSchema.set('toJSON', {
    virtuals : true,
});

module.exports = mongoose.model('SerialDB', SerialDBSchema); 
