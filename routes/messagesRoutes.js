const express = require('express')
const messagesController = require('../controllers/messagesControllers');

const router = express.Router();


router.get('/getAllMessages', messagesController.fetchAllMessages);


module.exports = router;