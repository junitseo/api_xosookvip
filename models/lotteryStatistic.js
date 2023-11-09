const mongoose = require('mongoose');

const lotteryStatisticSchema = new mongoose.Schema({
    date_start: {
        type: String,
    },
    date_end: {
        type: String,
    },
    amplitude: {
        type: String,
    },
    data_table_one: {
        type: Array,
    },
    data_table_tow: {
        type: Array,
    },
});

module.exports = mongoose.model('LotteryStatistic', lotteryStatisticSchema);