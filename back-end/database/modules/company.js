const cloudinary = require("../../utils/cloudinary")
const conn = require("../index")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

module.exports = {
  getAll:(callback)=> {
    const sql = 'SELECT * FROM `company`'
    conn.query(sql, (err, result)=> {
      callback(err, result)
    })
  },

  getOne: (id, callback)=> {
    const sql = `SELECT * FROM company WHERE idcompany="${id}"`
    conn.query(sql, (err, result) => {
      callback(err, result)
    })
  },
  getData:(email,callback)=>{
    const sql = `SELECT * FROM company WHERE email="${email}"`
    conn.query(sql, (err, result) => {
      callback(err, result)
    })
  },

  addOne: (data, callback)=> {
    //thashi l password w 10 heya kadesh men rounds
    bcrypt.hash(data.password, 10,(err, hash)=> {
      if (err) {
        callback(err, null)
      } else {
        data.password = hash
        //cloudinary upload
        cloudinary.uploader.upload(data.img, (err, result) => {
          if (err) callback(err, null)
          else data.img = result.secure_url;
        //replace pic with cloudinary link pic
          const sql = 'INSERT INTO company SET ?'
          conn.query(sql, data, (err, result) => {
            callback(err, result)
          })
        })
      }
    })
  },

  updateOne:  (id, data, callback)=> {
    // Check if picture is updated
    if (data.profile_pic) {
      // Upload newpic to Cloudinary
      cloudinary.uploader.upload(data.img, (err, result) => {
        if (err) callback(err, null);
        else data.img= result.secure_url;
        // Replac pic URL with Cloudinary URL
        const sql = `UPDATE company SET ? WHERE idcompany="${id}"`
        conn.query(sql, data, (err, result) => {
          callback(err, result)
        })
      })
    } else {
      const sql = `UPDATE company SET ? WHERE idcompany="${id}"`
      conn.query(sql, data, (err, result) => {
        callback(err, result)
      })
    }
  },

  deleteOne: (id, callback)=> {
    const sql = `DELETE FROM company WHERE idcompany="${id}"`
    conn.query(sql, (err, result) => {
      callback(err, result)
    })
  },

  authenticate:(email, password, callback) =>{
    const sql = `SELECT * FROM company WHERE email="${email}"`
  
    conn.query(sql, (err, result) => {
      if (err) {
        callback(err, null)
      } else if (!result[0]) {
        callback("Email not found", null)
      } else {
        bcrypt.compare(password, result[0].password,(err, res)=> {
          if (res) {
            const token = jwt.sign({
              idcompany: result[0].idcompany,
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
