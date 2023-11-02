const Page = require('../models/page.js');
const mongoose = require('mongoose');

function isValidId(id){
    return mongoose.Types.ObjectId.isValid(id);
}

async function remove (id){
    if(!isValidId(id)) return {message : 'Page not found'};
    var query = await Page.findByIdAndRemove(id);
    return query;
}

async function search (search) {
    if(search){
        var query = await Page.find({
            $or: [
                {page_title : {$regex: search, $options: 'i'}},
                {page_category_slug : {$regex: search, $options: 'i'}},
                {page_category_name : {$regex: search, $options: 'i'}},
            ]
        })
        .populate('schema_id')
        .populate('faq_id')
        .sort({'updatedAt': -1})
        .select("id page_title page_category_slug page_description page_category_name page_content faq_id schema_id ");
        return query ? query : null;
    }else{
        var query = await Page.find({})
        .populate('schema_id')
        .populate('faq_id')
        .sort({'updatedAt': -1})
        .select("id page_title page_category_slug page_description page_category_name page_content faq_id schema_id ");
        return query ? query : null;
    }
}

// async function create({page_title, page_category_slug, page_category_name, faq_id}){
//     let page = new Page();
//     page.page_title = page_title;

//     if(!page_category_slug && !page_category_slug.length){
//         page.page_category_slug = slugHandler.slugify(page_title).toLowerCase();
//     }else{
//         page.page_category_slug = page_category_slug.toLowerCase();
//     }
//     let arrayOfFaq = faq_id && faq_id.split(',');
//     await page.save((err, result) => {
//         if(err){
//             return {
//                 message : err
//             }
//         }
//         Page.findByIdAndUpdate(result._id, {
//             $push: {faq_id : arrayOfFaq}
//         }, {new: true}).exec((err, result) => {
//             if(err){
//                 return {
//                     message : err
//                 }
//             }
//         })
//     });
//     return page;
// }
// async function edit ({id, page_title, page_slug, faq_id}){
//     if(!isValidId) throw 'Page not found';
//     var slug = "";
//     if(!page_slug && !page_slug.length){
//         slug = slugHandler.slugify(page_title).toLowerCase();
//     }else{
//         slug = page_slug.toLowerCase();
//     }
//     const query = await Page.findByIdAndUpdate(id, {
//         page_slug : slug,
//         page_title : page_title,
//         faq_id : faq_id
//     });
    
//     return basicDetails(query);

// }
async function getAll(){
    var query = await Page.find({})
                .populate('schema_id')
                .populate('faq_id')
                .sort({'updatedAt': -1})
                .select("id page_title page_category_slug page_description page_category_name page_content faq_id schema_id ")
    return query;
}

async function getById(id){
    if(!isValidId(id)) return {message : 'Page not found'};
    var query = await Page.findById(id)
                    .populate('schema_id')
                    .populate('faq_id')
                    .select("id page_title page_category_slug page_description page_category_name page_content faq_id schema_id ");
    if(query){
        return query;
    }else{
        return [];
    }
}

async function getBySlug(slug){
    var query = await Page.findOne({page_category_slug: slug})
                    .populate('schema_id')
                    .populate('faq_id')
                    .sort({'updatedAt': -1})
                    .select("id page_title page_category_slug page_description page_category_name page_content faq_id schema_id ");
    if(query){
        return query;
    }else{
        return [];
    }
}

function basicDetails (page){
    const {id, page_title,  page_category_slug, page_description, page_category_name, page_content, faq_id} = page;
    return {id, page_title,  page_category_slug, page_description, page_category_name, page_content, faq_id};
}

module.exports = {
    getById,
    getAll,
    search,
    remove,
    getBySlug
}