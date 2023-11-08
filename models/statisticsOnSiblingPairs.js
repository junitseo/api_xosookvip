const mongoose = require('mongoose');

const statisticsOnSiblingPairSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    string_number: {
        type: String,
    },
    title_data: {
        type: String,
    },
    data: {
        type: Array,
    },
});

module.exports = mongoose.model('StatisticsOnSiblingPair', statisticsOnSiblingPairSchema);