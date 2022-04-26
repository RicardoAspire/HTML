const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8082});
wss.binaryType = 'blob'

wss.on("connection",ws => {
    console.log("New client connected!");

    ws.on("message", data =>{
        console.log(`Client has sent us: ${data}`);
        ws.send(data);
    });
    
    ws.on("close", () =>{
        console.log("Client has disconnected!");
    });
});