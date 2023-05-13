const {getAllPosts,getOneCompany,addone,deletePost}=require("../database/modules/postCompanies")





module.exports={

    getAllPostsCompanies:function(req,res){
        getAllPosts(function(err,result){
            if(err) console.log(err)
            else res.json(result)
        })

        
    },
    getOneCompanyPosts: function(req,res){
        getOneCompany(req.params.id,function(err,result){
            if(err) console.log(err)
            else res.json(result)
        })
    },
    addOnePost: function(req, res) {
        const post = req.body;
        addone(post, function(err, result) {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {

            console.log(post);
            res.json(result);
          }
        });
      },
      deleteOnePost:function(req,res){
        const postID = req.params.postId;
          deletePost(postID,function(err,result){
              if(err) console.log(err)
              else res.json(result)
          })
      }
}
