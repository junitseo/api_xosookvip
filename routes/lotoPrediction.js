const LotoPrediction = require('../models/lotoPrediction');
const express = require('express');
const router = express.Router();

router.get("/date/:date", async function(req, res){
    var date = req.params.date;
    var lotoPrediction = await LotoPrediction.findOne({"createdTime" : new Date(date)});
    if(lotoPrediction == null){
        lotoPrediction = await createLotoPrediction(date);
    }
    return res.status(200).send(lotoPrediction);
});
async function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function createLotoPrediction(dateTime){
    var date = new Date(dateTime);
    var bachThuLo = await randomInteger(0,100);
    var songThuLo = await randomInteger(0,100);
    while(songThuLo == bachThuLo){
        songThuLo = await randomInteger(0,100);
    }
    while(songThuLo == 0 || songThuLo == 11 || songThuLo == 22 || songThuLo == 33 || songThuLo == 44 || songThuLo == 55 || songThuLo == 66 || songThuLo == 77 || songThuLo == 88 || songThuLo == 99){
        songThuLo = await randomInteger(0,100);
    }
    var xien31 = await randomInteger(0,100);
    var xien32 = await randomInteger(0,100);
    if(xien31 == xien32){
        xien32 = await randomInteger(0,100);
    }
    var xien33 = await randomInteger(0,100);
    if(xien33 == xien32 || xien33 == xien31){
        xien33 = await randomInteger(0,100);
    }
    var bachThuLo = await checkLength(bachThuLo);
    var songThuLo = await await checkLength(songThuLo) + " _ " + await reverseNumber(await checkLength(songThuLo));
    
    var lotoPrediction = new LotoPrediction({
        createdTime : date,
        bachThuLo : bachThuLo,
        songThuLo : songThuLo,
        xienBa : await checkLength(xien31) + " _ " + await checkLength(xien32) + " _ " + await checkLength(xien33)
    });
    await lotoPrediction.save();
    return lotoPrediction;
}
router.post("/", async function(req, res) {
    var date = req.body.dateTime;
    var lotoPrediction = await createLotoPrediction(date);
    res.status(200).send(lotoPrediction);

})
async function reverseNumber(s){
    let charArray = s.toString().split('').reverse().join("");
    return charArray;
}
async function checkLength(n){
    if(n.toString().length < 2){
        return "0" + n;
    }else{
        return n.toString();
    }
}

module.exports = router;