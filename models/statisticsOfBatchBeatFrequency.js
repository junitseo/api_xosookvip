const mongoose = require('mongoose');

const StatisticsOfBatchBeatFrequencySchema = new mongoose.Schema({
    date_start: {
        type: String,
    },
    date_end: {
        type: String,
    },
    number_server: {
        type: String,
    },
    day_of_week: {
        type: String,
    },
    times_data: {
        type: String,
    },
    header_content: {
        type: Array,
    },
    data_content: {
        type: Array,
    },
});

module.exports = mongoose.model('StatisticsOfBatchBeatFrequency', StatisticsOfBatchBeatFrequencySchema);