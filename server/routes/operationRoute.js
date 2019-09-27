const router = require('express').Router();
const operationController = require('../controllers/operationController');

router.post('/', operationController.transfer);

module.exports = router;