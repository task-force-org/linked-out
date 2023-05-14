var express = require('express');
var router = express.Router();


const {getAllPostsCompanies,getOneCompanyPosts,addOnePost,deleteOnePost}=require("../controller/postCompanies")



router.get('/All',getAllPostsCompanies)
router.get('/:id',getOneCompanyPosts)
router.post('/:id', addOnePost);
router.delete('/:postId', deleteOnePost); 
module.exports = router;
