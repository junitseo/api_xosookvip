const mongoose = require('mongoose');

const TriangularLotteryPredictionSchema = new mongoose.Schema({
    todate: {
        type: String,
    },
    level: {
        type: String,
    },
    days: {
        type: String,
    },
    type: {
        type: String,
    },
    data_table: {
        type: Array,
    },
});

module.exports = mongoose.model('TriangularLotteryPrediction', TriangularLotteryPredictionSchema);