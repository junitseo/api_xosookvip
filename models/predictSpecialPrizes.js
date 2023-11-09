const mongoose = require('mongoose');

const predictSpecialPrizesSchema = new mongoose.Schema({
    top_day: {
        type: String,
    },
    number: {
        type: String,
    },
    kieu_soi: {
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

module.exports = mongoose.model('PredictSpecialPrizes', predictSpecialPrizesSchema);