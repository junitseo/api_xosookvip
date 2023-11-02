const Province = require('../models/province');
const express = require('express');
const router = express.Router();

router.get('/', async function(req, res){
    const provinceList = await Province.find().exec();
    var data = {
        isSuccessed : false,
        resultObj : [],
    }
    if(!provinceList){
        res.status(500).send(data);
    }else{
        data = {
            isSuccessed : true,
            resultObj : provinceList, 
        }
        res.status(200).send(data);
    }
    
    
});

router.get("/:id", async function(req, res){
    const province = await Province.findById(req.params.id);
    var data = {
        isSuccessed : false,
        resultObj : [],
    }
    if(!province){
        res.status(500).send(data);
    }
    else{
        data = {
            isSuccessed : true,
            resultObj : province, 
        }
        res.status(200).send(data);
    }
});

router.get("/getProvinceByName/:provinceName", async function (req, res){
    var provinceName = req.params.provinceName;
    var province = await Province.findOne({"name" : provinceName}).exec();
    res.status(200).send(province);
})

module.exports = router;