const Tag = require('../models/tag');
const slugify = require('slugify');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const name = req.body.name;
    let slug = slugify(name).toLowerCase();
    let page = req.body.page;
    let status =  req.body.status;
    let tag = new Tag({name, slug, page , status});
    tag.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.json(data);
    })
}
exports.update = (req, res) => {
    var slug = req.params.slug;
    Tag.findOneAndUpdate({slug}, {
        name : req.body.name,
        slug : slugify(req.body.name).toLowerCase(),
        page: req.body.page,
        status : req.body.status
    }, { new: true}).exec((err,data) => {
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        return res.json(data);
    })
    
}
exports.list = (req, res) => {
    Tag.find({"page" : req.params.page}).exec((err,data) => {
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        return res.json(data);
    })
}

exports.remove = (req, res) => {
    var slug = req.params.slug;
    Tag.findOneAndRemove({slug}).exec((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.json(data);
    })
}

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Tag.findOne({slug}).exec((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.json({
            message : 'Tag deleted successfully!'
        });
    })
}

exports.createList = (req, res) => {
    var list = req.body;
    var listTag = [];
    for( const item of list){
        var name = item.name;
        let slug = slugify(name).toLowerCase();
        let page = item.page;
        let status = item.status;
        let tag = new Tag({name, slug, page, status});
        tag.save((err, data) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            listTag.push(data);
        })
    }
    return res.json(listTag);
    
}