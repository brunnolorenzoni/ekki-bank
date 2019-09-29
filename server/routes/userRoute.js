const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/user/:id', userController.findUser);
router.post('/user/find/cpf/', userController.findUser);

module.exports = router;