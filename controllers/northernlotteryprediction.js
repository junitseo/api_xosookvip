const { dashLogger } = require('../logger');
const { crawlDataTriangularLotteryPrediction, crawlDataPairLotteryPrediction, crawlDataLotteryPredictionsForStraightCombinations, crawlDataPredictReverseLotteryNumbers, crawlDataCheckTheLotteryTwice, crawlDataLotterySlipPrediction, crawlDataPredictSpecialPrizes, crawlDataCheckBridgeHistory } = require('../stores/northernlotteryprediction');
const TriangularLotteryPrediction = require("../models/triangularLotteryPrediction");
const PairLotteryPrediction = require("../models/pairLotteryPrediction");
const LotteryPredictionsForStraightCombinations = require("../models/lotteryPredictionsForStraightCombinations");
const PredictReverseLotteryNumber = require("../models/predictReverseLotteryNumber");
const CheckTheLotteryTwice = require("../models/checkTheLotteryTwice");
const LotterySlipPrediction = require("../models/lotterySlipPrediction");
const PredictSpecialPrizes = require("../models/predictSpecialPrizes");
const CheckBridgeHistory = require("../models/checkBridgeHistory");

exports.getTriangularLotteryPrediction  = (req, res) => {
    let type = req.query.type ? req.query.type : null;
    let level = req.query.level ? req.query.level : null;
    let days = req.query.days ? req.query.days : null;
    let todate = req.query.todate ? req.query.todate.replaceAll("-", "/") : null;
    try {
        TriangularLotteryPrediction.findOne({
            type: type,
            level: level,
            days: days,
            todate: todate
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        type: type,
                        level: level,
                        days: days,
                        todate: todate                                          
                    }
                    crawlDataTriangularLotteryPrediction(prams, res);
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

exports.getPairLotteryPrediction = (req, res) => {
    let number = req.query.number ? req.query.number : null;
    let top_day = req.query.top_day ? req.query.top_day.replaceAll("-", "/") : null;
    try {
        PairLotteryPrediction.findOne({
            number: number,
            top_day: top_day,
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        number: number,
                        op_day: top_day,                                         
                    }
                    crawlDataPairLotteryPrediction(prams, res);
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

exports.getLotteryPredictionsForStraightCombinations = (req, res) => {
    let number = req.query.number ? req.query.number : null;
    let top_day = req.query.top_day ? req.query.top_day.replaceAll("-", "/") : null;
    try {
        LotteryPredictionsForStraightCombinations.findOne({
            number: number,
            top_day: top_day,
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        number: number,
                        op_day: top_day,                                         
                    }
                    crawlDataLotteryPredictionsForStraightCombinations(prams, res);
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

exports.getPairLotteryPrediction = (req, res) => {
    let number = req.query.number ? req.query.number : null;
    let top_day = req.query.top_day ? req.query.top_day.replaceAll("-", "/") : null;
    try {
        PairLotteryPrediction.findOne({
            number: number,
            top_day: top_day,
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        number: number,
                        op_day: top_day,                                         
                    }
                    crawlDataPairLotteryPrediction(prams, res);
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

exports.getPredictReverseLotteryNumbers = (req, res) => {
    let number = req.query.number ? req.query.number : null;
    let top_day = req.query.top_day ? req.query.top_day.replaceAll("-", "/") : null;
    try {
        PredictReverseLotteryNumber.findOne({
            number: number,
            top_day: top_day,
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        number: number,
                        op_day: top_day,                                         
                    }
                    crawlDataPredictReverseLotteryNumbers(prams, res);
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

exports.getCheckTheLotteryTwice = (req, res) => {
    let number = req.query.number ? req.query.number : null;
    let top_day = req.query.top_day ? req.query.top_day.replaceAll("-", "/") : null;
    try {
        CheckTheLotteryTwice.findOne({
            number: number,
            top_day: top_day,
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        number: number,
                        op_day: top_day,                                         
                    }
                    crawlDataCheckTheLotteryTwice(prams, res);
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

exports.getLotterySlipPrediction = (req, res) => {
    let number = req.query.number ? req.query.number : null;
    let kieu_soi = req.query.kieu_soi ? req.query.kieu_soi : null;
    let top_day = req.query.top_day ? req.query.top_day.replaceAll("-", "/") : null;
    try {
        LotterySlipPrediction.findOne({
            number: number,
            kieu_soi: kieu_soi,
            top_day: top_day,
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        number: number,
                        kieu_soi: kieu_soi,
                        top_day: top_day,                                         
                    }
                    crawlDataLotterySlipPrediction(prams, res);
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

exports.getPredictSpecialPrizes = (req, res) => {
    let number = req.query.number ? req.query.number : null;
    let kieu_soi = req.query.kieu_soi ? req.query.kieu_soi : null;
    let top_day = req.query.top_day ? req.query.top_day.replaceAll("-", "/") : null;
    try {
        PredictSpecialPrizes.findOne({
            number: number,
            kieu_soi: kieu_soi,
            top_day: top_day,
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        number: number,
                        kieu_soi: kieu_soi,
                        top_day: top_day,                                         
                    }
                    crawlDataPredictSpecialPrizes(prams, res);
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

exports.getCheckBridgeHistory = (req, res) => {
    let index_i = req.query.index_i ? req.query.index_i : null;
    let index_j = req.query.index_j ? req.query.index_j : null;
    try {
        CheckBridgeHistory.findOne({
            index_i: index_i,
            index_j: index_j
        }).exec(async (err, data) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                if (data) {
                    return res.status(200).json(data);
                } else {
                    const prams = {
                        index_i: index_i,
                        index_j: index_j                                      
                    }
                    crawlDataCheckBridgeHistory(prams, res);
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