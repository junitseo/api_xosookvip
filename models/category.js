const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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
    page : {
        type : String,
        index : true,
        lowercase: true,
    },
    status: {
        type: Number
    }
    
}, {timestamps: true});

module.exports = mongoose.model('Category', categorySchema);