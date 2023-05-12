var express = require('express');
var router = express.Router();
const {getAllPostsIndividual,addOnePost,deleteOnePost}=require("../controller/postUsers")

//for individual posts


router.get('/',getAllPostsIndividual);
router.post('/', addOnePost);
router.delete('/:postId', deleteOnePost); 



module.exports = router;