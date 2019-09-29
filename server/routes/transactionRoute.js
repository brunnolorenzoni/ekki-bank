const router = require('express').Router();
const transactionController = require('../controllers/transactionController');

router.post('/transaction/', transactionController.transaction);
router.get('/user/:idUser/transactions/', transactionController.getAllTransactions);
router.get('/user/:idUser/transaction/:idTransaction', transactionController.getOneTransaction);

module.exports = router;