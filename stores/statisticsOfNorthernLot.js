var request = require('request');
var cheerio = require("cheerio");

const HeadAndEndLotteryStatistic = require("../models/headAndEndLotteryStatistic");
const StatisticsOfLotteryRhythmFrequency = require("../models/statisticsOfLotteryRhythmFrequency");
const NorthernLotteryStatistic = require("../models/northernLotteryStatistic");
const StatisticsOnSiblingPairs = require("../models/statisticsOnSiblingPairs");
const FrequencyOfOccurrenceOfTwoNumber = require("../models/frequencyOfOccurrenceOfTwoNumber");
const LotDetailCycle = require("../models/lotDetailCycle");
const LotteryStatistic = require("../models/lotteryStatistic");
const StatisticsOfBatchBeatFrequency = require("../models/statisticsOfBatchBeatFrequency");
const CellularLotoFrequencyStatistics = require("../models/cellularLotoFrequencyStatistics");
const GridStyleLotoFrequencyStatistic = require("../models/gridStyleLotoFrequencyStatistic");

const { dashLogger } = require('../logger');
const { log } = require('winston');

//Thống kê đầu đuôi lotto
async function crawlDataHeadAndEndLotteryStatistics(date, res) {
    const options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/thong_ke_dau_duoi.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/thong_ke_dau_duoi.html',
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
            'form_block_id': '50120',
            'date_end': date,
            'sbtFind': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table = data.find(".table");

            //1. Thống kê đầu loto
            let table_first = table.eq(0).find("tr");

            let table_data_first = [];
            for (let i = 0; i < table_first.length; i++) {
                //lưu header
                if (i == 0) {
                    const header_first = table_first.eq(i).find("th");
                    const header = [];
                    for (let j = 0; j < header_first.length; j++) {
                        const header_item = {
                            "header": header_first.eq(j).text()
                        }
                        header.push(header_item)
                    }
                    table_data_first.push(header);
                }
                //tổng
                else if (i == (table_first.length - 1)) {
                    const data_total = table_first.eq(i).find("th");
                    const total = [];
                    for (let j = 0; j < data_total.length; j++) {
                        const total_item = {
                            "header": data_total.eq(j).text()
                        }
                        total.push(total_item)
                    }
                    table_data_first.push(total);
                }
                //data table
                else {
                    const data_first = table_first.eq(i).find("td");
                    const data = [];
                    for (let j = 0; j < data_first.length; j++) {
                        const data_item = {
                            "data_item": data_first.eq(j).text()
                        }
                        data.push(data_item)
                    }
                    table_data_first.push(data);
                }
            }

            //1. Thống kê đuôi loto
            let table_last = table.eq(1).find("tr");

            let table_data_last = [];
            for (let i = 0; i < table_last.length; i++) {
                //lưu header
                if (i == 0) {
                    const header_last = table_last.eq(i).find("th");
                    const header = [];
                    for (let j = 0; j < header_last.length; j++) {
                        const header_item = {
                            "header": header_last.eq(j).text()
                        }
                        header.push(header_item)
                    }
                    table_data_last.push(header);
                }
                //tổng
                else if (i == (table_last.length - 1)) {
                    const data_total = table_last.eq(i).find("th");
                    const total = [];
                    for (let j = 0; j < data_total.length; j++) {
                        const total_item = {
                            "header": data_total.eq(j).text()
                        }
                        total.push(total_item)
                    }
                    table_data_last.push(total);
                }
                //data table
                else {
                    const data_last = table_last.eq(i).find("td");
                    const data = [];
                    for (let j = 0; j < data_last.length; j++) {
                        const data_item = {
                            "data_item": data_last.eq(j).text()
                        }
                        data.push(data_item)
                    }
                    table_data_last.push(data);
                }
            }

            let headAndEndLotteryStatistic = new HeadAndEndLotteryStatistic();
            headAndEndLotteryStatistic.date = date;
            headAndEndLotteryStatistic.table_data_first = table_data_first;
            headAndEndLotteryStatistic.table_data_last = table_data_last;

            headAndEndLotteryStatistic.save((err, newHeadAndEndLotteryStatistic) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newHeadAndEndLotteryStatistic);
                }
            });
        }
    })
}
exports.crawlDataHeadAndEndLotteryStatistics = crawlDataHeadAndEndLotteryStatistics;
//Thống kê tần suất lotto theo cặp
async function crawlDataStatisticsOfLotteryRhythmFrequency(date, res) {
    const options = {
        'method': 'GET',
        'url': 'https://www.xoso88.info/thong-ke-tan-suat-loto.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'referer': 'https://www.xoso88.info/thong-ke-tan-suat-loto.html',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table = data.find("table");
            let data_table = table.eq(0).find("tr");

            //get data table
            const header_data = [];
            const content_data = [];
            for (let i = 0; i < data_table.length; i++) {
                //lưu header
                if (i == 0) {
                    const header = data_table.eq(i).find("th");

                    for (let j = 0; j < header.length; j++) {
                        const header_item = {
                            "header": header.eq(j).text()
                        }
                        header_data.push(header_item)
                    }
                }
                //data table
                else {
                    const content_table = data_table.eq(i).find("td");
                    const content_item = [];
                    for (let j = 0; j < content_table.length; j++) {
                        const data_item = {
                            "data_item": content_table.eq(j).text()
                        }
                        content_item.push(data_item)
                    }
                    content_data.push(content_item);
                }

            }
            let statisticsOfLotteryRhythmFrequency = new StatisticsOfLotteryRhythmFrequency();
            statisticsOfLotteryRhythmFrequency.date = date;
            statisticsOfLotteryRhythmFrequency.header = header_data;
            statisticsOfLotteryRhythmFrequency.table_data = content_data;

            statisticsOfLotteryRhythmFrequency.save((err, newStatisticsOfLotteryRhythmFrequency) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newStatisticsOfLotteryRhythmFrequency);
                }
            });
        }
    })
}
exports.crawlDataStatisticsOfLotteryRhythmFrequency = crawlDataStatisticsOfLotteryRhythmFrequency;
//Thống kê lotto theo thứ
async function crawlDataNorthernLotteryStatistics(params, res) {
    const options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/thong-ke-lotto-theo-thu.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/thong-ke-lotto-theo-thu.html',
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
            'form_block_id': '50111',
            'day_from': params.day_from,//'01/10/2023'
            'day_to': params.day_to,//'5/11/2023'
            'number': params.number,//'1'
            'week_day': params.number,//'1'
            'sbtsubmit': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $("#thongkelototheothu_table").eq(0);

            let data_thead = data.eq(0).find("thead").eq(0).find("tr").eq(0).find("th");
            let data_body = data.eq(0).find("tbody").eq(0).find("tr");

            //get data table
            const header_data = [];
            const content_data = [];
            //lưu header
            for (let j = 0; j < data_thead.length; j++) {
                const header_item = {
                    "header": data_thead.eq(j).text()
                }
                header_data.push(header_item)
            }
            //data table
            for (let i = 0; i < data_body.length; i++) {
                const content_table = data_body.eq(i).find("td");
                const content_item = [];
                for (let j = 0; j < content_table.length; j++) {
                    const data_item = {
                        "data_item": content_table.eq(j).text()
                    }
                    content_item.push(data_item)
                }
                content_data.push(content_item);
            }

            let northernLotteryStatistic = new NorthernLotteryStatistic();
            northernLotteryStatistic.day_from = params.day_from;
            northernLotteryStatistic.day_to = params.day_to;
            northernLotteryStatistic.number = params.number;
            northernLotteryStatistic.week_day = params.week_day;
            northernLotteryStatistic.header = header_data;
            northernLotteryStatistic.table_data = content_data;

            northernLotteryStatistic.save((err, newNorthernLotteryStatistic) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newNorthernLotteryStatistic);
                }
            });
        }
    })
}
exports.crawlDataNorthernLotteryStatistics = crawlDataNorthernLotteryStatistics;
//Thống kê cặp số anh em
async function crawlDataStatisticsOnSiblingPairs(params, res) {
    const options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/thong-ke-cap-so-anh-em.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/thong-ke-cap-so-anh-em.html',
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
            'form_block_id': '50112',
            'day_so': params.string_number,
            'day_to': params.date,
            'sbtsubmit': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table_data = data.find("table");
            let title_data = table_data.eq(0).find("tbody").eq(0).find("tr").eq(0).find("font").eq(0).text();

            let content_data = data.find(".khungnd").eq(0).find("div").eq(0).find("div").eq(1).find("div");

            let content = []
            for (let i = 0; i < content_data.length; i++) {
                if (content_data.eq(i).find("div").eq(0).text() && content_data.eq(i).find("div").eq(1).text()) {
                    let const_item = {
                        number: content_data.eq(i).find("div").eq(0).text(),
                        date: content_data.eq(i).find("div").eq(1).text()
                    }
                    content.push(const_item);
                }
            }
            let statisticsOnSiblingPairs = new StatisticsOnSiblingPairs();
            statisticsOnSiblingPairs.date = params.date;
            statisticsOnSiblingPairs.string_number = params.string_number;
            statisticsOnSiblingPairs.title = title_data;
            statisticsOnSiblingPairs.data = content;

            statisticsOnSiblingPairs.save((err, newStatisticsOnSiblingPairs) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newStatisticsOnSiblingPairs);
                }
            });
        }
    })
}
exports.crawlDataStatisticsOnSiblingPairs = crawlDataStatisticsOnSiblingPairs;
//Chu kỳ lô rơi của hai cặp số
async function crawlDataFrequencyOfOccurrenceOfTwoNumbers(params, res) {
    const options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/chu-ky-lo-roi-cua-hai-cap-so.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/chu-ky-lo-roi-cua-hai-cap-so.html',
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
            'form_block_id': '50113',
            'cap_so_1': params.number_one,
            'cap_so_2': params.number_tow,
            'day_from': params.day_from,
            'day_to': params.day_to,
            'sbtsubmit': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let pair_of_number = data.find(".khungnd").eq(0).find("div").eq(0).find("div").eq(0).find("font").eq(0).text();
            let times = data.find(".khungnd").eq(0).find("div").eq(0).find("div").eq(0).find("font").eq(1).text();
            let data_date = data.find("#ngay_list_together").eq(0).text();

            let content_one = data.find(".khungnd").eq(0).find("div").eq(5).find("div").eq(0).text();
            let content_tow = data.find(".khungnd").eq(0).find("div").eq(5).find("div").eq(1).text();
            let content_three = data.find(".khungnd").eq(0).find("div").eq(5).find("div").eq(2).text();
            let content_four = data.find(".khungnd").eq(0).find("div").eq(5).find("div").eq(3).text();

            let frequencyOfOccurrenceOfTwoNumber = new FrequencyOfOccurrenceOfTwoNumber();
            frequencyOfOccurrenceOfTwoNumber.number_one = params.number_one;
            frequencyOfOccurrenceOfTwoNumber.number_tow = params.number_tow;
            frequencyOfOccurrenceOfTwoNumber.day_from = params.day_from;
            frequencyOfOccurrenceOfTwoNumber.day_to = params.day_to;
            frequencyOfOccurrenceOfTwoNumber.pair_of_number = pair_of_number;
            frequencyOfOccurrenceOfTwoNumber.times = times;
            frequencyOfOccurrenceOfTwoNumber.data_date = data_date;
            frequencyOfOccurrenceOfTwoNumber.content_one = content_one;
            frequencyOfOccurrenceOfTwoNumber.content_tow = content_tow;
            frequencyOfOccurrenceOfTwoNumber.content_three = content_three;
            frequencyOfOccurrenceOfTwoNumber.content_four = content_four;

            frequencyOfOccurrenceOfTwoNumber.save((err, newFrequencyOfOccurrenceOfTwoNumber) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newFrequencyOfOccurrenceOfTwoNumber);
                }
            });
        }
    })
}
exports.crawlDataFrequencyOfOccurrenceOfTwoNumbers = crawlDataFrequencyOfOccurrenceOfTwoNumbers;
//Chu kỳ chi tiết dàn lô
async function crawlDataLotDetailCycle(params, res) {
    const options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/chu-ky-chi-tiet-dan-lo.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/chu-ky-chi-tiet-dan-lo.html',
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
            'form_block_id': '50114',
            'day_so': params.list_number,
            'day_from': params.day_from,
            'day_to': params.day_to,
            'sbtsubmit': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let pair_of_number = data.find(".khungnd").eq(0).find("div").eq(0).find("div").eq(0).find("font").eq(0).text();
            let times = data.find(".khungnd").eq(0).find("div").eq(0).find("div").eq(0).find("font").eq(1).text();
            let data_date = data.find(".khungnd").eq(0).find("div").eq(2).text();

            let content_one = data.find(".khungnd").eq(0).find("div").eq(3).find("div").eq(0).text();
            let content_tow = data.find(".khungnd").eq(0).find("div").eq(3).find("div").eq(1).text();
            let content_three = data.find(".khungnd").eq(0).find("div").eq(3).find("div").eq(2).text();
            let content_four = data.find(".khungnd").eq(0).find("div").eq(3).find("div").eq(3).text();

            let data_LotDetailCycle = data.find(".khungnd").eq(0).find("div").eq(11).find("div").eq(1).find("span");
            let detail_LotDetailCycle = [];
            for (let i = 0; i < data_LotDetailCycle.length; i++) {
                let LotDetailCycle_item = {
                    number: data_LotDetailCycle.eq(i).text()
                }
                detail_LotDetailCycle.push(LotDetailCycle_item);
            }

            let total_list_LotDetailCycle = data.find(".khungnd").eq(0).find("div").eq(15).find("font");

            let total_LotDetailCycle = [];
            for (let i = 0; i < total_list_LotDetailCycle.length; i++) {
                let total_item_LotDetailCycle = {};
                if (i % 2 == 0) {
                    total_item_LotDetailCycle.number_one = total_list_LotDetailCycle.eq(i).text();
                    total_item_LotDetailCycle.number_tow = total_list_LotDetailCycle.eq(i + 1).text();
                    total_LotDetailCycle.push(total_item_LotDetailCycle);
                }
            }

            let lotDetailCycle = new LotDetailCycle();
            lotDetailCycle.list_number = params.list_number;
            lotDetailCycle.day_from = params.day_from;
            lotDetailCycle.day_to = params.day_to;
            lotDetailCycle.pair_of_number = pair_of_number;
            lotDetailCycle.times = times;
            lotDetailCycle.data_date = data_date;
            lotDetailCycle.detail_lotDetailCycle = detail_LotDetailCycle;
            lotDetailCycle.content_one = content_one;
            lotDetailCycle.content_tow = content_tow;
            lotDetailCycle.content_three = content_three;
            lotDetailCycle.content_four = content_four;
            lotDetailCycle.total_lotDetailCycle = total_LotDetailCycle;

            lotDetailCycle.save((err, newLotDetailCycle) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newLotDetailCycle);
                }
            });
        }
    })
}
exports.crawlDataLotDetailCycle = crawlDataLotDetailCycle;
//Thống kê lô gan
async function crawlDataLotteryStatistic(params, res) {
    var options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/thong-ke-loto-gan.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/thong-ke-loto-gan.html',
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
            'form_block_id': '50115',
            'date_start': params.date_start,
            'date_end': params.date_end,
            'biendo': params.amplitude,
            'sbtFind': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table = data.find("table").eq(1).find("table");

            let table_one = table.eq(0).find("td").eq(0).find("font");
            let data_table_one = [];
            for (let i = 0; i < table_one.length; i++) {
                let item_table_one = {}
                if (i % 3 == 0) {
                    item_table_one.number = table_one.eq(i).text();
                    item_table_one.date = table_one.eq(i + 1).text();
                    item_table_one.day = table_one.eq(i + 2).text();
                    data_table_one.push(item_table_one);
                }
            }

            let table_tow = table.eq(1).find("tr");
            let data_table_tow = [];
            for (let i = 0; i < table_tow.length; i++) {
                let item_row_th = table_tow.eq(i).find("th");
                let item_row_td = table_tow.eq(i).find("td");

                let data_table_row = [];
                if (item_row_th.eq(0).text.length > 0) {
                    for (let j = 0; j < item_row_th.length; j++) {
                        let item_table_row = {}
                        item_table_row.data_item = item_row_th.eq(j).text();
                        data_table_row.push(item_table_row);
                    }
                }
                if (item_row_td.eq(0).text.length > 0) {
                    for (let j = 0; j < item_row_td.length; j++) {
                        let item_table_row = {}
                        item_table_row.data_item = item_row_td.eq(j).text();
                        data_table_row.push(item_table_row);
                    }
                }
                data_table_tow.push(data_table_row);
            }

            let lotteryStatistic = new LotteryStatistic();
            lotteryStatistic.date_start = params.date_start;
            lotteryStatistic.date_end = params.date_end;
            lotteryStatistic.amplitude = params.amplitude;
            lotteryStatistic.data_table_one = data_table_one;
            lotteryStatistic.data_table_tow = data_table_tow;

            lotteryStatistic.save((err, newLotteryStatistic) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newLotteryStatistic);
                }
            });
        }
    })
}
exports.crawlDataLotteryStatistic = crawlDataLotteryStatistic;
//Thống kê tần số nhịp lô
async function crawlDataStatisticsOfBatchBeatFrequency(params, res) {
    const options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/thong-ke-tan-so-nhip-lo.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/thong-ke-tan-so-nhip-lo.html',
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
            'form_block_id': '50116',
            'date_start': params.date_start,
            'date_end': params.date_end,
            'number_servey': params.number_server,
            'day_of_week': params.day_of_week,
            'sbtFind': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table = data.find("table").eq(1);

            let data_title = table.find("tr").eq(0);
            let number_data = data_title.find("font").eq(0).text();
            let times_data = data_title.find("font").eq(1).text();

            let data_table = table.find("tr").eq(1).find("table").eq(0).find("tr");


            let header_content = [];
            let data_content = [];

            for (let i = 0; i < data_table.length; i++) {
                if (i == 0) {
                    for (let j = 0; j < data_table.length; j++) {
                        if (data_table.eq(i).find("th").eq(j).text().trim().length > 0) {
                            let item_header_content = {
                                header: data_table.eq(i).find("th").eq(j).text()
                            }
                            header_content.push(item_header_content);
                        }
                    }
                } else {
                    let item_content = data_table.eq(i).find("td");
                    let data_content_td = [];
                    for (let h = 0; h < item_content.length; h++) {
                        let item_data_content = {
                            data_item: data_table.eq(i).find("td").eq(h).text()
                        }
                        data_content_td.push(item_data_content);
                    }
                    data_content.push(data_content_td);
                }
            }

            let statisticsOfBatchBeatFrequency = new StatisticsOfBatchBeatFrequency();
            statisticsOfBatchBeatFrequency.date_start = params.date_start;
            statisticsOfBatchBeatFrequency.date_end = params.date_end;
            statisticsOfBatchBeatFrequency.number_server = params.number_server;
            statisticsOfBatchBeatFrequency.day_of_week = params.day_of_week;
            statisticsOfBatchBeatFrequency.number = number_data;
            statisticsOfBatchBeatFrequency.times_data = times_data;
            statisticsOfBatchBeatFrequency.header_content = header_content;
            statisticsOfBatchBeatFrequency.data_content = data_content;

            statisticsOfBatchBeatFrequency.save((err, newStatisticsOfBatchBeatFrequency) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newStatisticsOfBatchBeatFrequency);
                }
            });
        }
    })
}
exports.crawlDataStatisticsOfBatchBeatFrequency = crawlDataStatisticsOfBatchBeatFrequency;
//Thống kê tần suất lotto kiểu ô
async function crawlDataCellularLotoFrequencyStatistics(params, res) {
    const options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/thong-ke-tan-suat-lotto-kieu-o.html',
        'headers': {
            'authority': 'www.xoso88.info',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=rq7vnn3ton48innideb0td9gv2',
            'origin': 'https://www.xoso88.info',
            'referer': 'https://www.xoso88.info/thong-ke-tan-suat-lotto-kieu-o.html',
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
            'form_block_id': '50118',
            'day_from': params.day_from,
            'day_to': params.day_to,
            'kieu_soi': params.kieu_soi,
            'tp': params.tp,
            'bs[]': '0',
            'bs[]': '1',
            'bs[]': '2',
            'bs[]': '3',
            'bs[]': '4',
            'bs[]': '5',
            'bs[]': '6',
            'bs[]': '7',
            'bs[]': '8',
            'bs[]': '9',
            'bs[]': '10',
            'bs[]': '11',
            'bs[]': '12',
            'bs[]': '13',
            'bs[]': '14',
            'bs[]': '15',
            'bs[]': '16',
            'bs[]': '17',
            'bs[]': '18',
            'bs[]': '19',
            'bs[]': '20',
            'bs[]': '21',
            'bs[]': '22',
            'bs[]': '23',
            'bs[]': '24',
            'bs[]': '25',
            'bs[]': '26',
            'bs[]': '27',
            'bs[]': '28',
            'bs[]': '29',
            'bs[]': '30',
            'bs[]': '31',
            'bs[]': '32',
            'bs[]': '33',
            'bs[]': '34',
            'bs[]': '35',
            'bs[]': '36',
            'bs[]': '37',
            'bs[]': '38',
            'bs[]': '39',
            'bs[]': '40',
            'bs[]': '41',
            'bs[]': '42',
            'bs[]': '43',
            'bs[]': '44',
            'bs[]': '45',
            'bs[]': '46',
            'bs[]': '47',
            'bs[]': '48',
            'bs[]': '49',
            'bs[]': '50',
            'bs[]': '51',
            'bs[]': '52',
            'bs[]': '53',
            'bs[]': '54',
            'bs[]': '55',
            'bs[]': '56',
            'bs[]': '57',
            'bs[]': '58',
            'bs[]': '59',
            'bs[]': '60',
            'bs[]': '61',
            'bs[]': '62',
            'bs[]': '63',
            'bs[]': '64',
            'bs[]': '65',
            'bs[]': '66',
            'bs[]': '67',
            'bs[]': '68',
            'bs[]': '69',
            'bs[]': '70',
            'bs[]': '71',
            'bs[]': '72',
            'bs[]': '73',
            'bs[]': '74',
            'bs[]': '75',
            'bs[]': '76',
            'bs[]': '77',
            'bs[]': '78',
            'bs[]': '79',
            'bs[]': '80',
            'bs[]': '81',
            'bs[]': '82',
            'bs[]': '83',
            'bs[]': '84',
            'bs[]': '85',
            'bs[]': '86',
            'bs[]': '87',
            'bs[]': '88',
            'bs[]': '89',
            'bs[]': '90',
            'bs[]': '91',
            'bs[]': '92',
            'bs[]': '93',
            'bs[]': '94',
            'bs[]': '95',
            'bs[]': '96',
            'bs[]': '97',
            'bs[]': '98',
            'bs[]': '99',
            'sbtsubmit': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table = data.find("table");
            let data_table = table.eq(2).find("tr");
            //get data table
            const header_data = [];
            const content_data = [];

            for (let i = 0; i < data_table.length; i++) {
                if(i == 0){
                    const header = data_table.eq(i).find("th");
                    for (let j = 0; j < header.length; j++) {
                        const header_item = {
                            "header": header.eq(j).text()
                        }
                        header_data.push(header_item)
                    }
                } else {
                    const content_table = data_table.eq(i).find("td");
                    const content_item = [];
                    for (let j = 0; j < content_table.length; j++) {
                        const data_item = {
                            "data_item": content_table.eq(j).text()
                        }
                        content_item.push(data_item)
                    }
                    content_data.push(content_item);
                }
            }

            let cellularLotoFrequencyStatistics = new CellularLotoFrequencyStatistics();
            cellularLotoFrequencyStatistics.day_from = params.day_from;
            cellularLotoFrequencyStatistics.day_to = params.day_to;
            cellularLotoFrequencyStatistics.kieu_soi = params.kieu_soi;
            cellularLotoFrequencyStatistics.tp = params.tp;
            cellularLotoFrequencyStatistics.data_header = header_data;
            cellularLotoFrequencyStatistics.data_table = content_data;

            cellularLotoFrequencyStatistics.save((err, newCellularLotoFrequencyStatistics) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newCellularLotoFrequencyStatistics);
                }
            });
        }
    })
}
exports.crawlDataCellularLotoFrequencyStatistics = crawlDataCellularLotoFrequencyStatistics;
//Thống kê tần suất lotto kiểu lưới
async function crawlDataGridStyleLotoFrequencyStatistics(params, res) {
    const options = {
        'method': 'POST',
        'url': 'https://www.xoso88.info/thong-ke-tan-suat-lotto-kieu-luoi.html',
        'headers': {
          'content-type': 'application/x-www-form-urlencoded',
        },
        form: {
          'form_block_id': '50119',
          'day_from': params.day_from,
          'day_to': params.day_to,
          'tp': params.tp,
          'bs[]': '0',
          'bs[]': '1',
          'bs[]': '2',
          'bs[]': '3',
          'bs[]': '4',
          'bs[]': '5',
          'bs[]': '6',
          'bs[]': '7',
          'bs[]': '8',
          'bs[]': '9',
          'bs[]': '10',
          'bs[]': '11',
          'bs[]': '12',
          'bs[]': '13',
          'bs[]': '14',
          'bs[]': '15',
          'bs[]': '16',
          'bs[]': '17',
          'bs[]': '18',
          'bs[]': '19',
          'bs[]': '20',
          'bs[]': '21',
          'bs[]': '22',
          'bs[]': '23',
          'bs[]': '24',
          'bs[]': '25',
          'bs[]': '26',
          'bs[]': '27',
          'bs[]': '28',
          'bs[]': '29',
          'bs[]': '30',
          'bs[]': '31',
          'bs[]': '32',
          'bs[]': '33',
          'bs[]': '34',
          'bs[]': '35',
          'bs[]': '36',
          'bs[]': '37',
          'bs[]': '38',
          'bs[]': '39',
          'bs[]': '40',
          'bs[]': '41',
          'bs[]': '42',
          'bs[]': '43',
          'bs[]': '44',
          'bs[]': '45',
          'bs[]': '46',
          'bs[]': '47',
          'bs[]': '48',
          'bs[]': '49',
          'bs[]': '50',
          'bs[]': '51',
          'bs[]': '52',
          'bs[]': '53',
          'bs[]': '54',
          'bs[]': '55',
          'bs[]': '56',
          'bs[]': '57',
          'bs[]': '58',
          'bs[]': '59',
          'bs[]': '60',
          'bs[]': '61',
          'bs[]': '62',
          'bs[]': '63',
          'bs[]': '64',
          'bs[]': '65',
          'bs[]': '66',
          'bs[]': '67',
          'bs[]': '68',
          'bs[]': '69',
          'bs[]': '70',
          'bs[]': '71',
          'bs[]': '72',
          'bs[]': '73',
          'bs[]': '74',
          'bs[]': '75',
          'bs[]': '76',
          'bs[]': '77',
          'bs[]': '78',
          'bs[]': '79',
          'bs[]': '80',
          'bs[]': '81',
          'bs[]': '82',
          'bs[]': '83',
          'bs[]': '84',
          'bs[]': '85',
          'bs[]': '86',
          'bs[]': '87',
          'bs[]': '88',
          'bs[]': '89',
          'bs[]': '90',
          'bs[]': '91',
          'bs[]': '92',
          'bs[]': '93',
          'bs[]': '94',
          'bs[]': '95',
          'bs[]': '96',
          'bs[]': '97',
          'bs[]': '98',
          'bs[]': '99',
          'sbtsubmit': 'Xem kết quả'
        }
    };

    request(options, function (error, response) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(response.body, { decodeEntities: false });
            let data = $(".dataTable_wrapper").eq(0);

            let table = data.find("table");
            let data_table = table.eq(2).find("tr");
            //get data table
            const header_data = [];
            const content_data = [];

            for (let i = 0; i < data_table.length; i++) {
                if(i == 0){
                    const header = data_table.eq(i).find("th");
                    for (let j = 0; j < header.length; j++) {
                        const header_item = {
                            "header": header.eq(j).text()
                        }
                        header_data.push(header_item)
                    }
                } else {
                    const content_table = data_table.eq(i).find("td");
                    const content_item = [];
                    for (let j = 0; j < content_table.length; j++) {
                        const data_item = {
                            "data_item": content_table.eq(j).text()
                        }
                        content_item.push(data_item)
                    }
                    content_data.push(content_item);
                }
            }

            let gridStyleLotoFrequencyStatistic = new GridStyleLotoFrequencyStatistic();
            gridStyleLotoFrequencyStatistic.day_from = params.day_from;
            gridStyleLotoFrequencyStatistic.day_to = params.day_to;
            gridStyleLotoFrequencyStatistic.tp = params.tp;
            gridStyleLotoFrequencyStatistic.data_header = header_data;
            gridStyleLotoFrequencyStatistic.data_table = content_data;

            gridStyleLotoFrequencyStatistic.save((err, newGridStyleLotoFrequencyStatistic) => {
                if (err) {
                    dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    return res.status(200).json(newGridStyleLotoFrequencyStatistic);
                }
            });
        }
    })
}
exports.crawlDataGridStyleLotoFrequencyStatistics = crawlDataGridStyleLotoFrequencyStatistics;