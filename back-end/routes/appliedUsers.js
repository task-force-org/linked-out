var express = require('express');
var router = express.Router();

const {userApply,addApplierN,getAllAppliers} = require("../controller/appliedUsers")


router.post("/apply",userApply)
router.patch("/apply",addApplierN)
router.get("/apply/:id",getAllAppliers)



module.exports = router;
