const Category = require('../models/category');
const express = require('express');
const router = express.Router();
// const authJwt = require('../middleware/auth');
const { categoryCreateValidator } = require('../validators/category');
const {create, list, remove, update, read} = require('../controllers/category');
const {runValidation} = require('../validators');

// router.post(`/create`, categoryCreateValidator, runValidation, authJwt.auth, create );
router.get(`/:page`, list);
router.get(`/getBySlug/:slug`, read);
// router.delete(`/delete/:slug`,authJwt.auth, remove);
// router.put('/edit/:slug',authJwt.auth, update);

// router.get("/:page", async function(req, res) {
//     const categoryList = await Category.find({"page" : req.params.page}).exec();
//     var data = {
//         isSuccessed : false,
//         resultObj : [],
//     }
//     if (categoryList.length == 0) {
//         res.status(500).send(data);
//     }else{
//         data = {
//             isSuccessed : true,
//             resultObj : categoryList,
//         }
//         res.status(200).send(data);
//     }
// });

// router.get("/getById/:id", async function(req, res){
//     var id = req.params.id;
//     const category = await Category.findOne({"_id" : id}).exec();
//     var data = {
//         isSuccessed : false,
//         resultObj : [],
//         message : "The category with the given ID was not found!",
//     }
//     if(!category){
//         res.status(500).send(data);
//     }else{
//         data = {
//             isSuccessed : true,
//             resultObj : category,
//             message : "",
//         }
//         res.status(200).send(data);
//     }
// });

// router.post("/create", authJwt.auth,  async function(req, res) {
//     let category = new Category({
//         name : req.body.name,
//         status: req.body.status,
//         domain : req.body.doamin,
//         nameNoSign : toSlug(req.body.name),
//         page : req.body.page
//     });
//     category = await category.save();
//     var data = {
//         isSuccessed : false,
//         resultObj : {},
//     }
//     if(!category){
//         return res.status(400).send(data);
//     }else{
//         data = {
//             isSuccessed : true,
//             resultObj : category
//         }
//         return res.status(200).send(data);
//     }
// });

// router.put("/edit/:id", authJwt.auth, async function(req, res){
//     debugger
//     const category = await Category.findByIdAndUpdate(
//         req.params.id,
//         {
//             name : req.body.name,
//             status : req.body.status,
//             domain : req.body.domain,
//             nameNoSign : toSlug(req.body.name),
//             page : req.body.page,
//         },
//         {new : true}
//     )
//     var data = {
//         isSuccessed : false,
//         resultObj : {},
//     }
//     if(!category){
//         return res.status(400).send(data);
//     }else{
//         data = {
//             isSuccessed : true,
//             resultObj : category,
//         }
//         return res.status(200).send(data);
//     }
// });

// router.delete("/delete/:id", authJwt.auth, async function(req, res){
//     Category.findByIdAndRemove(req.params.id).then(category =>{
//         var data = {
//             isSuccessed : false,
//             resultObj : {},
//         }
//         if(!category){
//             return res.status(400).send(data);
//         }else{
//             data = {
//                 isSuccessed : true,
//                 resultObj : category,
//             }
//             return res.status(200).send(data);
//         }
//     }).catch(err=>{
//        return res.status(500).json({success: false, error: err}) 
//     })
// });

// router.get('/getByNameNoSign/:nameNoSign', async function(req, res){
//     var query = Category.findOne({"nameNoSign" : req.params.nameNoSign}).exec();
//     var data = {
//         isSuccessed: false,
//         resultObj: [],
//     }
//     if (query != null) {
//         data = {
//             isSuccessed: true,
//             resultObj: query,
//         }
//         res.send(data);
//     } else {
//         res.send(data);
//     }
// })

// router.post('/createList', [authJwt.auth, authJwt.isAdmin], async function(req, res){
//     var list = req.body;
//     var listCate = [];
//     for( const item of list){
//         let cate = new Category({
//             name : item.name,
//             domain : item.domain,
//             status : item.status,
//             page : item.page,
//             nameNoSign : toSlug(item.name),
//         });
//         cate = await cate.save();
//         listCate.push(cate);
//     }
//     var data = {
//         isSuccessed : false,
//         resultObj : [],
//     }
//     if (listCate.length == 0) {
//         res.status(500).send(data);
//     }else{
//         data = {
//             isSuccessed : true,
//             resultObj : listCate,
//         }
//         res.status(200).send(data);
//     }
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