const mongoose = require('mongoose');

const pairLotteryPredictionSchema = new mongoose.Schema({
    top_day: {
        type: String,
    },
    number: {
        type: String,
    },
    data_table: {
        type: Array,
    },
    list_old_bridge_one: {
        type: Array,
    },
    list_old_bridge_tow: {
        type: Array,
    },
    list_old_bridge_three: {
        type: Array,
    },
});

module.exports = mongoose.model('PairLotteryPrediction', pairLotteryPredictionSchema);