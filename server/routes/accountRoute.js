const router = require('express').Router();
const accountController = require('../controllers/accountController');

router.get('/user/:idUser/account/', accountController.getUserAccount);

module.exports = router;