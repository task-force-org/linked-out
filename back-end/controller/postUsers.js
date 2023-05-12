const {getAllPosts,addPost, deletePost}=require("../database/modules/postUsers");


module.exports={

    getAllPostsIndividual:function(req,res){
        getAllPosts(function(err,result){
            if(err) console.log(err)
            else res.json(result)
        })

        
    },
    addOnePost: function(req, res) {
        const post = req.body;
        addPost(post, function(err, result) {
          if (err) {
            console.log(post);
            res.sendStatus(500);
          } else {

            console.log(post);
            res.json(result);
          }
        });
      },
    deleteOnePost:function(req,res){
      const postID = req.params.id;
        deletePost(postID,function(err,result){
            if(err) console.log(err)
            else res.json(result)
        })
    }
}