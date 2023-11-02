const pageService = require('../services/page.service');
const formidable = require('formidable')
const slugHandler = require('../helpers/slugHandler')
const Page = require('../models/page.js');

function getAll(req, res, next){
    pageService.getAll()
        .then(page => res.json(page))
        .catch(next) 
}

async function create(req, res){
    try{
            const {page_title,  page_category_slug, page_description, page_category_name, page_content, faq_id, schema_id} = req.body;
            if(!page_title || !page_title.length){
                return res.status(400).json({
                    error: 'Title is required'
                })
            }
            if(!page_content || !page_content.length){
                return res.status(400).json({
                    error: 'Content is required'
                })
            }
            if(!page_description || !page_description.length){
                return res.status(400).json({
                    error: 'Description is required'
                })
            }
            if(!page_category_name || !page_category_name.length){
                return res.status(400).json({
                    error: 'Category name is required'
                })
            }
            let page = new Page();
            page.page_title = page_title;
            page.page_content = page_content;
            page.page_category_name = page_category_name;
            if(!page_category_slug && !page_category_slug.length){
                page.page_category_slug = slugHandler.slugify(page_category_name).toLowerCase();
            }else{
                page.page_category_slug = page_category_slug.toLowerCase();
            }
            page.schema_id = schema_id;
            page.page_content = page_content;
            page.page_description = page_description;
            let arrayOfFAQ = (faq_id && faq_id != "") ? faq_id.split(',') : [];
            page.save((err,result) => {
                if(err){
                    return res.status(400).json({
                        message : err.message
                    })
                }
                if(arrayOfFAQ){
                    Page.findByIdAndUpdate(result._id, {
                        $push: {faq_id: arrayOfFAQ}
                    }, {new: true}).exec((err, result)=> {
                        res.json(result);
                    })
                }
                
            })
    }catch (err) {
        return res.status(400).json({
            message : err.message
        })
    }
    
}

async function edit (req, res, next){
    const id = req.params.id ? req.params.id : null;
    try{
        if(id){
            Page.findById(id).exec((err, data) => {
                if(err){
                    return res.status(400).json({
                        message : err.message
                    })
                }
                let form = new formidable.IncomingForm();
                form.keepExtensions = true;
                form.parse(req, (err, fields, files)=> {
                    const {id, page_title,  page_category_slug, page_description, page_category_name, page_content, faq_id, schema_id} = fields;
                    data = _.merge(data, fields);
                    if(!page_title || !page_title.length){
                        return res.status(400).json({
                            error: 'Title is required'
                        })
                    }
                    if(!page_content || !page_content.length){
                        return res.status(400).json({
                            error: 'Content is required'
                        })
                    }
                    if(!page_description || !page_description.length){
                        return res.status(400).json({
                            error: 'Description is required'
                        })
                    }
                    if(!page_category_name || !page_category_name.length){
                        return res.status(400).json({
                            error: 'Category name is required'
                        })
                    }
                    if(!page_category_slug && !page_category_slug.length){
                        data.page_category_slug = slugHandler.slugify(page_category_name).toLowerCase();
                    }else{
                        data.page_category_slug = page_category_slug.toLowerCase();
                    }
                    let arrayOfFAQ = (faq_id && faq_id != "") ? faq_id.split(',') : [];
                    data.faq_id = arrayOfFAQ;
                    data.page_title = page_title;
                    data.page_content = page_content;
                    data.page_category_name = page_category_name;
                    data.page_content = page_content;
                    data.page_description = page_description;
                    data.schema_id = schema_id;
                    data.save((err, result) => {
                        if(err){
                            return res.status(400).json({
                                message : err.message
                            })
                        }
                        res.status(200).json(result);
                    })
        
                })
            })
        }else{
            return res.status(400).json({
                message : 'Not found id'
            })
        }
    }catch (err){
        return res.status(400).json({
            message : err.message
        })
    }
}

async function search (req, res, next){
    const search = req.query.q ? req.query.q : null;
    if(search){
        var query = await pageService.search(search);
        return res.json(query);
    }
    return res.status(400).json({message : 'Error'})
}

async function remove (req, res, next){
    const id = req.params.id ? req.params.id : null;
    try{
        var query = await pageService.remove(id);
        if(query){
            return res.status(200).json(
                {
                    isSuccess : true,
                    message : 'Successfully'
                }
            )
        }else{
            return res.status(400).json(
                {
                    isSuccess : false,
                    message: 'Page not found'
                }
            )
        }
    }catch (err) {
        return res.status(400).json({
            message : err.message
        })
    }
    
}
async function getBySlug(req,res) {
    const slug = req.params.slug ? req.params.slug : null;
    try{
        if(slug){
            var query = await pageService.getBySlug(slug);
            return res.json(query);
        }else{
            return res.status(400).json({message : 'Error Slug'})
        }
    }catch (err){
        return res.status(400).json({
            message : err.message
        })
    }
    
}
async function getById (req, res) {
    const id = req.params.id ? req.params.id : null;
    try{
        if(id){
            var query = await pageService.getById(id);
            return res.json(query);
        }else{
            return res.status(400).json({message : 'Error id'})
        }
    }catch (err){
        return res.status(400).json({
            message : err.message
        })
    }
}

module.exports = {
    getAll,
    create,
    edit,
    search,
    remove,
    getById,
    getBySlug
}