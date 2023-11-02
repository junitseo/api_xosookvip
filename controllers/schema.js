const schemaService = require('../services/schema.service');

function getAll(req, res, next){
    schemaService.getAll()
        .then(schema => res.json(schema))
        .catch(next)
}

async function create(req, res, next){
    const {id, schema_type, schema_script, post_id, page_id} = req.body;
    var query = await schemaService.create({id, schema_type, schema_script, post_id, page_id})
        .catch(next);
    return res.json(query);
}

async function edit (req, res, next){
    const id = req.params?.id;
    const {schema_type, schema_script, post_id, page_id} = req.body;
    var query = await schemaService.edit({id, schema_type, schema_script, post_id, page_id})
    return res.json(query);
}

async function search (req, res, next){
    const search = req.query?.q;
    var query = await schemaService.search(search);
    return res.json(query);
}

async function remove (req, res, next){
    const id = req.params?.id;
    var query = await schemaService.remove(id);
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
}
async function getById (req, res) {
    const id = req.params?.id;
    var query = await schemaService.getById(id);
    return res.json(query);
}

module.exports = {
    getAll,
    create,
    edit,
    search,
    remove,
    getById,
}