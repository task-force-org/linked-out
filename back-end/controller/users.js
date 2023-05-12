
const userModel = require('../database/modules/users')

exports.getAllUsers =  (req, res)=> {
  userModel.getAll((err, result)=> {
    if (err) {
      console.error(err)
      res.status(500).send('error')
    } else {
      res.json(result)
    }
  })
}

exports.getOneUser = (req, res)=> {
  const id = req.params.id
  userModel.getOne(id, (err, result)=> {
    if (err) {
      console.error(err)
      res.status(500).send(`no id detected`)
    } else {
      res.json(result)
    }
  })
}
exports.getFrom=(req,res)=>{
    const email = req.params.email
    userModel.getData(email, (err, result)=> {
      if (err) {
        console.log(err)
        res.status(500).json("none with this email")
      } else {
        res.status(200).json(result[0])
      }
    })
  }


exports.addOneUser = (req, res)=> {
  const data = req.body
  userModel.addOne(data,(err, result)=> {
    if (err) {
      console.error(err)
      res.status(500).send('An error occurred while adding user')
    } else {
      res.json(result)
    }
  })
}

exports.updateOneUser =(req, res)=> {
  const id = req.params.id
  const data = req.body
  userModel.updateOne(id, data, (err, result)=> {
    if (err) {
      console.error(err)
      res.status(500).send(`no id detected`)
    } else {
      res.json(result)
    }
  })
}

exports.deleteOneUser = (req, res)=> {
  const id = req.params.id
  userModel.deleteOne(id, (err, result)=> {
    if (err) {
      console.error(err)
      res.status(500).send(`no id detected`)
    } else {
      res.json(result)
    }
  })
}


exports.authenticateUser = function (req, res) {
  const email = req.body.email
  const password = req.body.password
  userModel.authenticate(email, password, function (err, result) {
    if (err) {
      console.error(err)
      res.status(401).send('Authentication failed')
    } else {
      res.json(result)
    }
  })
}