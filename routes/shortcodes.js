const Tag = require('../models/tag');
const Category = require('../models/category');
const Shortcode = require('../models/shortcode');
const Post = require('../models/post');
const express = require('express');
var app = express();
const router = express.Router();
var bodyParser = require('body-parser');
//middleware
router.use(bodyParser.json());
//create appplication/x-www-form-urlencoded parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(function (req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
})
var mongoose = require('mongoose');
const authJwt = require('../middleware/auth');

router.get('/getAll', async function (req, res) {
    var result = await Shortcode.find({}).exec();
    if (result.length != 0) {
        return res.send(result);
    }
    return res.status(500).send(result);
})

router.get('/getById/:id', async function (req, res) {
    var id = req.params.id;
    var result = await Shortcode.findOne({"_id" : id}).exec();
    if (result != null) {
        return res.send(result);
    }
    return res.status(500).send(result);
})

router.post('/create', async function (req, res) {
    let shortCode = new Shortcode({
        name: req.body.name,
        content: req.body.content,
        shortCode: req.body.shortCode,
    });
    shortCode = await shortCode.save();
    var data = {
        isSuccessed: false,
        resultObj: {},
    }
    if (!shortCode) {
        return res.status(400).send(data);
    } else {
        data = {
            isSuccessed: true,
            resultObj: shortCode,
        }
        return res.status(200).send(data);
    }
});

router.put("/edit/:id", authJwt.auth, async function (req, res) {
    const shortcode = await Shortcode.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            content: req.body.content,
            shortCode: req.body.shortCode,
        },
        { new: true }
    )
    var data = {
        isSuccessed: false,
        resultObj: {},
    }
    if (!shortcode) {
        return res.status(400).send(data);
    } else {
        data = {
            isSuccessed: true,
            resultObj: shortcode,
        }
        return res.status(200).send(data);
    }
});

router.delete("/:id", authJwt.auth, function (req, res) {
    Shortcode.findByIdAndRemove(req.params.id).then(shortcode => {
        var data = {
            isSuccessed: false,
            resultObj: {},
        }
        if (!shortcode) {
            return res.status(400).send(data);
        } else {
            data = {
                isSuccessed: true,
                resultObj: shortcode,
            }
            return res.status(200).send(data);
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    })
})
module.exports = router;