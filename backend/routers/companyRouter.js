const express = require('express');
const router = express.Router();
const companyController = require('../controllers/compnayController')

router.post('/:companyId/users', companyController.addUserToCompnay)
router.get('/:companyId/users', companyController.getUsersFromCompany)
router.put('/:companyId/users/:userId', companyController.updateUserRole)
router.delete('/:companyId/users/:userId', companyController.removeUserFromCompany)
router.get('/company/:companyId/role', companyController.getRole)
router.get('/companies', companyController.getCompanies)

module.exports = router