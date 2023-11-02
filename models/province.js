const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
    _id : {
        type: Number,
        require : true,
    },
    name: {
        type: String,
        require: true,
    },
    region :{
        type: Number,
        require: true,
    },
    nameNoSign :{
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('Provinces', provinceSchema); 