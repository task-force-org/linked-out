var express = require('express');
var router = express.Router();
var indiv = require('../controller/users');


//for individual
router.get('/get', indiv.getAllUsers);
router.get('/get/:id', indiv.getOneUser);
router.get('/email/:email', indiv.getFrom);
router.post('/', indiv.addOneUser);
router.post("/authenticate",indiv.authenticateUser)
router.put('/:id', indiv.updateOneUser);
router.delete('/:id', indiv.deleteOneUser);




module.exports = router;