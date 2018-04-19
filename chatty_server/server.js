const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
// bringing in random uuid
const uuidv4 = require('uuid/v4');
// Set the port to 3001
const PORT = 3001;
// Create a new express server
// Make the express server serve static assets (html, javascript, css) from the /public folder
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// what the client does when they connect
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('error', () => {});   
    ws.on('message', (data) => {
    const dataParsed = JSON.parse(data);

    if (dataParsed.type === "postMessage") {
        // packages new message json to be sent to open clients as message
        const newMessage = {
            id: uuidv4(),
            type: "incomingMessage", 
            content: dataParsed.content, 
            username: dataParsed.username
        };
        // if there's a client in readystate, with a websocket open, send the JSON back
        for (const client of wss.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(newMessage));
            }
        }
    } 
    if (dataParsed.type === "postNotification") {
        console.log('SERVER DATA', dataParsed)
        const newNotification = {
            id: uuidv4(),
            type: "incomingNotification",
            username: dataParsed.username,
            prevUsername: dataParsed.prevName
        };
        // if there's a client in readystate, with a websocket open, send the JSON back
        for (const client of wss.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(newNotification));
            }
        }

    }

   

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});