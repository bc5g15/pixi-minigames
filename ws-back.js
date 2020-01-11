const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081});

wss.on('connection', (ws) => {
    console.log("New Connection");
    // Send all history
});

/*
 * I'm expecting the message
 * to already be a JSON string
 */
function broadcast(message)
{
    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

