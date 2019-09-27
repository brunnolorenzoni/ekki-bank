const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/user/:id', userController.getUser);
router.get('/user/find/cpf/', userController.findUserByCPF);

module.exports = router;