const conn=require("../index")





module.exports={
    apply:function(application,Callback){
const sql="insert into `applied_users_tab` values "+` (${application.idposts}, ${application.idcompany},${application.userID}) `
conn.query(sql,function(err,result){
    Callback(err,result)
})
    },
    nOfAppliers: function(n,Callback){
        const sql="update `posts-company` SET `post_aplliers`= "+`${n.number}`+" where `idposts-company`="+`${n.id}`
        conn.query(sql,function(err, result){
          Callback(err,result)
        })
      
      },
      getAll:function(id,Callback){
        const sql="select * from `applied_users_tab` where `posts-company_idposts-company`= "+`${id}`
        conn.query(sql,function(err, result){
            Callback(err,result)
          })
      }
    
}