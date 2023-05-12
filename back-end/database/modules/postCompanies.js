const conn=require("../index")



// "select p.post_title, p.post_aplliers,p.posts_details, p.post_img, p.post_description, p. post_date, c.company_name, c.img, c.idcompany from `posts-company` p left join company c on c.idcompany=`idposts-company`"

module.exports={
  getAllPosts: function(Callback){
    const sql= "select p.`idposts-company`, p.post_title, p.post_aplliers,p.posts_details, p.post_img, p.post_description, p. post_date, c.company_name, c.img, c.idcompany from `posts-company` p left join company c on c.idcompany=`idposts-company`"
    conn.query(sql,function(err, result){
      Callback(err,result)
    })

},
getOneCompany: function(id,Callback){

  const sql="select * from `posts-company` where `company_idcompany` "+`${'='+id}`
  conn.query(sql,function(err, result){
    Callback(err,result)
  })

},


  
  }

