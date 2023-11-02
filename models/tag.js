const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        require: true,
        max: 32,
        unique: true,
        index: true,
        lowercase: true,
    },
    slug : {
        type: String,
        unique: true,
        index:true,
    },
    status: {
        type : Number
    },
    page : {
        type : String,
        index: true,
        lowercase: true
    }
    
}, {timestamps: true});

module.exports = mongoose.model('Tag', tagSchema);