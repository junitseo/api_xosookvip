const Taxonomy = require("../models/taxonomy.js");

exports.buildAncestors = async (id, parent_id) => {
    let ancest = [];
    try {
        let parent_category = await Taxonomy.findOne({ "_id": parent_id }, { "tax_name": 1, "tax_slug": 1, "tax_ancestors": 1 }).exec();
        if (parent_category) {
            const { _id, tax_name, tax_slug } = parent_category;
            const ancest = [...parent_category.tax_ancestors];
            ancest.unshift({ _id, tax_name, tax_slug })
            const taxonomy = await Taxonomy.findByIdAndUpdate(id, { $set: { "tax_ancestors": ancest } });
        }
    } catch (err) {
        console.log(err.message)
    }
}
//hàm đệ quy duyệt và xây dựng mảng tổ tiên của các loại con cháu
exports.buildHierarchyAncestors = async (category_id, parent_id) => {
    if(category_id && parent_id){
        this.buildAncestors(category_id, parent_id);
        const result = await Taxonomy.find({'tax_parent': category_id}).exec();
        if(result){
            result.forEach((doc) => {
                this.buildHierarchyAncestors(doc._id, category_id);
            })
        }
    }
}