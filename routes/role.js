const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize')
const {getAllRole, editRolePermission, addNewRole, deleteRole, editRole} = require('../controllers/role.js');
const permissionFieldName = require('../helpers/permissionFieldName.js')
const permissionFunction = require('../helpers/permissionFunction.js')

router.get('/getRoles', authorize(),getAllRole)
router.patch('/editRolePermission', authorize(permissionFunction.USER,permissionFieldName.EDIT), editRolePermission)
router.post('/addNewRole', authorize(permissionFunction.USER,permissionFieldName.ADD), addNewRole)
router.post('/deleteRole', authorize(permissionFunction.USER, permissionFieldName.DELETE), deleteRole)
router.patch('/editRole',  authorize(permissionFunction.USER, permissionFieldName.EDIT, editRole), editRole)

module.exports = router