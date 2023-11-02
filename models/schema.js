const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const schemaSchema = new mongoose.Schema({
    schema_type : {
        type: String,
    },
    schema_script : {
        type: String,
    },
    post_id : [
        {
            type: ObjectId, 
            ref : 'Post', 
        }
    ],
    page_id : {
        type: ObjectId,
        ref : 'Page'
    },
    
    
}, {timestamps: true});

module.exports = mongoose.model('Schema', schemaSchema);