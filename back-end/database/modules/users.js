const cloudinary = require("../../utils/cloudinary")
const conn = require("../index")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

module.exports = {
  getAll: function (callback) {
    const sql = 'SELECT * FROM `individual`'
    conn.query(sql, function (err, result) {
      callback(err, result)
    })
  },

  getOne: function (id, callback) {
    const sql = `SELECT * FROM individual WHERE userID="${id}"`
    conn.query(sql, (err, result) => {
      callback(err, result)
    })
  },
  getData:function(email,callback){
    const sql = `SELECT * FROM individual WHERE email="${email}"`
    conn.query(sql, (err, result) => {
      callback(err, result)
    })
  },

  addOne: function (data, callback) {
    // Hash the password before storing it in the database
    //10 is the number of salt rounds
    bcrypt.hash(data.password, 10, function(err, hash) {
      if (err) {
        callback(err, null)
      } else {
        data.password = hash
        // Upload pic to Cloudinary
        cloudinary.uploader.upload(data.profile_pic, (err, result) => {
          if (err) {
            callback(err, null)
          } else {
            data.profile_pic = result.secure_url;
            // Replace profile_pic URL with Cloudinary URL
            const sql = 'INSERT INTO individual SET ?'
            conn.query(sql, data, (err, result) => {
              callback(err, result)
            })
          }
        })
      }
    })
  },

  updateOne: function (id, data, callback) {
    // Check if picture is updated
    if (data.profile_pic) {
      // Upload newpic to Cloudinary
      cloudinary.uploader.upload(data.profile_pic, (err, result) => {
        if (err) callback(err, null);
        else data.profile_pic = result.secure_url;
        // Replace profile_pic URL with Cloudinary URL
        const sql = `UPDATE individual SET ? WHERE userID="${id}"`
        conn.query(sql, data, (err, result) => {
          callback(err, result)
        })
      })
    } else {
      const sql = `UPDATE individual SET ? WHERE userID="${id}"`
      conn.query(sql, data, (err, result) => {
        callback(err, result)
      })
    }
  },

  deleteOne: function (id, callback) {
    const sql = `DELETE FROM individual WHERE userID="${id}"`
    conn.query(sql, (err, result) => {
      callback(err, result)
    })
  },

  authenticate: function(email, password, callback) {
    const sql = `SELECT * FROM individual WHERE email="${email}"`
  
    conn.query(sql, (err, result) => {
      if (err) {
        callback(err, null)
      } else if (!result[0]) {
        callback("Email not found", null)
      } else {
        bcrypt.compare(password, result[0].password, function(err, res) {
          if (res) {
            const token = jwt.sign({
              userID: result[0].userID,
              email: result[0].email
            },"life");
            callback(null, token)
          } else {
            callback("Incorrect password", null)
          }
        })
      }
    })
  }
  
}
