const conn=require("../index")
const cloudinary = require("../../utils/cloudinary")


// "select p.`idposts-company`, p.post_title, p.post_aplliers,p.posts_details, p.post_img, p.post_description, p. post_date, c.company_name, c.img, c.idcompany from `posts-company` p left join company c on c.idcompany=`idposts-company`"
module.exports={
  getAllPosts: function(Callback){
    const sql="SELECT  `idposts-company`,pc.post_title, pc.post_img, pc.post_description, pc.post_date, pc.post_aplliers,company_idcompany, c.company_name, c.description, c.email, c.img FROM `posts-company` pc JOIN `company` c ON pc.company_idcompany = c.idcompany"
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
addone : function(body, callback) {
  cloudinary.uploader.upload(body.post_img, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
          body.post_img = result.secure_url;
        // Replace profile_pic URL with Cloudinary URL
        const sql = 'INSERT INTO `posts-company`  SET ?'
        conn.query(sql, body, (err, result) => {
          callback(err, result)
        })
      }
    })



},
deletePost: function(postID, callback) {
  const sql = "DELETE FROM `posts-company` WHERE `idposts-company`="+`${postID}`;

  conn.query(sql,  function(err, result) {
    callback(err, result);
  });
}


  
  }

