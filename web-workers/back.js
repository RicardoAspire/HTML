onmessage = function(e){
    console.log('Message received');
    var workerResult = (e.data[0] * e.data[1]);
    console.log('Posting message back to main script ');
    this.postMessage(workerResult);
}