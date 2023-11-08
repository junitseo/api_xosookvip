const mongoose = require('mongoose');

const northernLotteryStatisticSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    day_from: {
        type: String,
    }, 
    day_to: {
        type: String,
    }, 
    number: {
        type: String,
    },
    week_day: {
        type: String,
    },
    header: {
        type: Array,
    },
    table_data: {
        type: Array,
    },
});

module.exports = mongoose.model('NorthernLotteryStatistic', northernLotteryStatisticSchema);