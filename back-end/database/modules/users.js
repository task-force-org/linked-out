const cloudinary = require("../../utils/cloudinary")
const conn = require("../index")
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

  addOne: function (data, callback) {
    // Upload profile_pic to Cloudinary
    cloudinary.uploader.upload(data.profile_pic, (err, result) => {
      if (err) callback(err, null)
      else data.profile_pic = result.secure_url;
      // Replace profile_pic URL with Cloudinary URL
      const sql = 'INSERT INTO individual SET ?'
      conn.query(sql, data, (err, result) => {
        callback(err, result)
      })

    });
  },

  updateOne: function (id, data, callback) {
    // Check if profile_pic is being updated
    if (data.profile_pic) {
      // Upload new profile_pic to Cloudinary
      cloudinary.uploader.upload(data.profile_pic, (err, result) => {
        if (err) callback(err, null);
        else data.profile_pic = result.secure_url;
        // Replace profile_pic URL with Cloudinary URL
        const sql = `UPDATE individual SET ? WHERE userID="${id}"`
        conn.query(sql, data, (err, result) => {
          callback(err, result)
        })

      });
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
  }
}
