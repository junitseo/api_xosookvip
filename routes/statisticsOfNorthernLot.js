const router = require("express").Router();
const StatisticsOfNorthernLotController = require("../controllers/statisticsOfNorthernLot");

router.get('/getStatisticsOfNorthernLot/:date', StatisticsOfNorthernLotController.getStatisticsOfNorthernLot);

module.exports = router;