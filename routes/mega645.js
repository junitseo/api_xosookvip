const Mega645 = require('../models/mega645');
const express = require("express");
const router = express.Router();
var moment = require('moment');
var request = require("request");
const http = require('http');
var _ = require('underscore');
const { getMega645 } = require('../controllers/vietlot');


router.get("/:ngay", getMega645);

router.get('/getById/:id', async function (req, res){
    var mega645 = await Mega645.findById(req.params.id).exec();
    var data = {
        isSuccessed : false,
        resultObj : [],
        message : "The mega645 with the given ID was not found!",
    }
    if(mega645.length == 0){
        res.status(500).send(data);
    }else{
        data = {
            isSuccessed : true,
            resultObj : mega645,
            message : "",
        }
        res.status(200).send(data);
    }
})


module.exports = router;