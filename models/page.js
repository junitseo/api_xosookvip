const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const pageSchema = new mongoose.Schema({
    page_title : {
        type: String,
    },
    page_description: {
        type: {}
    },
    page_content: {
        type: {}
    },
    page_category_slug: {
        type: String,
    },
    page_category_name: {
        type: String
    },
    faq_id : [
        {
            type: ObjectId, 
            ref : 'FAQ', 
        }
    ],
    schema_id : {
        type: ObjectId,
        ref: 'Schema'
    }
    
    
}, {timestamps: true});

module.exports = mongoose.model('Page', pageSchema);