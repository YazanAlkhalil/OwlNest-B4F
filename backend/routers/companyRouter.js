const express = require('express');
const router = express.Router();
const companyController = require('../controllers/compnayController')
const protectRoute = require('../middlewares/protectRoute');

router.post('/:companyId/users/:userId', protectRoute.protectRoute , companyController.addUserToCompnay)
router.get('/:companyId/users', companyController.getUsersFromCompany)
router.put('/:companyId/users/:userId', companyController.updateUserRole)
router.delete('/:companyId/users/:userId', companyController.removeUserFromCompany)

module.exports = router