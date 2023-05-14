

  var express = require('express');
var router = express.Router();
const {getAllPostsIndividual,addOnePost,deleteOnePost}=require("../controller/postUsers")

//for individual posts


router.get('/:id',getAllPostsIndividual);
router.post('/:id', addOnePost);
router.delete('/:postId', deleteOnePost); 



module.exports = router;