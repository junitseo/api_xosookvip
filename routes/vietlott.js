const Max4D = require('../models/max4D');
const Power655 = require('../models/power655');
const Mega645 = require('../models/mega645');
const express = require("express");
const router = express.Router();
var moment = require('moment');
var request = require("request");
const http = require('http');
var _ = require('underscore');

router.get("/date/:date", async function(req, res){
    var date = req.params.date;
    var result = await getKQVietlott(date);
    res.status(200).send(result);
});

async function getKQVietlott(date){
    return new Promise(async (resolve) => {
        var kqResult = {
            mega645: {},
            power655: {},
            max4D: {},
        };

        var token = "";
        var urlToken = "http://xosodo.vn/Home/GetToken";
        var optionToken = {
            method: 'GET',
            url: urlToken,
        };
        await request(optionToken, async function (error, response, body) {
            if (error) throw new Error(error);
            token = await JSON.parse(body).AccessToken;
            if (token != "") {
                var urlAddress = "http://api.xosodo.vn/api/KQVietlott/FilterByDate?date=" + date + "&limit=1";
                var options = {
                    method: 'GET',
                    url: urlAddress,
                    headers: {
                        'Authorization': "Bearer " + token,
                    }
                };
            }
            await request(options, async function (error, response, body) {
                if (error) throw new Error(error);
                var obj = JSON.parse(body);
                if(obj.Max4D != null){
                    var data = obj.Max4D;
                    var model = new Max4D ({
                        dayPrize : data.DayPrize.split('T')[0],
                        dayPrizeNext : data.DayPrizeNext.split('T')[0],
                        firstPrize : data.FirstPrize,
                        secondPrize1 : data.SecondPrize1,
                        secondPrize2 : data.SecondPrize2,
                        thirdPrize1 : data.ThirdPrize1,
                        thirdPrize2 : data.ThirdPrize2,
                        thirdPrize3 : data.ThirdPrize3,
                        resultsConsolation1 : data.ResultsConsolation1,
                        resultsConsolation2 : data.ResultsConsolation2,
                        firstTotalWinners : data.FirstTotalWinners,
                        secondTotalWinners : data.SecondTotalWinners,
                        thirdTotalWinners : data.ThirdTotalWinners,
                        consolationTotalWinners1 : data.ConsolationTotalWinners1,
                        consolationTotalWinners2 : data.ConsolationTotalWinners2,
                        win1StAmount : data.Win1StAmount,
                        win2StAmount : data.Win2StAmount,
                        win3StAmount : data.Win3StAmount,
                        winConsolation1Amount : data.WinConsolation1Amount,
                        winConsolation2Amount : data.WinConsolation2Amount
                    });
                    await model.save();
                    kqResult.max4D = model;
                }
                if(obj.Power655 != null){
                    var data = obj.Power655;
                    var model = new Power655({
                        dayPrize : data.DayPrize.split('T')[0],
                        dayPrizeNext : data.DayPrizeNext.split('T')[0],
                        number1 : data.Number1,
                        number2 : data.Number2,
                        number3 : data.Number3,
                        number4 : data.Number4,
                        number5 : data.Number5,
                        number6 : data.Number6,
                        number7 : data.Number7,
                        jackpot1 : data.Jackpot1,
                        jackpot2 : data.Jackpot2,
                        match3 : data.Match3,
                        match4 : data.Match4,
                        match5 : data.Match5,
                        jackpotWinner : data.JackpotWinner,
                        jackpot2Winner : data.Jackpot2Winner,
                        match3Winner : data.Match3Winner,
                        match4Winner : data.Match4Winner,
                        match5Winner : data.Match5Winner,
                        listNumber : data.ListNumber,
                        cumulate : data.Cumulate
                    });
                    await model.save();
                    kqResult.power655 = model;
                }
                if(obj.Mega645 != null){
                    var data = obj.Mega645;
                    var model = new Mega645({
                        dayPrize : data.DayPrize.split('T')[0],
                        dayPrizeNext : data.DayPrizeNext.split('T')[0],
                        number1 : data.Number1,
                        number2 : data.Number2,
                        number3 : data.Number3,
                        number4 : data.Number4,
                        number5 : data.Number5,
                        number6 : data.Number6,
                        number7 : data.Number7,
                        jackpot : data.Jackpot,
                        match3 : data.Match3,
                        match4 : data.Match4,
                        match5 : data.Match5,
                        jackpotWinner : data.JackpotWinner,
                        match3Winner : data.Match3Winner,
                        match4Winner : data.Match4Winner,
                        match5Winner : data.Match5Winner,
                    })
                    await model.save();
                    kqResult.mega645 = model;
                }
                return resolve(kqResult);
            })
        })
    })

}

router.get("/getKQXSVietLott/dateMega/:dateMega/datePower/:datePower", async function(req, res){
    var kqResult = {
        mega645: {},
        power655: {},
        max4D: {},
    };
    var datePower =  req.params.datePower;
    var dateMega = req.params.dateMega;
    var mega = Mega645.findOne({"dayPrize" : dateMega}).exec();
    var power = Power655.findOne({"dayPrize": datePower}).exec();
    var max4d = Max4D.findOne({"dayPrize": datePower}).exec();
    if(mega.length != 0){
        kqResult.mega645 = mega;
    }
    else{
        var megaModel = await getKQVietlott(dateMega).mega645;
        if(megaModel != null){
            kqResult.mega645 = megaModel;
        }
    }
    if(power.length != 0 && max4d.length != 0){
        kqResult.power655 = power;
        kqResult.mega645 = mega;
    }else{
        var modelPower655 = await getKQVietlott(datePower).power655;
        var modelMax4d = await getKQVietlott(datePower).max4d;
        if(modelPower655 != null){
            kqResult.power655 = modelPower655;
        }
        if(modelMax4d != null){
            kqResult.max4D = modelMax4d;
        }
        
    }
    var data = {
        isSuccessed : false,
        resultObj : [],
    }
    if(kqResult.max4D == null && kqResult.power655 == null && kqResult.mega645 == null){
        res.status(500).send(data);
    }else{
        data = {
            isSuccessed : true,
            resultObj : kqResult,
            message : "",
        }
        res.status(200).send(data);
    }
})

module.exports = router;