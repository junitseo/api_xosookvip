const mongoose = require('mongoose');

const StatisticsOfLotteryRhythmFrequencySchema = new mongoose.Schema({
    date: {
        type: String,
    },
    header: {
        type: Array,
    },
    table_data: {
        type: Array,
    },
});

module.exports = mongoose.model('StatisticsOfLotteryRhythmFrequency', StatisticsOfLotteryRhythmFrequencySchema);