const router = require('express').Router();
const transactionController = require('../controllers/transactionController');

router.post('/transaction/favored/', transactionController.transferToFavored);
router.post('/transaction/contact/', transactionController.transferToContact);
router.get('/user/:idUser/transactions/', transactionController.getAllTransactions);
router.get('/user/:idUser/transaction/:idTransaction', transactionController.getOneTransaction);

module.exports = router;