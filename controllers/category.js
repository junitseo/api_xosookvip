const Category = require('../models/category');
const slugify = require('slugify');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    let name = req.body.nam;
    let slug = slugify(name).toLowerCase();
    let page = req.body.page.toLowerCase();
    let status = req.body.status;
    let category = new Category({name, slug, page, status});

    category.save((err, data) => {
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
    Category.findOneAndUpdate({slug}, {
        name : req.body.name,
        slug : slugify(req.body.name).toLowerCase(),
        page : req.body.page.toLowerCase(),
        status: req.body.status,
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
    Category.find({"page" : req.params.page}).exec((err,data) => {
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        return res.json(data);
    })
}

exports.remove = (req, res) => {
    const slug= req.params.slug.toLowerCase();
    Category.findOneAndRemove({slug}).exec((err,data) => {
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
    Category.findOne({slug}).exec((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.json({
            message : 'Category deleted successfully!'
        });
    })
}