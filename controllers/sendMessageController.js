const Message = require('../models/Message')

const sendMessage = async (req, res) => {

    const { message } = req.body

    try {
        if(!message){
            res.status(400).json({ error: 'message required'}) 
        }

        const result = await Message.create({
            content: message
        })


        res.status(201).json({ success: result })



    } catch(error){
        res.status(500).json({ error: 'server error'})

    }

}

module.exports = { sendMessage }