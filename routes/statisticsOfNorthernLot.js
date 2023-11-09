const router = require("express").Router();
const StatisticsOfNorthernLotController = require("../controllers/statisticsOfNorthernLot");

router.get('/getHeadAndEndLotteryStatistic/:date', StatisticsOfNorthernLotController.getHeadAndEndLotteryStatistic);
router.get('/getStatisticsOfLotteryRhythmFrequency/:date', StatisticsOfNorthernLotController.getStatisticsOfLotteryRhythmFrequency);
router.get('/getNorthernLotteryStatistics', StatisticsOfNorthernLotController.getNorthernLotteryStatistics);
router.get('/getStatisticsOnSiblingPairs', StatisticsOfNorthernLotController.getStatisticsOnSiblingPairs);
router.get('/getFrequencyOfOccurrenceOfTwoNumbers', StatisticsOfNorthernLotController.getFrequencyOfOccurrenceOfTwoNumbers);
router.get('/getLotDetailCycles', StatisticsOfNorthernLotController.getLotDetailCycles);
router.get('/getLotteryStatistic', StatisticsOfNorthernLotController.getLotteryStatistic);
router.get('/getStatisticsOfBatchBeatFrequency', StatisticsOfNorthernLotController.getStatisticsOfBatchBeatFrequency);
router.get('/getCellularLotoFrequencyStatistics', StatisticsOfNorthernLotController.getCellularLotoFrequencyStatistics);
router.get('/getGridStyleLotoFrequencyStatistic', StatisticsOfNorthernLotController.getGridStyleLotoFrequencyStatistic);

module.exports = router;