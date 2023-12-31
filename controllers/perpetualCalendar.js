const PerpetualCalendar = require("../models/perpetualCalendar");
const {dashLogger} = require('../logger');
const { crawlDataPerpetualCalendar } = require("../stores/perpetualCalendar");

exports.getPerpetualCalendar = (req, res) => {
    let date = req.params.date ? req.params.date : null;
    try {
        if (date) {
            PerpetualCalendar.findOne({
                date: date
            }).exec(async (err, data) => {
                if (err) {
                    return res.status(400).json({ message: err.message })
                } else {
                    if (data) {
                        return res.status(200).json(data);
                    } else {
                        crawlDataPerpetualCalendar(date, res);
                    }
                }
            });
        } else {
            return res.status(400).json("Please enter date")
        }
    } catch (err) {
        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
        return res.status(400).json({
            message: err.message
        })
    }
}