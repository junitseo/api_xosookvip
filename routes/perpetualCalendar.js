const router = require("express").Router();
const perpetualCalendarController = require("../controllers/perpetualCalendar");

router.get('/getPerpetualCalendar/:date', perpetualCalendarController.getPerpetualCalendar);

module.exports = router;