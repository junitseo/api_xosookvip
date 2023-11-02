const mongoose = require('mongoose');

const lotoPredictionsSchema = new mongoose.Schema({
    createdTime : {
        type: Date,
    },
    bachThuLo : {
        type: String,
    },
    songThuLo : {
        type: String,
    },
    xienBa: {
        type: String,
    },
})

lotoPredictionsSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

lotoPredictionsSchema.set('toJSON', {
    virtuals : true,
});

module.exports = mongoose.model('LotoPrediction', lotoPredictionsSchema); 