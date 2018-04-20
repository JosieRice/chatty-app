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

// general broadcast function, but be used with specific broadcasts below
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

// broadcasts a unique color when you first log in with current count of chatters
const broadcastFriendCount = () => {
    const userColor = randomColorGen();
    wss.broadcast(JSON.stringify({
        type: 'newFriendsCount',
        numFriends: wss.clients.size,
        userColor: userColor,
    }));
};

// creates a random color
const randomColorGen = (colors) => {
    const colorList = ["red","orange","green","blue","purple","pink","tomato"];
    const color = colorList[Math.floor(Math.random()*colorList.length)];
    return color;
};

// what the client does when they connect
wss.on('connection', (ws) => {
    // const userColor = randomColorGen();
    console.log('Client connected');
    broadcastFriendCount();

    ws.on('error', () => {});   
    ws.on('message', (data) => {
        const dataParsed = JSON.parse(data);

        const newMessage = {
            id: uuidv4(),
            username: dataParsed.username,
        }

        if (dataParsed.type === "postMessage") {
            // packages new message json to be sent to open clients as message
            newMessage.type = "incomingMessage"; 
            newMessage.content = dataParsed.content;
            newMessage.color = dataParsed.color;
            // if there's a client in readystate, with a websocket open, send the JSON back
        } 
        if (dataParsed.type === "postNotification") {
            console.log('SERVER DATA', dataParsed)
                newMessage.type = "incomingNotification";
                newMessage.prevUsername = dataParsed.prevUsername;
            // if there's a client in readystate, with a websocket open, send the JSON back
        }
        wss.broadcast(JSON.stringify(newMessage));
    });
    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        console.log('Client disconnected');
        broadcastFriendCount();
    }); 
});