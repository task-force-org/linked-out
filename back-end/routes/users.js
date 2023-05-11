var express = require('express');
var router = express.Router();
var indiv = require('../controller/users');


//for individual
router.get('/get', indiv.getAllIndividuals);
router.get('/get/:id', indiv.getIndividualById);
router.post('/', indiv.addIndividual);
router.put('/:id', indiv.updateIndividual);
router.delete('/:id', indiv.deleteIndividual);




module.exports = router;