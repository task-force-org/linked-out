var express = require('express');
var router = express.Router();


const {getAllUsers}=require("../controller/users")



router.get('/All',getAllUsers)
// complete your routes for the users
module.exports = router;
