const websocket = require('ws');

const ws = new websocket.WebSocketServer({
    port: 5000,
}, () => console.log(`server started on 5000`))

ws.on('connection', function connection(websocket) {
    websocket.on('message', function (message) {
        message = JSON.parse(message);
        // websocket.send('Такой-то подключился') если нужно сообщить кто подключился
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
});

function broadcastMessage(message) {
    ws.clients.forEach(clientInformation => {
        clientInformation.send(JSON.stringify(message))
    })
}

const message = {
    event: 'message/connection',
    id: 123,
    date: '21.01.2021',
    username: 'Ulbi TV',
    message: 'Лайк'
}
