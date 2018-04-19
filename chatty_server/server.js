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


wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

const broadcastFriendCount = () => {
    wss.broadcast(JSON.stringify({
        type: 'newFriendsCount',
        numFriends: wss.clients.size,
    }));
};


const randomColorGen = (colors) => {
    const colorList = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
    const color = colorList[Math.floor(Math.random()*colorList.length)];
    return color;
};








// what the client does when they connect
wss.on('connection', (ws) => {
    const userColor = randomColorGen();
    console.log('Client connected');
    broadcastFriendCount();

    ws.on('error', () => {});   
    ws.on('message', (data) => {
    const dataParsed = JSON.parse(data);

    if (dataParsed.type === "postMessage") {
        // packages new message json to be sent to open clients as message
        const newMessage = {
            id: uuidv4(),
            type: "incomingMessage", 
            content: dataParsed.content, 
            username: dataParsed.username,
            userColor: userColor,
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
            prevUsername: dataParsed.prevUsername,
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
    ws.on('close', () => {
        console.log('Client disconnected');
        broadcastFriendCount();
    }); 
});