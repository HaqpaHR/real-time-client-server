const express = require('express');
const cors = require('cors');
const event = require('events');

const PORT = 5000;

const emitter = new event.EventEmitter();

const app = express();
app.use(cors());

//emitter делает уведомление всем кто подключен к серверу

app.get('get-messages', (req, res) => {
    emitter.once('newMessage', (message) => {
        res.json(message)
    })
})

app.post('new-message', (req,res) => {
    const message = req.body;
    emitter.emit('newMessage', message) //таким образом и передается сообщение в emitter.once()
    res.status(200)
})

app.listen(PORT, () => {
    console.log(`Server start on port: ${PORT}`)
})
