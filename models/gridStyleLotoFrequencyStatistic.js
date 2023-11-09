const mongoose = require('mongoose');

const gridStyleLotoFrequencyStatisticSchema = new mongoose.Schema({
    day_from: {
        type: String,
    },
    day_to: {
        type: String,
    },
    tp: {
        type: String,
    },
    data_header: {
        type: Array,
    },
    data_table: {
        type: Array,
    },
});

module.exports = mongoose.model('GridStyleLotoFrequencyStatistic', gridStyleLotoFrequencyStatisticSchema);