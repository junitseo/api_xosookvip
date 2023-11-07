const mongoose = require('mongoose');

const StatisticsOfNorthernLotSchema = new mongoose.Schema({
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

module.exports = mongoose.model('StatisticsOfNorthernLot', StatisticsOfNorthernLotSchema);