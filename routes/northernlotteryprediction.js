const router = require("express").Router();
const Northernlotteryprediction = require("../controllers/northernlotteryprediction");

router.get('/getTriangularLotteryPrediction', Northernlotteryprediction.getTriangularLotteryPrediction);
router.get('/getPairLotteryPrediction', Northernlotteryprediction.getPairLotteryPrediction);
router.get('/getLotteryPredictionsForStraightCombinations', Northernlotteryprediction.getLotteryPredictionsForStraightCombinations);
router.get('/getPredictReverseLotteryNumbers', Northernlotteryprediction.getPredictReverseLotteryNumbers);
router.get('/getCheckTheLotteryTwice', Northernlotteryprediction.getCheckTheLotteryTwice);
router.get('/getLotterySlipPrediction', Northernlotteryprediction.getLotterySlipPrediction);
router.get('/getPredictSpecialPrizes', Northernlotteryprediction.getPredictSpecialPrizes);
router.get('/getCheckBridgeHistory', Northernlotteryprediction.getCheckBridgeHistory);
module.exports = router;