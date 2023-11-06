const lotoStatistics = require('../models/lotoStatistics');
const KQXS = require('../models/kqxs');
const express = require("express");
const router = express.Router();
const { dayPrize } = require('../models/lotoStatistics');
var _ = require('underscore');
var mapValues = require('lodash.mapvalues');
const { range } = require('underscore');
const bodyParser = require('body-parser');
router.get('/', function(req, res){
    
})

router.get('/days/:days/toDate/:toDate/rangeFrom/:rangeFrom/rangeTo/:rangeTo/sortBy/:sortBy/mode/:mode/provinceId/:provinceId', async function (req, res) {
    var days = parseInt(req.params.days);
    var toDate = req.params.toDate;
    var rangeFrom = parseInt(req.params.rangeFrom);
    var rangeTo = parseInt(req.params.rangeTo);
    var sortBy = parseInt(req.params.sortBy);
    var mode = parseInt(req.params.mode);
    var provinceId = parseInt(req.params.provinceId);
    var result = await LoDeStatistics(days, toDate, rangeFrom, rangeTo, sortBy, mode,provinceId);
    var data = {
        isSuccessed: false,
        resultObj: [],
    }
    if (result.length != 0) {
        data = {
            isSuccessed: true,
            resultObj: result,
        }
        res.send(data);
    } else {
        res.send(data);
    }

});

async function LoDeStatistics (days, toDate, rangeFrom, rangeTo, sortBy, mode, provinceId){
    var listResult = [];
    var query = await KQXS.find({"provinceId" : provinceId}).exec();
    if(query.length != 0){
        var date = new Date(toDate);
        var dateTmp = new Date(toDate);
        var exprires = new Date(dateTmp.setDate(dateTmp.getDate() - days)) ;
        var listXS = [];
        for(const item of query ){
            item.dateTime = new Date(item.dayPrize);
            if(date >= item.dateTime && item.dateTime >= exprires){
                listXS.push(item);
            }
        }
       
        var listGroupBy = _.groupBy(listXS, 'dateTime');
        var listDate = _.sortBy(listGroupBy, function(a,b){
            return new Date(a.dayPrize) - new Date(b.dayPrize);
          });
        var listNumber = [];
        for(var i = 0; i <= 99 ; i++){
            if(rangeFrom <= i && i <= rangeTo){
                const zeroPad = (num, places) => String(num).padStart(places, '0')
                listNumber.push(zeroPad(i, 2));
            }
        }
        
        for(const el of listDate){
            var listLoto = [];
            for(const item of el){
                var check = listNumber.includes(item.loto);
                if(check){
                    listLoto.push(item);
                }
            }

            var listData = _.chain(listLoto).groupBy("loto").map(function(key){
                   return {
                    "loto" : key[0].loto,
                    "dayPrize" : key[0].dayPrize,
                    "isShow" : true,
                    "countShow" : key.length,
                    "isDacBiet" : key[0].prizeId == 1 ? true : false,
                    "typeClass" : key.length == 0 ? "c c0" : (key.length == 1 ? "c c1" : key.length == 2 ? "c c3" : "c c4"),
                };
            }).sort(function (a, b) {
                return (parseInt(a.loto) < parseInt(b.loto)) ? -1 : 1;
              })
            if(mode == 2){
                var dataSort = listData.filter(x => x.isDacBiet == true);
                listResult.push(dataSort);
            }else{
                listResult.push(listData);
            }
        }
        return listResult;

    }
}

module.exports = router;