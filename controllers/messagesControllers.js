const Message = require('../models/Message')


const fetchAllMessages = async (req, res) => {

    try {

        const messages = await Message.find();

        if(!messages) return res.status(204).json({ 'message': 'not messages found'})

        res.json(messages)



    } catch(error){
        res.status(500).json({ error: 'server error'})

    }

}


module.exports = { fetchAllMessages }