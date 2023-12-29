const express = require('express');
const http = require('http');
const cors = require('cors');
const WebSocket = require('ws');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const ws = new WebSocket.Server({ server });


var corsOptions = {
    origins: ['https://oroa-development.myshopify.com', 'https://oroa-development.myshopify.com/:1', 'https://springs-false-assets-suffering.trycloudflare.com'],
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());

//routes

app.use('/api', require('./routes/messagesRoutes'));
app.use('/api', require('./routes/sendMessageRoute'));


app.post('/api/messages', (req, res) => {
    const message = req.body.message;

    if(!message){
        return res.status(400).json({ error: "message is required"})
    }

    console.log(message, 'received');

    res.json({ success: true, message: 'success'})
});


app.get('/', (req, res) => {
    res.send('<html><body><h1>shopify api</h1></body></html>')
})


//------------------------------------ websockets

ws.on('connection', (ws) => {
    console.log('new client connected');

    ws.on('message', (message) => {

        ws.clients.forEach((client) => {
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(message)
            }
        }); 
    });

    ws.on('close', () => {
        console.log('client disconnected')
    })

});


mongoose.connect('mongodb+srv://danluck:maxpayne5@cluster0.2nchudr.mongodb.net/', 
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('connected to mongoDB'))
.catch(err => console.error('error', err))


server.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})