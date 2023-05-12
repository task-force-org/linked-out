var express = require('express');
var router = express.Router();
var company = require('../controller/company')

//for company
router.get('/get', company.getAll);
router.get('/get/:id', company.getOne);
router.get('/email/:email', company.getFrom);
router.post('/', company.addOne);
router.post("/authenticate",company.authenticate)
router.put('/:id', company.updateOne);
router.delete('/:id', company.deleteOne);
module.exports = router;