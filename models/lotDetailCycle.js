const mongoose = require('mongoose');

const lotDetailCycleSchema = new mongoose.Schema({
    list_number: {
        type: String,
    },
    day_from: {
        type: String,
    },
    day_to: {
        type: String,
    },
    times: {
        type: String,
    },
    data_date: {
        type: String,
    },
    content_one: {
        type: String,
    },
    content_tow: {
        type: String,
    },
    content_three: {
        type: String,
    },
    content_four: {
        type: String,
    },
    detail_lotDetailCycle: {
        type: Array,
    },
    total_lotDetailCycle: {
        type: Array,
    },
});

module.exports = mongoose.model('LotDetailCycle', lotDetailCycleSchema);