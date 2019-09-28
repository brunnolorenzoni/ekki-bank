const router = require('express').Router();
const transactionController = require('../controllers/transactionController');

router.post('/', transactionController.transfer);

module.exports = router;