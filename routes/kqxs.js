const router = require("express").Router();
const kqxsController = require("../controllers/kqxs");
const kqxsControllerV2 = require("../controllers/kqxsv2");

router.get("/getResultFormLo", kqxsController.getResultFormLo);
router.get("/getResultFormGan", kqxsController.getResultFormGan);
router.get("/getResultTanSuat", kqxsController.getResultTanSuat);

router.get("/xsmt/:ngay", kqxsController.getXSMT);
router.get("/xsmn/:ngay", kqxsController.getXSMN);
router.get("/xsmb/:ngay", kqxsController.getXSMB);
router.get("/xsTinh", kqxsController.getKqXsTinh);
router.post("/deleteOne", kqxsController.deleteOne);
router.get(
  "/getAllSpecialPrizeProvince/:province",
  kqxsController.getAllSpecialProvince
);
router.post("/getAllSpecialPrizeMb", kqxsController.getAllSpecialMb);
router.post("/getAllSpecialPrizeMn", kqxsController.getAllSpecialMn);
router.post("/getAllSpecialPrizeMt", kqxsController.getAllSpecialMt);
router.get("/addRegion", kqxsController.addRegion);
router.get("/getTopByRegion/:region", kqxsController.getTopByRegion);
router.get("/getAllByHead/:region", kqxsController.getAllByHead);
router.get("/getAllByTail/:region", kqxsController.getAllByTail);
router.get("/getAllSpecialLotoMb", kqxsController.getAllSpecialLotoMb);
router.get(
  "/getAllSpecialLotoMbReverse",
  kqxsController.getAllSpecialLotoMbReverse
);
router.get("/xsTinhIframe", kqxsController.getKqxsTinhIframe);
router.get(
  "/getAllByHeadProvince/:provinceId",
  kqxsController.getAllByHeadProvince
);
router.get(
  "/getAllByTailProvince/:provinceId",
  kqxsController.getAllByTailProvince
);
router.get("/getTopByProvince/:provinceId", kqxsController.getTopByProvince);
router.post("/checkKqxs", kqxsControllerV2.checkKqxs);

module.exports = router;