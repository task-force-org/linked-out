const conn=require("../index")




module.exports = {
  getAllPosts: function(callback) {
    const sql = "SELECT p.post_title, p.post_aplliers, p.post_details, p.post_img, p.post_description, p.post_date, c.company_name, c.img FROM `posts-company` p INNER JOIN company c ON c.idcompany = `idposts-company`";
    conn.query(sql, function(err, result) {
      callback(err, result);
    });
  },
};



