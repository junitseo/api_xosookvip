const StatisticsOfNorthernLot = require("../models/statisticsOfNorthernLot");
const {dashLogger} = require('../logger');
const { crawlDataLottoStatistics } = require("../stores/statisticsOfNorthernLot");

exports.getStatisticsOfNorthernLot = (req, res) => {
    let date = req.params.date ? req.params.date : null;
    try {
        if (date) {
            StatisticsOfNorthernLot.findOne({
                date: date
            }).exec(async (err, data) => {
                if (err) {
                    return res.status(400).json({ message: err.message })
                } else {
                    if (data) {
                        return res.status(200).json(data);
                    } else {
                        crawlDataLottoStatistics(date, res);
                    }
                }
            });
        } else {
            return res.status(400).json("Please enter date")
        }
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req?.originalUrl}`);
        return res.status(400).json({
            message: err.message
        })
    }
}