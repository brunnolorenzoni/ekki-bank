const router = require('express').Router();
const contactController = require('../controllers/contactController');

router.get('/user/:idUser/contacts/', contactController.getUserContacts);
router.get('/user/:idUser/contact/:idContact', contactController.getOneContact);
router.post('/user/:idUser/contact/add', contactController.addContact);
router.delete('/user/:idUser/contact/:idContact/delete/', contactController.deleteContact);


module.exports = router;