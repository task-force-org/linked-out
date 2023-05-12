const {getAllPosts,getOneCompany}=require("../database/modules/postCompanies")





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
    }
}