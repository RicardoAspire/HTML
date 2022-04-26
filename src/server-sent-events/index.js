const app = require("express")();

app.get("/", (req, res) => res.send("Hello!"));

app.get("/stream", (req, res)=>{
    res.setHeader("Content-Type","text/event-stream");
    send(res)
});

let i = 0; 
function send (res){
    res.write("data: "+`Hello! ${i++}\n\n`);
    setTimeout(( ) => send(res),1000);
}

app.listen(8080);
console.log("Listen to 8080");

/* Commands to start listening for the messages
    In the explorer console 
    1.- let sse = new EventSource("http://localhost:8080/stream");
    2.- sse.onmessage = console.log
*/