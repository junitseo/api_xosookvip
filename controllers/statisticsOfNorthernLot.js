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
const { crawlDataHeadAndEndLotteryStatistics, crawlDataStatisticsOfLotteryRhythmFrequency, crawlDataNorthernLotteryStatistics, crawlDataStatisticsOnSiblingPairs, crawlDataFrequencyOfOccurrenceOfTwoNumbers, crawlDataLotDetailCycle, crawlDataLotteryStatistic, crawlDataStatisticsOfBatchBeatFrequency, crawlDataCellularLotoFrequencyStatistics, crawlDataGridStyleLotoFrequencyStatistics } = require("../stores/statisticsOfNorthernLot");

exports.getHeadAndEndLotteryStatistic = (req, res) => {
    let date = req.params.date ? req.params.date.replaceAll("-", "/") : null;
    try {
        if (date) {
            HeadAndEndLotteryStatistic.findOne({
                date: date
            }).exec(async (err, data) => {
                if (err) {
                    return res.status(400).json({ message: err.message })
                } else {
                    if (data) {
                        return res.status(200).json(data);
                    } else {
                        crawlDataHeadAndEndLotteryStatistics(date, res);
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

exports.getStatisticsOfLotteryRhythmFrequency = (req, res) => {
    let date = req.params.date ? req.params.date.replaceAll("-", "/") : null;
    try {
        if (date) {
            StatisticsOfLotteryRhythmFrequency.findOne({
                date: date
            }).exec(async (err, data) => {
                if (err) {
                    return res.status(400).json({ message: err.message })
                } else {
                    if (data) {
                        return res.status(200).json(data);
                    } else {
                        crawlDataStatisticsOfLotteryRhythmFrequency(date, res);
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

exports.getNorthernLotteryStatistics = (req, res) => {
    let day_from = req.query.day_from ? req.query.day_from.replaceAll("-", "/") : null;
    let day_to = req.query.day_to ? req.query.day_to.replaceAll("-", "/") : null;
    let number = req.query.number ? req.query.number : null;
    let week_day = req.query.week_day ? req.query.week_day : null;

    try {
        NorthernLotteryStatistic.findOne({
            day_from: day_from,
            day_to: day_to,
            number: number,
            week_day: week_day
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        day_from: day_from,
                        day_to: day_to,
                        number: number,
                        week_day: week_day
                    }
                    crawlDataNorthernLotteryStatistics(prams, res);
                }
            }
        });
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req?.originalUrl}`);
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.getStatisticsOnSiblingPairs = (req, res) => {
    let string_number = req.query.string_number ? req.query.string_number : null;
    let date = req.query.date ? req.query.date.replaceAll("-", "/") : null;

    try {
        StatisticsOnSiblingPairs.findOne({
            string_number: string_number,
            date: date
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        string_number: string_number,
                        date: date
                    }
                    crawlDataStatisticsOnSiblingPairs(prams, res);
                }
            }
        });
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req?.originalUrl}`);
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.getFrequencyOfOccurrenceOfTwoNumbers = (req, res) => {
    let number_one = req.query.number_one ? req.query.number_one : null;
    let number_tow = req.query.number_tow ? req.query.number_tow : null;
    let day_from = req.query.day_from ? req.query.day_from.replaceAll("-", "/") : null;
    let day_to = req.query.day_to ? req.query.day_to.replaceAll("-", "/") : null;

    try {
        FrequencyOfOccurrenceOfTwoNumber.findOne({
            number_one: number_one,
            number_tow: number_tow,
            day_from: day_from,
            day_to: day_to
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        number_one: number_one,
                        number_tow: number_tow,
                        day_from: day_from,
                        day_to: day_to
                    }
                    crawlDataFrequencyOfOccurrenceOfTwoNumbers(prams, res);
                }
            }
        });
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req?.originalUrl}`);
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.getLotDetailCycles = (req, res) => {
    let list_number = req.query.list_number ? req.query.list_number : null;
    let day_from = req.query.day_from ? req.query.day_from.replaceAll("-", "/") : null;
    let day_to = req.query.day_to ? req.query.day_to.replaceAll("-", "/") : null;

    try {
        LotDetailCycle.findOne({
            list_number: list_number,
            day_from: day_from,
            day_to: day_to
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        list_number: list_number,
                        day_from: day_from,
                        day_to: day_to
                    }
                    crawlDataLotDetailCycle(prams, res);
                }
            }
        });
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req?.originalUrl}`);
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.getLotteryStatistic = (req, res) => {
    let amplitude = req.query.amplitude ? req.query.amplitude : null;
    let date_start = req.query.date_start ? req.query.date_start.replaceAll("-", "/") : null;
    let date_end = req.query.date_end ? req.query.date_end.replaceAll("-", "/") : null;

    try {
        LotteryStatistic.findOne({
            amplitude: amplitude,
            date_start: date_start,
            date_end: date_end
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        amplitude: amplitude,
                        date_start: date_start,
                        date_end: date_end
                    }
                    crawlDataLotteryStatistic(prams, res);
                }
            }
        });
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req?.originalUrl}`);
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.getStatisticsOfBatchBeatFrequency = (req, res) => {
    let number_server = req.query.number_server ? req.query.number_server : null;
    let day_of_week = req.query.day_of_week ? req.query.day_of_week : null;
    let date_start = req.query.date_start ? req.query.date_start.replaceAll("-", "/") : null;
    let date_end = req.query.date_end ? req.query.date_end.replaceAll("-", "/") : null;

    try {
        StatisticsOfBatchBeatFrequency.findOne({
            number_server: number_server,
            day_of_week: day_of_week,
            date_start: date_start,
            date_end: date_end
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        number_server: number_server,
                        day_of_week: day_of_week,
                        date_start: date_start,
                        date_end: date_end
                    }
                    crawlDataStatisticsOfBatchBeatFrequency(prams, res);
                }
            }
        });
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req?.originalUrl}`);
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.getCellularLotoFrequencyStatistics = (req, res) => { 
    let kieu_soi = req.query.kieu_soi ? req.query.kieu_soi : null;
    let tp = req.query.tp ? req.query.tp : null;
    let day_from = req.query.day_from ? req.query.day_from.replaceAll("-", "/") : null;
    let day_to = req.query.day_to ? req.query.day_to.replaceAll("-", "/") : null;

    try {
        CellularLotoFrequencyStatistics.findOne({
            kieu_soi: kieu_soi,
            tp: tp,
            day_from: day_from,
            day_to: day_to
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        kieu_soi: kieu_soi,
                        tp: tp,
                        day_from: day_from,
                        day_to: day_to
                    }
                    crawlDataCellularLotoFrequencyStatistics(prams, res);
                }
            }
        });
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req?.originalUrl}`);
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.getGridStyleLotoFrequencyStatistic = (req, res) => { 
    let tp = req.query.tp ? req.query.tp : null;
    let day_from = req.query.day_from ? req.query.day_from.replaceAll("-", "/") : null;
    let day_to = req.query.day_to ? req.query.day_to.replaceAll("-", "/") : null;

    try {
        GridStyleLotoFrequencyStatistic.findOne({
            tp: tp,
            day_from: day_from,
            day_to: day_to
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        tp: tp,
                        day_from: day_from,
                        day_to: day_to
                    }
                    crawlDataGridStyleLotoFrequencyStatistics(prams, res);
                }
            }
        });
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req?.originalUrl}`);
        return res.status(400).json({
            message: err.message
        })
    }
}
