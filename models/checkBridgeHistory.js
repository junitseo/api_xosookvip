const mongoose = require('mongoose');

const checkBridgeHistorySchema = new mongoose.Schema({
    index_i: {
        type: String,
    },
    index_j: {
        type: String,
    },
    location_one: {
        type: String,
    },
    location_tow: {
        type: String,
    },
    location_total: {
        type: String,
    },
    data_list_number: {
        type: Array,
    },
    list_hitory: {
        type: Array,
    },
});

module.exports = mongoose.model('CheckBridgeHistory', checkBridgeHistorySchema);