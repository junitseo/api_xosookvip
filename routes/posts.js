const postController = require("../controllers/post");
const router = require("express").Router();
const authorize = require("../middleware/authorize");
const permissionFieldName = require("../helpers/permissionFieldName");
const permissionFunction = require("../helpers/permissionFunction");

const {
  update,
  create,
  list,
  listSearch,
  remove,
  read,
  listRelated,
  filterByStatus,
  filterByStatusAndSlug,
  getPostByTax,
  getAllByLimit,
  getAllByTax,
  getPostByTaxNew,
  updateView,
  getAllByTaxDate,
  getAllByDate,
  getMax,
  getMin,
  getListView,
  statisticsStaff,
  getMaxUser,
  getMinUser,
  updateUser,
  getPostXML,
  getAllSlug,
  filterAndUpdateSlug,
} = require("../controllers/post.js");
// const multer = require("multer")
const path = require("path");

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, path.join(path.dirname(__dirname), 'public'))
//     },
//     filename(req, file, cb) {
//         cb(null, `${file.originalname}`)
//     },
// })

// const upload = multer({
//     storage,
// })
// const { upload } = require("../middleware/saveImage");
// const multer  = require('multer')
// const upload = multer({ dest: 'public/' })
router.get("/getPosts", postController.getPosts);
router.get("/posts/getListView", getListView);
router.put("/updateView/:id", updateView);
router.get("/getAllByTax", getAllByTax);
router.get("/getAllByLimit", getAllByLimit);
router.get("/", list);
router.get("/getAllPublicPost", postController.getAllPublicPost);
router.get("/getAllByTax", postController.getPostByTaxId);

router.get("/getAllByTaxDate", getAllByTaxDate);
router.get("/getAllByDate", getAllByDate);
router.get("/getMin", getMin);
router.get("/getMax", getMax);

router.get("/getPostByTax", getPostByTax);
router.get("/getPostByTaxNew", getPostByTaxNew);
router.get("/getPostBtCate", list);
router.get("/filterAndUpdateSlug", filterAndUpdateSlug);
router.get("/getAllSlug", getAllSlug);
router.get("/getByStatus/:status", filterByStatus);
router.get("/getBy/StatusAndSlug", filterByStatusAndSlug);
router.get("/post/search", listSearch);
router.get("/related", listRelated);
router.post(
  "/",
  // authorize(permissionFunction.POSTS, permissionFieldName.ADD),
  // upload.single('post_image'),
  create
);
router.put("/:id", authorize(), update);
router.delete("/remove/:slug", authorize(), remove);
router.get("/getStatictis/staff", statisticsStaff);
router.get("/getMin/user", getMinUser);
router.get("/getMax/user", getMaxUser);
router.get("/update/user", updateUser);
router.get("/getPosts/sitemap", getPostXML);
router.get("/:slug", postController.getPostBySlug);

module.exports = router;
