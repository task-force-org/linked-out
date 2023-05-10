const conn=require("../index")





module.exports={
  getAllPosts: function(Callback){
    const sql= "select p.post_title, p.post_img, p.post_description, p. post_date, c.company_name, c.img from `posts-company` p inner join company c on c.idcompany=`idposts-company`"
    conn.query(sql,function(err, result){
      Callback(err,result)
    })

}
  
  }

