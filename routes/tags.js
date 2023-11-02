const Tag = require('../models/tag');
const express = require('express');
var app = express();
const router = express.Router();
var bodyParser = require('body-parser');
//middleware
router.use(bodyParser.json());
//create appplication/x-www-form-urlencoded parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(function(req, res, next){
    res.setHeader("Content-Type", "application/json");
    next();
})
const authJwt = require('../middleware/auth');
const { tagCreateValidator } = require('../validators/tag');
const {create, list, remove, update, read, createList} = require('../controllers/tag');
const {runValidation} = require('../validators');

router.post(`/create`, tagCreateValidator, authJwt.auth,runValidation, create );
router.get(`/:page`, list);
router.get(`/:slug`, read);
router.delete(`/delete/:slug`,authJwt.auth, remove);
router.put('/edit/:slug',authJwt.auth, update);
router.post("/createList", authJwt.auth, createList)

// router.get("/:page", async function(req, res){
//     const query = await Tag.find({"page" : req.params.page}).exec();
//     var data = {
//         isSuccessed : false,
//         resultObj : [],
//     }
//     if (query.length == 0) {
//         res.status(500).send(data);
//     }else{
//         data = {
//             isSuccessed : true,
//             resultObj : query,
//         }
//         res.status(200).send(data);
//     }
// });

// router.get("/:id", async function (req, res) {
//     const tag = await Tag.findOne({"_id" : req.params.id});

//     if (!tag) {
//         res.status(500).json({message : 'The tag with the given ID was not found!'});
//     };
//     res.status(200).send(tag);
// });

//nho add content-type : "application/json"
// router.post("/create", authJwt.auth, async function(req, res){
//     let tag = new Tag({
//         name : req.body.name,
//         domain : req.body.domain,
//         status : req.body.status,
//         page : req.body.page,
//         nameNoSign : toSlug(req.body.name),
//     })
//     tag = await tag.save();
//     var data = {
//         isSuccessed : false,
//         resultObj : {},
//     }
//     if(!tag){
//         return res.status(400).send(data);
//     }else{
//         data = {
//             isSuccessed : true,
//             resultObj : tag
//         }
//         return res.status(200).send(data);
//     }
// });



// router.put("/edit/:id",authJwt.auth, async function(req, res){
//     const tag = await Tag.findByIdAndUpdate(
//         req.params.id,
//         {
//             name : req.body.name,
//             status : req.body.status,
//             domain : req.body.domain,
//             nameNoSign : toSlug(req.body.name),
//             page : req.body.page
//         },
//         {new : true}
//     )
//     var data = {
//         isSuccessed : false,
//         resultObj : {},
//     }
//     if(!tag){
//         return res.status(400).send(data);
//     }else{
//         data = {
//             isSuccessed : true,
//             resultObj : tag,
//         }
//         return res.status(200).send(data);
//     }
// });

// router.delete("/delete/:id",authJwt.auth, function(req, res){
//     Tag.findByIdAndRemove(req.params.id).then(tag => {
//         var data = {
//             isSuccessed : false,
//             resultObj : {},
//         }
//         if(!tag){
//             return res.status(400).send(data);
//         }else{
//             data = {
//                 isSuccessed : true,
//                 resultObj : tag,
//             }
//             return res.status(200).send(data);
//         }
//     }).catch(err =>{
//         return res.status(500).json({success : false, error: err});
//     })
// })

// function toSlug(str) {
// 	// Chuyển hết sang chữ thường
// 	str = str.toLowerCase();     
 
// 	// xóa dấu
// 	str = str
// 		.normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
// 		.replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp
 
// 	// Thay ký tự đĐ
// 	str = str.replace(/[đĐ]/g, 'd');
	
// 	// Xóa ký tự đặc biệt
// 	str = str.replace(/([^0-9a-z-\s])/g, '');
 
// 	// Xóa khoảng trắng thay bằng ký tự -
// 	str = str.replace(/(\s+)/g, '-');
	
// 	// Xóa ký tự - liên tiếp
// 	str = str.replace(/-+/g, '-');
 
// 	// xóa phần dư - ở đầu & cuối
// 	str = str.replace(/^-+|-+$/g, '');
 
// 	// return
// 	return str;
// }


module.exports = router;