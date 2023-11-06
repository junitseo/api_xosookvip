const mongoose = require('mongoose');

const perpetualCalendarSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    title: {
        type: String,
    },
    title_calendar: {
        type: String,
    },
    date_calendar: {
        type: String,
    },
    day_info_calendar: {
        type: String,
    },
    calendar_day_of_week: {
        type: String,
    },
    number_one: {
        type: String,
    },
    number_calendar: {
        type: String,
    },
    month_two: {
        type: String,
    },
    month_one: {
        type: String,
    },
    month_calendar: {
        type: String,
    },
    calendar_day_tho: {
        type: String,
    },
    calendar_day_row_title: {
        type: String,
    },
    calendar_day_row_desc_one: {
        type: String,
    },
    calendar_day_row_desc_two: {
        type: String,
    },
    calendar_day_row_title_three: {
        type: String,
    },
    calendar_day_row_title_xo_so_mb: {
        type: String,
    },
    calendar_day_row_desc_xo_so_mb: {
        type: String,
    },
    calendar_day_row_title_xo_so_mt: {
        type: String,
    },
    calendar_day_row_desc_xo_so_mt_one: {
        type: String,
    },
    calendar_day_row_desc_xo_so_mt_two: {
        type: String,
    },
    calendar_day_row_desc_xo_so_mt_three: {
        type: String,
    },
    calendar_day_row_title_xo_so_mn: {
        type: String,
    },
    calendar_day_row_desc_xo_so_mn_one: {
        type: String,
    },
    calendar_day_row_desc_xo_so_mn_two: {
        type: String,
    },
    calendar_day_row_desc_xo_so_mn_three: {
        type: String,
    },
    calendar_day_row_title_time: {
        type: String,
    },
    calendar_day_row_desc_time: {
        type: String,
    },
    life: {
        type: String,
    },
    life_desc: {
        type: String,
    },
    gas_secretion: {
        type: String,
    },
    gas_secretion_desc: {
        type: String,
    },
    direct: {
        type: String,
    },
    direct_desc: {
        type: String,
    },
    conflicting_ages: {
        type: String,
    },
    conflicting_ages_desc: {
        type: String,
    },
    departure_direction: {
        type: String,
    },
    departure_direction_desc_winter: {
        type: String,
    },
    departure_direction_desc_west: {
        type: String,
    },
    departure_direction_desc_male: {
        type: String,
    },
    departure_direction_desc_north: {
        type: String,
    },
    good_stars: {
        type: String,
    },
    good_stars_desc_one: {
        type: String,
    },
    good_stars_desc_two: {
        type: String,
    },
    good_stars_desc_three: {
        type: String,
    },
    good_stars_desc_four: {
        type: String,
    },
    bad_stars: {
        type: String,
    },
    bad_stars_desc_one: {
        type: String,
    },
    bad_stars_desc_two: {
        type: String,
    },
    bad_stars_desc_three: {
        type: String,
    },
    bad_stars_desc_four: {
        type: String,
    },
    bad_stars_desc_five: {
        type: String,
    },
    twenty_eight_stars: {
        type: String,
    },
    twenty_eight_stars_desc_one: {
        type: String,
    },
    twenty_eight_stars_desc_two: {
        type: String,
    },
    twenty_eight_stars_desc_three: {
        type: String,
    },
    twenty_eight_stars_desc_four: {
        type: String,
    },
    twenty_eight_stars_desc_five: {
        type: String,
    },
    twenty_eight_stars_desc_six: {
        type: String,
    },
    twenty_eight_stars_desc_seven: {
        type: String,
    },
    twenty_eight_stars_desc_eight: {
        type: String,
    },
    twenty_eight_stars_desc_nine: {
        type: String,
    },
    twenty_eight_stars_desc_ten: {
        type: String,
    },
});

module.exports = mongoose.model('perpetualCalendar', perpetualCalendarSchema);