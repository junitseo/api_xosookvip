const express = require("express");
const {
  create,
  update,
  deleteSeo,
  getAllSeo,
  getSeoByLink,
} = require("../controllers/seo");
const router = express.Router();

router.get("/getAllSeo", getAllSeo);
router.get("/getSeoByLink", getSeoByLink);
router.post("/", create);
router.delete("/:id", deleteSeo);
router.put("/update/:id", update);

module.exports = router;
