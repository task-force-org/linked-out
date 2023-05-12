var express = require('express');
var router = express.Router();


const {getAllPostsCompanies,getOneCompanyPosts}=require("../controller/postCompanies")



router.get('/All',getAllPostsCompanies)
router.get('/:id',getOneCompanyPosts)


module.exports = router;
