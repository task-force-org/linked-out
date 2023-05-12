const conn=require("../index")


 module.exports = {
    getAllPosts: function(callback) {
      const sql = "SELECT p.post_title, p.post_aplliers, p.post_details, p.post_img, p.post_description, p.post_date, i.full_name, i.profile_pic FROM `posts-users` p INNER JOIN `individual` i ON p.individual_userID = i.userID";
      conn.query(sql, function(err, result) {
        callback(err, result);
      });
    },
    
    addPost: function(post, callback) {
    
    
      const sql = "INSERT INTO `posts-users` (post_title, post_img, post_description, post_date, post_aplliers, individual_userID, post_details) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [post.post_title, post.post_img, post.post_description, post.post_date, post.post_aplliers, post.individual_userID, post.post_details];
      conn.query(sql, values, function(err, result) {
        callback(err, result);
      });
    },
       
            deletePost: function(postID, callback) {
              const sql = "DELETE FROM `posts-users` WHERE `idposts-users`=?";
              const values = [postID];
              conn.query(sql, values, function(err, result) {
                callback(err, result);
              });
            }
          
          
     
      

  }

  