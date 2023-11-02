const express = require('express');
const router = express.Router();
const {getAllPermission} = require('../controllers/permission.js');

router.get('/getPermissions',getAllPermission)

module.exports = router