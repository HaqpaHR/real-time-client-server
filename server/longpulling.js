// const express = require('express');
// const cors = require('cors');
// const event = require('events');
//
// const PORT = 5000;
//
// const emitter = new event.EventEmitter();
//
// const app = express();
// app.use(cors());
// app.use(express.json())
//
// //emitter делает уведомление всем кто подключен к серверу. Т.е. мы отправляем запрос и ждем, но не получаем ответ, получается подписываемся на событие и ждем
// // после того как другой пользователь отправил сообщение, тот кто отправил запрос получит и ответ
//
// app.get('/get-messages', (req, res) => {
//     emitter.once('newMessage', (message) => {
//         res.json(message)
//     })
// })
//
// app.post('/new-messages', (req,res) => {
//     const message = req.body;
//     emitter.emit('newMessage', message) //таким образом и передается сообщение в emitter.once()
//     res.status(200)
// })
//
// app.listen(PORT, () => {
//     console.log(`Server start on port: ${PORT}`)
// })

const express = require('express');
const cors = require('cors');
const events = require('events')
const PORT = 5000;

const emitter = new events.EventEmitter();

const app = express()

app.use(cors())
app.use(express.json())

app.get('/get-messages', (req, res) => {
    emitter.once('newMessage', (message) => {
        res.json(message)
    })
})

app.post('/new-messages', ((req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    res.status(200)
}))


app.listen(PORT, () => console.log(`server started on port ${PORT}`))
