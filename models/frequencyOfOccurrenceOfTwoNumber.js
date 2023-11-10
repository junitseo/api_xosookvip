const mongoose = require('mongoose');

const frequencyOfOccurrenceOfTwoNumberSchema = new mongoose.Schema({
    number_one: {
        type: String,
    },
    number_tow: {
        type: String,
    },
    day_from: {
        type: String,
    }, 
    day_to: {
        type: String,
    }, 
    pair_of_number: {
        type: String,
    }, 
    times: {
        type: String,
    },
    data_date: {
        type: String,
    },

    content_one_item_one: {
        type: String,
    },
    content_one_item_tow: {
        type: String,
    },
    content_one_item_three: {
        type: String,
    },
    content_one_item_four: {
        type: String,
    },

    content_tow_item_one: {
        type: String,
    },
    content_tow_item_tow: {
        type: String,
    },

    content_three_item_one: {
        type: String,
    },
    content_three_item_tow: {
        type: String,
    },

    content_four_item_one: {
        type: String,
    },
    content_four_item_tow: {
        type: String,
    },
    content_four_item_three: {
        type: String,
    },
});

module.exports = mongoose.model('FrequencyOfOccurrenceOfTwoNumber', frequencyOfOccurrenceOfTwoNumberSchema);