const mongoose = require('mongoose');

const shortcodeSchema = new mongoose.Schema({
    shortCode : {
        type: String,
    },
    name : {
        type: String,
    },
    content : {
        type: String,
    },

})

shortcodeSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

shortcodeSchema.set('toJSON', {
    virtuals : true,
});

module.exports = mongoose.model('Shortcodes', shortcodeSchema); 