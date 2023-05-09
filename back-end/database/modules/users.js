const conn=require("../index")






module.exports={
    getAll: function(Callback){
        const sql= 'select * from `individual`'
        conn.query(sql,function(err, result){
          Callback(err,result)
        })
   
    }
    
    }