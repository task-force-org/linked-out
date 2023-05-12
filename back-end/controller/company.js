const companyModel = require('../database/modules/company')
const companyController = {
    getAll: (req, res) =>{
      companyModel.getAll((err, result) =>{
        if (err) {
          console.log(err)
          res.status(500).json("no company")
        } else {
          res.status(200).json(result)
        }
      })
    },
  
    getOne: (req, res)=> {
      const id = req.params.id
      companyModel.getOne(id,(err, result)=> {
        if (err) {
          console.log(err)
          res.status(500).json("none with this id")
        } else {
          res.status(200).json(result[0])
        }
      })
    },
    getFrom:(req,res)=>{
      const email = req.params.email
      console.log(email)
      companyModel.getData(email,(err, result) =>{
        if (err) {
          console.log(err)
          res.status(500).json("none with this id")
        } else {
          res.status(200).json(result[0])
        }
      })
    },
  
    addOne: (req, res)=> {
      const data = req.body
      companyModel.addOne(data, (err, result)=> {
        if (err) {
          console.log(err)
          res.status(500).json( 'Unable to add company')
        } else {
          res.status(201).json(result)
        }
      })
    },
  
    updateOne:(req, res)=> {
      const id = req.params.id
      const data = req.body
      companyModel.updateOne(id, data,(err, result)=> {
        if (err) {
          console.log(err)
          res.status(500).json ("none id")
        } else {
          res.status(200).json(result)
        }
      })
    },
  
    deleteOne: (req, res)=> {
      const id = req.params.id
      companyModel.deleteOne(id, (err, result)=> {
        if (err) {
          console.log(err)
          res.status(500).json("none id")
        } else {
          res.status(200).json(result)
        }
      })
    },
  
    authenticate:(req, res)=> {
      const email = req.body.email
      const password = req.body.password
      companyModel.authenticate(email, password, (err, result)=> {
        if (err) {
          console.log(err)
          res.status(500).json("cant do")
        } else {
          res.status(200).json(result)
        }
      })
    }
  }
  
  module.exports = companyController