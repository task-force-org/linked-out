var express = require('express');
var router = express.Router();
var {getAllAppliers} = require('../controller/application')



router.get("/applications/:id",getAllAppliers)


module.exports = router;