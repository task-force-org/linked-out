var express = require('express');
var router = express.Router();


const {getAllPostsCompanies}=require("../controller/postCompanies")



router.get('/All',getAllPostsCompanies)


module.exports = router;
