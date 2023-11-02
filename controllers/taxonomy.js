const Taxonomy = require('../models/taxonomy.js');
const { buildAncestors, buildHierarchyAncestors } = require('../helpers/taxonomy');
const { baseModelName } = require('../models/taxonomy.js');
const slugHandler = require('../helpers/slugHandler');

exports.getTaxBySlug = async (req, res) => {
        const slug = req.params.slug ? req.params.slug.toLowerCase() : null;
        try {
            if (slug != 'undefined' && slug) {
                const result = await Taxonomy.findOne({ tax_slug: slug }).select(
                    "id tax_name tax_description tax_type tax_slug tax_parent ancestors.slug ancestors.name ancestors._id"
                ).exec();
                return res.json(result);
            }
            else {
                return res.status(400).json({
                    message: 'Slug not found'
                })
            }
        } catch (error) {
            return res.json({
                message: error.message
            });
        }
}

exports.create = async (req, res) => {
    try {
            const { tax_name, tax_description, tax_type, tax_slug, tax_parent } = req.body;
            if (!tax_name || !tax_name.length) {
                dashLogger.error(`Error : Name is required, Request : ${req.originalUrl}`);
                return res.status(400).json({
                    error: 'Name is required',
                })
            }
            let parent = (tax_parent || tax_parent == "0") ? tax_parent : null;
            let slug = "";
            if (tax_slug) {
                slug = slugHandler.slugify(tax_slug).toLowerCase();
            } else {
                slug = slugHandler.slugify(tax_name).toLowerCase();
            }
            try {
                let tax = new Taxonomy({ tax_name, tax_type, tax_slug: slug, tax_parent: parent, tax_description });
                tax.save((err, newTax) => {
                    if (err) {
                        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                        return res.status(400).json({
                            message: err.message
                        })
                    } else {
                        buildAncestors(newTax.id, parent)
                        res.json(newTax);
                    }
                });

            } catch (err) {
                dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                return res.status(400).json({
                    message: err.message
                })
            }
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
        return error
    }



}
// exports.update = (req, res) => {
//     var slug = req.params.slug;
//     Category.findOneAndUpdate({ slug }, {
//         name: req.body.name,
//         slug: slugify(req.body.name).toLowerCase()
//     }, { new: true }).exec((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             })
//         }
//         return res.json(data);
//     })
// }
exports.list = (req, res) => {
    try {
        Taxonomy.find({}).sort({ 'updatedAt': -1 }).exec((err, data) => {
            if (err) {
                dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                return res.status(400).json({
                    message: err.message
                })
            }
            return res.json(data);
        })
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
        return res.status(400).json({
            message: err.message
        })
    }

}

exports.remove = (req, res) => {
    var id = req.params.id ? req.param.id : null;
    try {
        if (id) {
            Taxonomy.findByIdAndRemove(id).exec((err, data) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                }
                return res.json(data);
            })
        } else {
            dashLogger.error(`Error : Id not found, Request : ${req.originalUrl}`);
            return res.status(400).json({
                message: 'id not found'
            })
        }
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
        return res.status(400).json({
            message: err.message
        })
    }


}

exports.search = (req, res) => {
    const search = req.query.q ? req.query.q : null;
    try {
        if (search) {
            Taxonomy.find({
                $or: [
                    { tax_name: { $regex: search, $options: 'i' } },
                    { tax_type: { $regex: search, $options: 'i' } },
                    { tax_slug: { $regex: search, $options: 'i' } }
                ]
            }, (err, tax) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                }
                res.json(tax)
            })
                .sort({ 'updatedAt': -1 })
                .select(
                    "id tax_name tax_description tax_type tax_slug tax_parent ancestors.slug ancestors.name ancestors._id"
                )
        } else {
            Taxonomy.find({})
                .sort({ 'updatedAt': -1 })
                .select(
                    "id tax_name tax_description tax_type tax_slug tax_parent ancestors.slug ancestors.name ancestors._id"
                ).exec((err, data) => {
                    if (err) {
                        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                        return res.status(400).json({
                            message: err.message
                        })
                    }
                    res.json(data);
                })
        }
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
        return res.status(400).json({
            message: err.message
        })
    }

}
exports.read = async (req, res) => {
    const slug = req.params.slug ? req.params.slug.toLowerCase() : null;
    try {
        if (slug) {
            const result = await Taxonomy.findOne({ tax_slug: slug }).select(
                "id tax_name tax_description tax_type tax_slug tax_parent ancestors.slug ancestors.name ancestors._id"
            ).exec();
            return res.json(result);
        }
        else {
            dashLogger.error(`Error : Slug not found, Request : ${req.originalUrl}`);
            return res.status(400).json({
                message: 'Slug not found'
            })
        }
    } catch (error) {
        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
        return res.json({
            message: error.message
        });
    }
    // Category.findOne({slug}).exec((err,data) => {
    //     if(err){
    //         return res.status(400).json({
    //             error: errorHandler(err)
    //         })
    //     }
    //     return res.json({
    //         message : 'Category deleted successfully!'
    //     });
    // })
}
//Hàm truyền id danh mục cha để hiển thị các con của nó
exports.descendants = async (req, res) => {
    try {
        var tax_id = req.params.tax_id ? req.params.tax_id : null;
        if (tax_id) {
            const result = await Taxonomy.find({ "ancestors._id": tax_id })
                .select({ "_id": false, "name": true })
                .exec();
            return res.json(result);
        }
        else {
            dashLogger.error(`Error : Tax_id not found ,Request : ${req.originalUrl}`);
            return res.status(400).json({
                message : 'Tax_id not found '
            })
        }
    } catch (error) {
        dashLogger.error(`Error : ${error} : ${req.originalUrl}`);
        return res.json({
            message: error.message
        });
    }
}
exports.updateTaxonomy = async (req, res) => {
    const id = req.params.id ? req.params.id : null;
    try{
        if (id) {
                const { tax_name, tax_description, tax_type, tax_slug, tax_parent } = req.body;
                if (!tax_name || !tax_name.length) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                }
                if (!id || !id.length) {
                    dashLogger.error(`Error : Id is required,Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        error: 'Id is required',
                    })
                }
                var new_parent_id = (tax_parent || tax_parent == "0") ? tax_parent : null;
                var slug = tax_slug == "" ? slugHandler.slugify(tax_name).toLowerCase() : tax_slug;
                if (new_parent_id != null) {
                    //Thay đổi tổ tiên của một danh mục
                    Taxonomy.findByIdAndUpdate(id, { $set: { "tax_parent": new_parent_id } }).exec(async (err, data) => {
                        if (err) {
                            dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                            return res.status(400).json({
                                message: err.message
                            })
                        }
                        await buildHierarchyAncestors(id, new_parent_id);
                    });
                }
                //Đổi tên danh mục
                Taxonomy.findByIdAndUpdate(id, {
                    tax_name: tax_name,
                    tax_slug: slug,
                    tax_description: tax_description,
                    tax_type: tax_type
                }, { new: true }).exec(async (err, data) => {
                    if (err) {
                        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                        return res.status(400).json({
                            message: err.message
                        })
                    }
                    const updateName = await Taxonomy.updateMany({ "ancestors._id": id },
                        {
                            "$set":
                            {
                                "ancestors.$.tax_name": baseModelName,
                                "ancestors.$.slug": slugHandler.slugify(tax_name).toLowerCase()
                            }
                        }, { multi: true })
                    return res.json(data);
                })
        } else {
            dashLogger.error(`Error : Id not found, Request : ${req.originalUrl}`);
            return res.status(400).json({
                message: 'Id not found'
            })
        }
    }catch (err){
        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
        return res.status(400).json({
            message : err.message
        })
    }
   

}
// exports.updateAncestry = async (req, res) => {
//     try {
//         var category_id = req.body.category_id;
//         var new_parent_id = req.body.new_parent_id;
//         await Category.findByIdAndUpdate(category_id, { $set: { "parent": new_parent_id } }).exec(async (err, data) => {
//             if(err){
//                 return res.status(400).json({
//                     error: errorHandler(err)
//                 })
//             }
//             await buildHierarchyAncestors(category_id, new_parent_id);
//             return res.json(data);
//         });
//     } catch (error) {
//         return res.status(400).json({
//             error: errorHandler(error)
//         })
//     }
// }
// //Đổi tên danh mục
// exports.updateNameCategory = async (req, res) => {
//     try {
//         var category_id = req.body.id;
//         var category_name = req.body.name;
//         await Category.findByIdAndUpdate(category_id, {
//             name: category_name,
//             slug: slugify(category_name).toLowerCase()
//         }, { new: true }).exec(async (err, data) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: errorHandler(err)
//                 })
//             }
//             const updateName = await Category.updateMany({ "ancestors._id": category_id },
//                 {
//                     "$set":
//                     {
//                         "ancestors.$.name": category_name,
//                         "ancestors.$.slug": slugify(category_name).toLowerCase()
//                     }
//                 }, { multi: true })
//             return res.json(data);
//         })
//     } catch (error) {
//         return res.status(400).json({
//             error: errorHandler(error)
//         })
//     }
// }
exports.removeTax = (req, res) => {
    var id = req.params.id ? req.param.id : null;
    try{
        if (id) {
            Taxonomy.findByIdAndRemove(id).exec(async (err, data) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                }
                var result = await Taxonomy.deleteMany({ "ancestors._id": category_id });
                return res.json(result);
            })
        } else {
            dashLogger.error(`Error : Id not found, Request : ${req.originalUrl}`);
            return res.status(400).json({
                message: 'error not id'
            })
        }
    }catch (err){
        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
        return res.status(400).json({
            message : err.message
        })
    }
    

}

exports.getByType = (req, res) => {
    let type = req.params.type ? req.params.type : null;
    try{
        if (type) {
            Taxonomy.find({ 'tax_type': type })
                .sort({ 'updatedAt': -1 })
                .exec((err, data) => {
                    if (err) {
                        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                        return res.status(400).json({
                            message: err.message
                        })
                    }
                    return res.json(data);
                })
        } else {
            dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
            return res.status(400).json({
                message: err.message
            })
        }
    }catch (err){
        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
        return res.status(400).json({
            message : err.message
        })
    }
    
}
