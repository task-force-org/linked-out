const conn = require("../index")


module.exports={
    getAll: function (id,callback) {
        const sql = "SELECT * FROM individual WHERE userID IN (SELECT individual_userID FROM applied_users_tab    WHERE `posts-company_company_idcompany` =  "+`${id}`+")"
        conn.query(sql, function (err, result) {
          callback(err, result)
        })
      }
}


                
              
