var request = require('request');
var cheerio = require("cheerio");
const { dashLogger } = require('../logger');
const TriangularLotteryPrediction = require('../models/triangularLotteryPrediction');
const PairLotteryPrediction = require('../models/pairLotteryPrediction');
const LotteryPredictionsForStraightCombinations = require('../models/lotteryPredictionsForStraightCombinations');
const PredictReverseLotteryNumber = require('../models/predictReverseLotteryNumber');
const CheckTheLotteryTwice = require('../models/checkTheLotteryTwice');
const LotterySlipPrediction = require('../models/lotterySlipPrediction');
const PredictSpecialPrizes = require('../models/predictSpecialPrizes');
const CheckBridgeHistory = require('../models/checkBridgeHistory');

//Soi cầu lô tam giác
async function crawlDataTriangularLotteryPrediction(params, res) {
    const options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/soi-cau-lo-tam-giac.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/soi-cau-lo-tam-giac.html',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        },
        form: {
            'form_block_id': '50102',
            'todate': params.todate,
            'level': params.level,
            'days': params.days,
            'type': params.type,
            'sbtTinh': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table = data.find(".table").eq(0).find("tr");

            const data_table = [];
            for (let i = 0; i < table.length; i++) {
                const content_table = [];
                const table_td = table.eq(i).find("td");
                for (let j = 0; j < table_td.length; j++) {
                    const data_item = {
                        data_item: table_td.eq(j).text()
                    }
                    content_table.push(data_item);
                }
                data_table.push(content_table);
            }

            let triangularLotteryPrediction = new TriangularLotteryPrediction();
            triangularLotteryPrediction.todate = params.todate;
            triangularLotteryPrediction.level = params.level;
            triangularLotteryPrediction.days = params.days;
            triangularLotteryPrediction.type = params.type;
            triangularLotteryPrediction.data_table = data_table;

            triangularLotteryPrediction.save((err, newTriangularLotteryPrediction) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newTriangularLotteryPrediction);
                }
            });
        }
    })
}
exports.crawlDataTriangularLotteryPrediction = crawlDataTriangularLotteryPrediction;
//Soi cầu lô cặp
async function crawlDataPairLotteryPrediction(params, res) {
    const options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/soi-cau-lo-cap.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/soi-cau-lo-cap.html',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        },
        form: {
            'form_block_id': '50103',
            'top_day': params.top_day,
            'number': params.number,
            'sbtsubmit': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table = data.find(".table").eq(0).find("tr");
            const data_table = [];
            for (let i = 0; i < table.length; i++) {
                const content_table = [];
                const table_td = table.eq(i).find("td");
                for (let j = 0; j < table_td.length; j++) {
                    const data_item = {
                        data_item: table_td.eq(j).text()
                    }
                    content_table.push(data_item);
                }
                data_table.push(content_table);
            }

            const list_number_one = data.find(".khungnd").children("div").eq(3);

            const list_number_one_title = list_number_one.find("div").eq(0).find("b").eq(0).text();
            const list_number_one_data = list_number_one.find("div").eq(1).find("div");
            let list_data_one = [];
            for (let i = 0; i < list_number_one_data.length; i++) {
                let item_data_one = {
                    location: list_number_one_data.eq(i).find("a").eq(0).text(),
                    number: list_number_one_data.eq(i).find("b").eq(0).text()
                }
                list_data_one.push(item_data_one);
            }
            let list_old_bridge_one = {
                title: list_number_one_title,
                data: list_data_one
            }

            const list_number_tow = data.find(".khungnd").children("div").eq(5);
            const list_number_tow_title = list_number_tow.find("div").eq(0).find("b").eq(0).text();
            const list_number_tow_data = list_number_tow.find("div").eq(1).find("div");
            let list_data_tow = [];
            for (let i = 0; i < list_number_tow_data.length; i++) {
                let item_data_tow = {
                    location: list_number_tow_data.eq(i).find("a").eq(0).text(),
                    number: list_number_tow_data.eq(i).find("b").eq(0).text()
                }
                list_data_tow.push(item_data_tow);
            }
            let list_old_bridge_tow = {
                title: list_number_tow_title,
                data: list_data_tow
            }

            const list_number_three = data.find(".khungnd").children("div").eq(7);
            const list_number_three_title = list_number_three.find("div").eq(0).find("b").eq(0).text();
            const list_number_three_data = list_number_three.find("div").eq(1).find("div");
            let list_data_three = [];
            for (let i = 0; i < list_number_three_data.length; i++) {
                let item_data_three = {
                    location: list_number_three_data.eq(i).find("font").eq(0).text(),
                    number: list_number_three_data.eq(i).find("b").eq(0).text()
                }
                list_data_three.push(item_data_three);
            }
            let list_old_bridge_three = {
                title: list_number_three_title,
                data: list_data_three
            }

            let pairLotteryPrediction = new PairLotteryPrediction();
            pairLotteryPrediction.top_day = params.top_day;
            pairLotteryPrediction.number = params.number;
            pairLotteryPrediction.data_table = data_table;
            pairLotteryPrediction.list_old_bridge_one = list_old_bridge_one;
            pairLotteryPrediction.list_old_bridge_tow = list_old_bridge_tow;
            pairLotteryPrediction.list_old_bridge_three = list_old_bridge_three;

            pairLotteryPrediction.save((err, newPairLotteryPrediction) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newPairLotteryPrediction);
                }
            });
        }
    })
}
exports.crawlDataPairLotteryPrediction = crawlDataPairLotteryPrediction;
//Soi cầu lô Bạch thủ ghép xuôi
async function crawlDataLotteryPredictionsForStraightCombinations(params, res) {
    var options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/soi-cau-bach-thu-ghep-xuoi.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/soi-cau-bach-thu-ghep-xuoi.html',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        },
        form: {
            'form_block_id': '50105',
            'top_day': params.top_day,
            'number': params.number,
            'sbtsubmit': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table = data.find(".table").eq(0).find("tr");
            const data_table = [];
            for (let i = 0; i < table.length; i++) {
                const content_table = [];
                const table_td = table.eq(i).find("td");
                for (let j = 0; j < table_td.length; j++) {
                    const data_item = {
                        data_item: table_td.eq(j).text()
                    }
                    content_table.push(data_item);
                }
                data_table.push(content_table);
            }

            const list_number_one = data.find(".khungnd").children("div").eq(3);

            const list_number_one_title = list_number_one.find("div").eq(0).find("b").eq(0).text();
            const list_number_one_data = list_number_one.find("div").eq(1).find("div");
            let list_data_one = [];
            for (let i = 0; i < list_number_one_data.length; i++) {
                let item_data_one = {
                    location: list_number_one_data.eq(i).find("a").eq(0).text(),
                    number: list_number_one_data.eq(i).find("b").eq(0).text()
                }
                list_data_one.push(item_data_one);
            }
            let list_old_bridge_one = {
                title: list_number_one_title,
                data: list_data_one
            }

            const list_number_tow = data.find(".khungnd").children("div").eq(5);
            const list_number_tow_title = list_number_tow.find("div").eq(0).find("b").eq(0).text();
            const list_number_tow_data = list_number_tow.find("div").eq(1).find("div");
            let list_data_tow = [];
            for (let i = 0; i < list_number_tow_data.length; i++) {
                let item_data_tow = {
                    location: list_number_tow_data.eq(i).find("a").eq(0).text(),
                    number: list_number_tow_data.eq(i).find("b").eq(0).text()
                }
                list_data_tow.push(item_data_tow);
            }
            let list_old_bridge_tow = {
                title: list_number_tow_title,
                data: list_data_tow
            }

            const list_number_three = data.find(".khungnd").children("div").eq(7);
            const list_number_three_title = list_number_three.find("div").eq(0).find("b").eq(0).text();
            const list_number_three_data = list_number_three.find("div").eq(1).find("div");
            let list_data_three = [];
            for (let i = 0; i < list_number_three_data.length; i++) {
                let item_data_three = {
                    location: list_number_three_data.eq(i).find("font").eq(0).text(),
                    number: list_number_three_data.eq(i).find("b").eq(0).text()
                }
                list_data_three.push(item_data_three);
            }
            let list_old_bridge_three = {
                title: list_number_three_title,
                data: list_data_three
            }

            let lotteryPredictionsForStraightCombinations = new LotteryPredictionsForStraightCombinations();
            lotteryPredictionsForStraightCombinations.top_day = params.top_day;
            lotteryPredictionsForStraightCombinations.number = params.number;
            lotteryPredictionsForStraightCombinations.data_table = data_table;
            lotteryPredictionsForStraightCombinations.list_old_bridge_one = list_old_bridge_one;
            lotteryPredictionsForStraightCombinations.list_old_bridge_tow = list_old_bridge_tow;
            lotteryPredictionsForStraightCombinations.list_old_bridge_three = list_old_bridge_three;

            lotteryPredictionsForStraightCombinations.save((err, newLotteryPredictionsForStraightCombinations) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newLotteryPredictionsForStraightCombinations);
                }
            });
        }
    })
}
exports.crawlDataLotteryPredictionsForStraightCombinations = crawlDataLotteryPredictionsForStraightCombinations;
//Soi cầu lô bạch thủ ghép ngược
async function crawlDataPredictReverseLotteryNumbers(params, res) {
    var options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/soi-cau-bach-thu-ghep-nguoc.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/soi-cau-bach-thu-ghep-nguoc.html',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        },
        form: {
            'form_block_id': '50106',
            'top_day': params.top_day,
            'number': params.number,
            'sbtsubmit': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table = data.find(".table").eq(0).find("tr");
            const data_table = [];
            for (let i = 0; i < table.length; i++) {
                const content_table = [];
                const table_td = table.eq(i).find("td");
                for (let j = 0; j < table_td.length; j++) {
                    const data_item = {
                        data_item: table_td.eq(j).text()
                    }
                    content_table.push(data_item);
                }
                data_table.push(content_table);
            }

            const list_number_one = data.find(".khungnd").children("div").eq(3);

            const list_number_one_title = list_number_one.find("div").eq(0).find("b").eq(0).text();
            const list_number_one_data = list_number_one.find("div").eq(1).find("div");
            let list_data_one = [];
            for (let i = 0; i < list_number_one_data.length; i++) {
                let item_data_one = {
                    location: list_number_one_data.eq(i).find("a").eq(0).text(),
                    number: list_number_one_data.eq(i).find("b").eq(0).text()
                }
                list_data_one.push(item_data_one);
            }
            let list_old_bridge_one = {
                title: list_number_one_title,
                data: list_data_one
            }

            const list_number_tow = data.find(".khungnd").children("div").eq(5);
            const list_number_tow_title = list_number_tow.find("div").eq(0).find("b").eq(0).text();
            const list_number_tow_data = list_number_tow.find("div").eq(1).find("div");
            let list_data_tow = [];
            for (let i = 0; i < list_number_tow_data.length; i++) {
                let item_data_tow = {
                    location: list_number_tow_data.eq(i).find("a").eq(0).text(),
                    number: list_number_tow_data.eq(i).find("b").eq(0).text()
                }
                list_data_tow.push(item_data_tow);
            }
            let list_old_bridge_tow = {
                title: list_number_tow_title,
                data: list_data_tow
            }

            const list_number_three = data.find(".khungnd").children("div").eq(7);
            const list_number_three_title = list_number_three.find("div").eq(0).find("b").eq(0).text();
            const list_number_three_data = list_number_three.find("div").eq(1).find("div");
            let list_data_three = [];
            for (let i = 0; i < list_number_three_data.length; i++) {
                let item_data_three = {
                    location: list_number_three_data.eq(i).find("font").eq(0).text(),
                    number: list_number_three_data.eq(i).find("b").eq(0).text()
                }
                list_data_three.push(item_data_three);
            }
            let list_old_bridge_three = {
                title: list_number_three_title,
                data: list_data_three
            }

            let predictReverseLotteryNumber = new PredictReverseLotteryNumber();
            predictReverseLotteryNumber.top_day = params.top_day;
            predictReverseLotteryNumber.number = params.number;
            predictReverseLotteryNumber.data_table = data_table;
            predictReverseLotteryNumber.list_old_bridge_one = list_old_bridge_one;
            predictReverseLotteryNumber.list_old_bridge_tow = list_old_bridge_tow;
            predictReverseLotteryNumber.list_old_bridge_three = list_old_bridge_three;

            predictReverseLotteryNumber.save((err, newPredictReverseLotteryNumber) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newPredictReverseLotteryNumber);
                }
            });
        }
    })
}
exports.crawlDataPredictReverseLotteryNumbers = crawlDataPredictReverseLotteryNumbers;
//Soi cầu lô hai nháy
async function crawlDataCheckTheLotteryTwice(params, res) {
    var options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/soi-cau-lo-hai-nhay.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/soi-cau-lo-hai-nhay.html',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        },
        form: {
            'form_block_id': '50107',
            'top_day': params.top_day,
            'number': params.number,
            'sbtsubmit': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table = data.find(".table").eq(0).find("tr");
            const data_table = [];
            for (let i = 0; i < table.length; i++) {
                const content_table = [];
                const table_td = table.eq(i).find("td");
                for (let j = 0; j < table_td.length; j++) {
                    const data_item = {
                        data_item: table_td.eq(j).text()
                    }
                    content_table.push(data_item);
                }
                data_table.push(content_table);
            }

            const list_number_one = data.find(".khungnd").children("div").eq(3);

            const list_number_one_title = list_number_one.find("div").eq(0).find("b").eq(0).text();
            const list_number_one_data = list_number_one.find("div").eq(1).find("div");
            let list_data_one = [];
            for (let i = 0; i < list_number_one_data.length; i++) {
                let item_data_one = {
                    location: list_number_one_data.eq(i).find("a").eq(0).text(),
                    number: list_number_one_data.eq(i).find("b").eq(0).text()
                }
                list_data_one.push(item_data_one);
            }
            let list_old_bridge_one = {
                title: list_number_one_title,
                data: list_data_one
            }

            const list_number_tow = data.find(".khungnd").children("div").eq(5);
            const list_number_tow_title = list_number_tow.find("div").eq(0).find("b").eq(0).text();
            const list_number_tow_data = list_number_tow.find("div").eq(1).find("div");
            let list_data_tow = [];
            for (let i = 0; i < list_number_tow_data.length; i++) {
                let item_data_tow = {
                    location: list_number_tow_data.eq(i).find("a").eq(0).text(),
                    number: list_number_tow_data.eq(i).find("b").eq(0).text()
                }
                list_data_tow.push(item_data_tow);
            }
            let list_old_bridge_tow = {
                title: list_number_tow_title,
                data: list_data_tow
            }

            const list_number_three = data.find(".khungnd").children("div").eq(7);
            const list_number_three_title = list_number_three.find("div").eq(0).find("b").eq(0).text();
            const list_number_three_data = list_number_three.find("div").eq(1).find("div");
            let list_data_three = [];
            for (let i = 0; i < list_number_three_data.length; i++) {
                let item_data_three = {
                    location: list_number_three_data.eq(i).find("font").eq(0).text(),
                    number: list_number_three_data.eq(i).find("b").eq(0).text()
                }
                list_data_three.push(item_data_three);
            }
            let list_old_bridge_three = {
                title: list_number_three_title,
                data: list_data_three
            }

            let checkTheLotteryTwice = new CheckTheLotteryTwice();
            checkTheLotteryTwice.top_day = params.top_day;
            checkTheLotteryTwice.number = params.number;
            checkTheLotteryTwice.data_table = data_table;
            checkTheLotteryTwice.list_old_bridge_one = list_old_bridge_one;
            checkTheLotteryTwice.list_old_bridge_tow = list_old_bridge_tow;
            checkTheLotteryTwice.list_old_bridge_three = list_old_bridge_three;

            checkTheLotteryTwice.save((err, newCheckTheLotteryTwice) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newCheckTheLotteryTwice);
                }
            });
        }
    })
}
exports.crawlDataCheckTheLotteryTwice = crawlDataCheckTheLotteryTwice;
//Soi cầu giải đặc biệt
async function crawlDataLotterySlipPrediction(params, res) {
    var options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/soi-cau-giai-dac-biet.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/soi-cau-giai-dac-biet.html',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        },
        form: {
            'form_block_id': '50108',
            'top_day': params.top_day,
            'number': params.number,
            'kieu_soi': params.kieu_soi,
            'sbtsubmit': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table = data.find(".table").eq(0).find("tr");
            const data_table = [];
            for (let i = 0; i < table.length; i++) {
                const content_table = [];
                const table_td = table.eq(i).find("td");
                for (let j = 0; j < table_td.length; j++) {
                    const data_item = {
                        data_item: table_td.eq(j).text()
                    }
                    content_table.push(data_item);
                }
                data_table.push(content_table);
            }

            const list_number_one = data.find(".khungnd").children("div").eq(2);

            const list_number_one_title = list_number_one.find("div").eq(0).find("b").eq(0).text();
            const list_number_one_data = list_number_one.find("div").eq(1).find("div");
            let list_data_one = [];
            for (let i = 0; i < list_number_one_data.length; i++) {
                let item_data_one = {
                    location: list_number_one_data.eq(i).find("a").eq(0).text(),
                    number: list_number_one_data.eq(i).find("b").eq(0).text()
                }
                list_data_one.push(item_data_one);
            }
            let list_old_bridge_one = {
                title: list_number_one_title,
                data: list_data_one
            }

            const list_number_tow = data.find(".khungnd").children("div").eq(5);
            const list_number_tow_title = list_number_tow.find("div").eq(0).find("b").eq(0).text();
            const list_number_tow_data = list_number_tow.find("div").eq(1).find("div");
            let list_data_tow = [];
            for (let i = 0; i < list_number_tow_data.length; i++) {
                let item_data_tow = {
                    location: list_number_tow_data.eq(i).find("a").eq(0).text(),
                    number: list_number_tow_data.eq(i).find("b").eq(0).text()
                }
                list_data_tow.push(item_data_tow);
            }
            let list_old_bridge_tow = {
                title: list_number_tow_title,
                data: list_data_tow
            }

            const list_number_three = data.find(".khungnd").children("div").eq(7);
            const list_number_three_title = list_number_three.find("div").eq(0).find("b").eq(0).text();
            const list_number_three_data = list_number_three.find("div").eq(1).find("div");
            let list_data_three = [];
            for (let i = 0; i < list_number_three_data.length; i++) {
                let item_data_three = {
                    location: list_number_three_data.eq(i).find("font").eq(0).text(),
                    number: list_number_three_data.eq(i).find("b").eq(0).text()
                }
                list_data_three.push(item_data_three);
            }
            let list_old_bridge_three = {
                title: list_number_three_title,
                data: list_data_three
            }

            let lotterySlipPrediction = new LotterySlipPrediction();
            lotterySlipPrediction.top_day = params.top_day;
            lotterySlipPrediction.number = params.number;
            lotterySlipPrediction.kieu_soi = params.kieu_soi;
            lotterySlipPrediction.data_table = data_table;
            lotterySlipPrediction.list_old_bridge_one = list_old_bridge_one;
            lotterySlipPrediction.list_old_bridge_tow = list_old_bridge_tow;
            lotterySlipPrediction.list_old_bridge_three = list_old_bridge_three;

            lotterySlipPrediction.save((err, newLotterySlipPrediction) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newLotterySlipPrediction);
                }
            });
        }
    })
}
exports.crawlDataLotterySlipPrediction = crawlDataLotterySlipPrediction;
//Soi cầu lô trượt
async function crawlDataPredictSpecialPrizes(params, res) {
    const options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/soi-cau-lo-truot.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/soi-cau-lo-truot.html',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        },
        form: {
            'form_block_id': '50109',
            'top_day': params.top_day,
            'number': params.number,
            'kieu_soi': params.kieu_soi,
            'sbtsubmit': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table = data.find(".table").eq(0).find("tr");
            const data_table = [];
            for (let i = 0; i < table.length; i++) {
                const content_table = [];
                const table_td = table.eq(i).find("td");
                for (let j = 0; j < table_td.length; j++) {
                    const data_item = {
                        data_item: table_td.eq(j).text()
                    }
                    content_table.push(data_item);
                }
                data_table.push(content_table);
            }

            const list_number_one = data.find(".khungnd").children("div").eq(2);

            const list_number_one_title = list_number_one.find("div").eq(0).find("b").eq(0).text();
            const list_number_one_data = list_number_one.find("div").eq(1).find("div");
            let list_data_one = [];
            for (let i = 0; i < list_number_one_data.length; i++) {
                let item_data_one = {
                    location: list_number_one_data.eq(i).find("a").eq(0).text(),
                    number: list_number_one_data.eq(i).find("b").eq(0).text()
                }
                list_data_one.push(item_data_one);
            }
            let list_old_bridge_one = {
                title: list_number_one_title,
                data: list_data_one
            }

            const list_number_tow = data.find(".khungnd").children("div").eq(5);
            const list_number_tow_title = list_number_tow.find("div").eq(0).find("b").eq(0).text();
            const list_number_tow_data = list_number_tow.find("div").eq(1).find("div");
            let list_data_tow = [];
            for (let i = 0; i < list_number_tow_data.length; i++) {
                let item_data_tow = {
                    location: list_number_tow_data.eq(i).find("a").eq(0).text(),
                    number: list_number_tow_data.eq(i).find("b").eq(0).text()
                }
                list_data_tow.push(item_data_tow);
            }
            let list_old_bridge_tow = {
                title: list_number_tow_title,
                data: list_data_tow
            }

            const list_number_three = data.find(".khungnd").children("div").eq(7);
            const list_number_three_title = list_number_three.find("div").eq(0).find("b").eq(0).text();
            const list_number_three_data = list_number_three.find("div").eq(1).find("div");
            let list_data_three = [];
            for (let i = 0; i < list_number_three_data.length; i++) {
                let item_data_three = {
                    location: list_number_three_data.eq(i).find("font").eq(0).text(),
                    number: list_number_three_data.eq(i).find("b").eq(0).text()
                }
                list_data_three.push(item_data_three);
            }
            let list_old_bridge_three = {
                title: list_number_three_title,
                data: list_data_three
            }

            let predictSpecialPrizes = new PredictSpecialPrizes();
            predictSpecialPrizes.top_day = params.top_day;
            predictSpecialPrizes.number = params.number;
            predictSpecialPrizes.kieu_soi = params.kieu_soi;
            predictSpecialPrizes.data_table = data_table;
            predictSpecialPrizes.list_old_bridge_one = list_old_bridge_one;
            predictSpecialPrizes.list_old_bridge_tow = list_old_bridge_tow;
            predictSpecialPrizes.list_old_bridge_three = list_old_bridge_three;

            predictSpecialPrizes.save((err, newPredictSpecialPrizes) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newPredictSpecialPrizes);
                }
            });
        }
    })
}
exports.crawlDataPredictSpecialPrizes = crawlDataPredictSpecialPrizes;
//Kiểm tra lịch sử cầu lô
async function crawlDataCheckBridgeHistory(params, res) {
    const options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/kiem-tra-lich-su-cau-lo.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/kiem-tra-lich-su-cau-lo.html',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        },
        form: {
            'form_block_id': '50110',
            'index_i': params.index_i,
            'index_j': params.index_j,
            'sbtsubmit': 'Thống kê lịch sử cầu'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            
            const data_hitory = data.find(".khungnd").children("div");

            const location_one = data_hitory.eq(0).find("font").eq(0).text();
            const location_tow = data_hitory.eq(0).find("font").eq(1).text();

            const list_number = data_hitory.eq(1).find("div");
            const data_list_number = [];
            for (let i = 0; i < list_number.length; i++) {
                const item_list_number = {
                    date: list_number.eq(i).find("font").eq(0).text(),
                    number: list_number.eq(i).find("font").eq(1).text()
                }
                data_list_number.push(item_list_number);
            }

            const location_total = data_hitory.eq(2).find("font").eq(0).text();

            const list_hitory = data_hitory.eq(4).text().replaceAll("Xem cầu", "").split("=================================================");

            let checkBridgeHistory = new CheckBridgeHistory();
            checkBridgeHistory.index_i = params.index_i;
            checkBridgeHistory.index_j = params.index_j;
            checkBridgeHistory.location_one = location_one;
            checkBridgeHistory.location_tow = location_tow;
            checkBridgeHistory.data_list_number = data_list_number;
            checkBridgeHistory.location_total = location_total;
            checkBridgeHistory.list_hitory = list_hitory;

            checkBridgeHistory.save((err, newCheckBridgeHistory) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newCheckBridgeHistory);
                }
            });
        }
    })
}
exports.crawlDataCheckBridgeHistory = crawlDataCheckBridgeHistory;

