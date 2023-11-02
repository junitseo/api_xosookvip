const Schema = require('../models/schema.js');
const mongoose = require('mongoose');
module.exports = {
    remove,
    search,
    create,
    edit,
    getAll,
    getById
}

function isValidId(id){
    return mongoose.Types.ObjectId.isValid(id);
}

async function remove (id){
    if(!isValidId(id)) return {message : 'Schema not found'};
    var query = await Schema.findByIdAndRemove(id);
    return query;
}

async function search (search) {
    if(search){
        var query = await Schema.find({
            $or: [{schema_type : {$regex: search, $options: 'i'}}]
        })
        .populate('post_id')
        .populate('page_id')
        .sort({'updatedAt': -1})
        .select('_id schema_type schema_script post_id page_id');;
        return query ? query : null;
    }else{
        var query = await Schema.find({})
                    .populate('post_id')
                    .populate('page_id')
                    .sort({'updatedAt': -1})
                    .select('_id schema_type schema_script post_id page_id');;
        return query ? query : null;
    }
}

async function create(schema_type, schema_script, post_id, page_id){
    let schema = new Schema();
    schema.schema_type = schema_type;
    schema.schema_script = schema_script;
    schema.page_id = (page_id && page_id != "") ? page_id : null;
    let arrayOfPost = (post_id && post_id != "") ? post_id.split(',') : [];
    schema.save((err, result) => {
        if(err){
            return {
                message : err
            }
        }
        if(arrayOfPost){
            Schema.findByIdAndUpdate(result._id, {
                $push: {post_id : arrayOfPost}
            }, {new: true}).exec((err, result) => {
                if(err){
                    return {
                        message : err
                    }
                }
            })
        }
        return result;
    });
    
    
    
}
async function edit ({id, schema_type, schema_script, post_id, page_id}){
    if(!isValidId(id)) return {message : 'Schema not found'};
    const query = await Schema.findByIdAndUpdate(id, {
        schema_type : schema_type,
        schema_script : schema_script,
        post_id : post_id ? post_id?.split(',') : [],
        page_id : page_id ? page_id : null
    })
    .populate('post_id')
    .populate('page_id')
    .select('_id schema_type schema_script post_id page_id');

    return query;

}
async function getAll(){
    var query = await Schema.find({})
                    .populate('post_id')
                    .populate('page_id')
                    .sort({'updatedAt': -1})
                    .select('_id schema_type schema_script post_id page_id');;
    return query ? query : null;
}

async function getById(id){
    if(!isValidId(id)) return {message : 'Schema not found'};
    try {
        var query = await Schema.findById(id)
                    .populate('post_id')
                    .populate('page_id')
                    .select('_id schema_type schema_script post_id page_id');
        return query;
    } catch (error) {
        return { message : error.message}
    }
    
}

function basicDetails (Schema){
    const {id, schema_type,  schema_script, post_id} = Schema;
    return {id, schema_type,  schema_script, post_id};
}

module.exports = {
    getById,
    getAll,
    search,
    create,
    edit,
    remove
}