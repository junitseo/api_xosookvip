const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const taxonomySchema = new mongoose.Schema({
    tax_name : {
        type: String,
        trim: true,
        required: true,
        uniqure: true,
        index: true
    },
    tax_description : {
        type: {},
        max : 9999999999
    },
    tax_type : {
        type: String,
    },
    tax_slug : {
        type: String,
    },
    tax_parent : { 
        type : mongoose.Schema.Types.ObjectId,
        default: null,
        ref : 'Taxonomy'
    },
    tax_ancestors : [{
        _id : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Taxonomy",
            index: true
        },
        name : String,
        slug: String
    }],
    
    
}, {timestamps: true});

module.exports = mongoose.model('Taxonomy', taxonomySchema);