const router = require('express').Router();
const accountController = require('../controllers/accountController');

router.get('/user/:idUser/accounts/', accountController.getUserAccounts);
router.get('/user/:idUser/account/:idAccount', accountController.getOneAccount);

module.exports = router;