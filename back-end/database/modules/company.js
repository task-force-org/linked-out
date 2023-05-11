const cloudinary = require("../../utils/cloudinary")
const conn = require("../index")

module.exports = {
    getAll: function (callback) {
        const sql = 'SELECT * FROM `company`'
        conn.query(sql, function (err, result) {
            callback(err, result)
        })
    },

    getOne: function (id, callback) {
        const sql = `SELECT * FROM company WHERE idcompany="${id}"`
        conn.query(sql, (err, result) => {
            callback(err, result)
        })
    },

    addOne: function (data, callback) {
        // Upload profile_pic to Cloudinary
        cloudinary.uploader.upload(data.profile_pic, (err, result) => {
            if (err) callback(err, null);
            else data.profile_pic = result.secure_url;
            // Replace profile_pic URL with Cloudinary URL
            const sql = 'INSERT INTO company SET ?'
            conn.query(sql, data, (err, result) => {
                callback(err, result)
            })
        });
    },

    updateOne: function (id, data, callback) {
        // Check if profile_pic is being updated
        if (data.profile_pic) {
            // Upload new profile_pic to Cloudinary
            cloudinary.uploader.upload(data.profile_pic, function (err, result) {
                if (err) callback(err, null);
                else data.profile_pic = result.secure_url;
                // Replace profile_pic URL with Cloudinary URL
                const sql = `UPDATE company SET ? WHERE idcompany="${id}"`
                conn.query(sql, data, (err, result) => {
                    callback(err, result)
                })
            });
        } else {
            const sql = `UPDATE company SET ? WHERE idcompany="${id}"`
            conn.query(sql, data, (err, result) => {
                callback(err, result)
            })
        }
    },

    deleteOne: function (id, callback) {
        const sql = `DELETE FROM company WHERE idcompany="${id}"`
        conn.query(sql, (err, result) => {
            callback(err, result)
        })
    }
}
// const cloudinary = require('cloudinary').v2;

// // Set up Cloudinary credentials
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });
