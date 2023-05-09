const {getAll}=require("../database/modules/users")





module.exports={
    getAllUsers:function(req,res){
        getAll( function(err, results){
            if(err) console.log(err)
            else res.json(results)
        })
    }
}
