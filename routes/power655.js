const express = require("express");
const router = express.Router();
const vietlottController = require("../controllers/vietlot");

router.get("/:date", vietlottController.getPower655);
router.post("/draw-image");

module.exports = router;
