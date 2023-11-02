const router = require("express").Router();
const informationController = require("../controllers/information");

router.put("/", informationController.updateInformation);
router.get("/", informationController.getInformation);

module.exports = router;
