const conn=require("../index")
const cloudinary = require("../../utils/cloudinary")

 module.exports = {
    getAllPosts: function(callback) {
      const sql = "SELECT p.`idposts-users`, p.post_title, p.post_aplliers, p.post_details, p.post_img, p.post_description, p.post_date, i.full_name, i.profile_pic FROM `posts-users` p INNER JOIN individual i ON p.individual_userID = i.userID";
      conn.query(sql, function(err, result) {
        callback(err, result);
      });
    },

    addPost: function(body, callback) {
        cloudinary.uploader.upload(body.post_img, (err, result) => {
            if (err) {
              callback(err, null)
            } else {
                body.post_img = result.secure_url;
              // Replace profile_pic URL with Cloudinary URL
              const sql = 'INSERT INTO `posts-users`  SET ?'
              conn.query(sql, body, (err, result) => {
                callback(err, result)
              })
            }
          })


     
    },

            deletePost: function(postID, callback) {
              const sql = "DELETE FROM `posts-users` WHERE `idposts-users`="+`${postID}`;
         
              conn.query(sql,  function(err, result) {
                callback(err, result);
              });
            }





  }