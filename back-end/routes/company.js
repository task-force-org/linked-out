var express = require('express');
var router = express.Router();
var company = require('../controller/company')

//for company
router.get('/get', company.getAllCompanies);
router.get('/get/:id', company.getCompanyById);
router.post('/', company.addCompany);
router.put('/:id', company.updateCompany);
router.delete('/:id', company.deleteCompany);

module.exports = router;