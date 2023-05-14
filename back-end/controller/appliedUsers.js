const {apply,nOfAppliers,getAll} = require("../database/modules/appliedUsers")





module.exports={
    userApply:function(req,res){
        apply(req.body,function(err,result){
            if(err) console.log(err)
            else res.json(result)
        }) 
    },
    addApplierN:function(req,res){
        nOfAppliers(req.body,function(err,result){
            if(err) console.log(err)
            else res.json(result)
        })
    },
    getAllAppliers:function(req,res){
        getAll(req.params.id,function(err,result){
            if(err) console.log(req.params.id)
            else res.json(result)
        }) 
    
    }
}