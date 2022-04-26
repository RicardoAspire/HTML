/* EDITABLE CONTENT */
const editable = document.getElementById("editable");
const editableButton = document.getElementById("editableButton");
const uneditableButton = document.getElementById("uneditableButton");

editableButton.onclick = function(){
  editable.contentEditable = true;
}
uneditableButton.onclick = function(){
  editable.contentEditable = false;
}

/* DRAG AND DROP */
const box = document.querySelector('#box');
const bigBox = document.querySelector('#bigBox');
/* 
box.addEventListener('dragstart', e=>{
  console.log('Drag start');
});
box.addEventListener('dragend', e=>{
  console.log('Drag end');
});
box.addEventListener('drag', e=>{
  console.log('Drag');
}); 
*/
bigBox.addEventListener('dragenter', e =>{
  console.log('drag enter');
});
bigBox.addEventListener('dragleave', e =>{
  console.log('drag leave');
});
bigBox.addEventListener('dragover', e =>{
  e.preventDefault();
  console.log('drag over');
});
bigBox.addEventListener('drop', e =>{
  console.log('drop');
  bigBox.appendChild(box);
});

/* WEB WORKERS */
const worker = new Worker('worker.js');
new Worker(URL.createObjectURL(new Blob(["("+worker_function.toString()+")()"], {type: 'text/javascript'})));

const sumButton = document.querySelector("#sumButton");
const bgButton = document.querySelector("#bgButton");

sumButton.addEventListener("click", (event) => {
  worker.postMessage('Hello');
});

bgButton.addEventListener("click", event =>{
  if(document.body.style.background != "green"){
    document.body.style.background = "green";
  }else{
    document.body.style.background = "blue";
  }
});