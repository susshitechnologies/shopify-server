const express = require('express')
const sendMessagesController = require('../controllers/sendMessageController');

const router = express.Router();


router.post('/sendMessage', sendMessagesController.sendMessage);


module.exports = router;