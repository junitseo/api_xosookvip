const mongoose = require('mongoose');

const headAndEndLotteryStatisticSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    table_data_first: {
        type: Array,
    },
    table_data_last: {
        type: Array,
    },
});

module.exports = mongoose.model('HeadAndEndLotteryStatistic', headAndEndLotteryStatisticSchema);