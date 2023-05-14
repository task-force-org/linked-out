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






module.exports={
    getAll: function(Callback){
        const sql= 'select * from `individual`'
        conn.query(sql,function(err, result){
          Callback(err,result)
        })
   
    }
    
    }