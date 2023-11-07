var request = require('request');
var cheerio = require("cheerio");
const StatisticsOfNorthernLot = require("../models/statisticsOfNorthernLot");
const {dashLogger} = require('../logger');

async function crawlDataLottoStatistics(date, res) {
    let formData = new FormData();
    formData.append("form_block_id", 50120);
    // formData.append("date_end", date);
    formData.append("date_end", "06/11/2023");
    formData.append("sbtFind", "Xem kết quả");

    request.post({url:'https://www.xoso88.info/thong_ke_dau_duoi.html', formData: formData}, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(body, { decodeEntities: false });
            const data = $(".dataTable_wrapper").eq(0);

            const table = data.find(".table");

            //1. Thống kê đầu loto
            const table_first = table.eq(0).find("tr");

            const table_data_first = [];
            for (let i = 0; i < table_first.length; i++) {
                //lưu header
                if(i == 0){
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
                else if( i == (table_first.length - 1)){
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
            const table_last = table.eq(1).find("tr");

            const table_data_last = [];
            for (let i = 0; i < table_last.length; i++) {
                //lưu header
                if(i == 0){
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
                else if( i == (table_last.length - 1)){
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

            let statisticsOfNorthernLots = new StatisticsOfNorthernLot();
            statisticsOfNorthernLots.date = date;
            statisticsOfNorthernLots.table_data_first = table_data_first;
            statisticsOfNorthernLots.table_data_last = table_data_last;
            
            statisticsOfNorthernLots.save((err, newStatisticsOfNorthernLots) => {
                    if (err) {
                        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                        return res.status(400).json({
                            message: err.message
                        })
                    } else {
                        return res.status(200).json(newStatisticsOfNorthernLots);
                    }
                });
            }
    })
}

exports.crawlDataLottoStatistics = crawlDataLottoStatistics;
