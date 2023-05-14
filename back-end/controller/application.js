const {getAll} = require("../database/modules/application")




module.exports={
    getAllAppliers:function(req,res){
        getAll(req.params.id,function(err,result){
            if(err) console.log(err)
            else res.json(result)
        })
    }
}