/* FORM VALIDATION */

// Array of cities
const cities = ["Puebla", "Guadalajara", "CDMX","Monterrey","Sinaloa","Tlaxcala"];
const genders = ["Male", "Female", "Other"];

//Take the element from the DOM 
var select = document.getElementById('city');
var selectGender = document.getElementById('gender');

//For each item in my cities array I will add that option
for (var i = 0; i<cities.length; i++){
    var opt = document.createElement('option');
    opt.value = cities[i];
    opt.innerHTML = cities[i];
    select.appendChild(opt);
}
for (var i = 0; i<genders.length; i++){
  var inp = document.createElement('input');
  inp.setAttribute('type','radio');
  inp.setAttribute('name','gender');
  inp.setAttribute('value',genders[i]);
  inp.setAttribute('id',genders[i]);
  var inpTwo = document.createElement('label');
  inpTwo.innerHTML = genders[i];
  selectGender.appendChild(inp);
  selectGender.appendChild(inpTwo);
}

const form  = document.getElementsByTagName('form')[0];
const email = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');

email.addEventListener('input', function (event) {
  if (email.validity.valid) {
    emailError.textContent = ''; 
    emailError.className = 'error';
  } else {
    showError();
  }
});

form.addEventListener('submit', function (event) {
  if(!email.validity.valid) {
    showError();
    event.preventDefault();
  }
});

function showError() {
  if(email.validity.valueMissing || email.validity.typeMismatch || email.validity.tooShort) {
    emailError.textContent = `You need to enter an e-mail valid format with at least ${email.minLength} characters.`;
  }
  emailError.className = 'error active';
} 

/* WEB COMPONENTS AND CUSTOM ELEMENTS */
class helloWorld extends HTMLElement{
    constructor(){
        super();
        this.name;
        this.surname;
    }
    static get observedAttributes(){
        return ['name',"surname"];
    }
    attributeChangedCallback(nameAtr, oldValue, newValue){
        switch(nameAtr){
            case "name": 
                this.name = newValue; 
            break;
            case "surname": 
                this.surname = newValue; 
            break;
        }
    }
    connectedCallback(){
        const select = document.getElementById('tag');
        var message = document.createElement('h1');
        message.innerHTML = `Hello ${this.name} ${this.surname} from a Web Component`;
        message.style.color="#DF01D7";
        select.appendChild(message);
    }
}
window.customElements.define("hello-world", helloWorld);

/* WEB SOCKETS USER*/
const date = "07/04/2022";
const ws = new WebSocket("ws://localhost:8082");
ws.addEventListener("open", ()=> {
    console.log("We are connected");
    ws.send(` ${date} - This message has been sent using Web sockets and Javascript.`);
});
ws.addEventListener("message", ({ data })=> {
    //Function that reads a Blob data and transform it as Text
    if (data instanceof Blob) {
        reader = new FileReader();
        reader.readAsText(data);
        reader.onload = () => {
            const socketDOM = document.getElementById('webSocket');
            var socketMessage = document.createElement('h2');
            socketMessage.innerHTML = `${reader.result}`;
            socketDOM.appendChild(socketMessage);
        };
    }
});

/* LOCAL STORAGE */
  /*
      //Add Item
      localStorage.setItem("nameRicardo","Ricardo");
      localStorage.setItem("ageRicardo","25");
      localStorage.setItem("nameTwo","Andrea");
      //Remove Item
      localStorage.removeItem("nameRicardo");
      //Show a key 
      console.log(localStorage.key(1));
  */

  //Save the Form Data 
  const nameForm = document.getElementById("name");
  const ageForm = document.getElementById("age");
  const cityForm = document.getElementById("city");
  const emailForm = document.getElementById("mail");
  const t3Form = document.getElementById("t3");
  const submitForm = document.getElementById("submit");
  const showLocal = document.getElementById("showLocalStorage");

  //Save the Data in local storage
  submitForm.onclick = function(){
  let radioButtons = document.querySelector('input[type="radio"]:checked');
  var ArrayLocalStorage = ['Name','Age','Gender','City','Message','Email'];
  var ArrayLocalStorageValues = [nameForm.value,ageForm.value,radioButtons.value,cityForm.value,t3Form.value,emailForm.value];
      console.log(ArrayLocalStorageValues);
      for(var i=0; i<ArrayLocalStorage.length; i++){
          localStorage.setItem(ArrayLocalStorage[i],ArrayLocalStorageValues[i]);
      }
      localStorage.reload();
  };
  //Show the localStorage in the DOM 
  for(i=0; i<localStorage.length; i++){
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      showLocal.innerHTML += `${key}: ${value} <br>`;
  }

  /* TOUCH EVENTS */
document.getElementById("touchEvents").addEventListener('touchend',touch);
document.getElementById("touchEvents").addEventListener('touchstart',touch);
document.getElementById("touchEvents").addEventListener('touchcancel',touch);
document.getElementById("touchEvents").addEventListener('touchmove',touch);

function touch(event){
  var touchedId = document.getElementById("touchMessage");
  var touchedCoordinates = document.getElementById("touchCoordinates");
  var touchedSpace = document.getElementById("touchEvents");
  switch(event.type){
    case 'touchstart':   touchedSpace.style.backgroundColor = "green";
    break;
    case 'touchend':   touchedSpace.style.backgroundColor = "red";
    break;
    case 'touchmove':   touchedSpace.style.backgroundColor = "purple";
    break;
    case 'touchcancel':   touchedSpace.style.backgroundColor = "black";
    break;
  }
  touchedId.innerHTML = `Your touch event is: ${event.type}`;
  touchedCoordinates.innerHTML = `Your position in X = ${event.changedTouches[0].screenX} and Y = ${event.changedTouches[0].screenY}`;
  console.log(event);
}

  /* GEO LOCATION */
  const geolocation = document.getElementById("geolocation");
  const geolocationData = document.getElementById("geolocationData");
  var positionLatitude = 0;
  var positionLongitude = 0;

  geolocation.onclick = function (){
    const successCallback = (position) => {      
      positionLatitude = position.coords.latitude;
      positionLongitude = position.coords.longitude;

      var geolocationMessage = document.createElement('p');
      geolocationMessage.innerHTML = `Your latitude is: ${position.coords.latitude} and longitude ${position.coords.longitude}`
      var maps = document.createElement('a');
      maps.className = "buttonGeo";
      maps.innerHTML = "Google Maps";
      maps.href = `https://www.google.com.mx/maps/@ ${position.coords.latitude}, ${position.coords.longitude},15z`
      geolocationData.appendChild(geolocationMessage);
      geolocationData.appendChild(maps);
    
    }
    const errorCallback = (error) => {
      var geolocationMessage = document.createElement('p');
      geolocationMessage.innerHTML = `There was a error: ${error.message}`
      geolocationData.appendChild(geolocationMessage);
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  /* DEVICE ORIENTATION */
  const deviceOrientation = document.getElementById("deviceOrientation");
  var orientationMessage = document.createElement('h2');

  window.addEventListener('deviceorientation', function(){
    var angle = window.orientation;
    switch(angle){
      case 0: orientationMessage.innerHTML = "Vertical";
      break;
      case 90: orientationMessage.innerHTML = "Horizontal";
      break;
      case -90: orientationMessage.innerHTML = "-90°";
      break;
    }
    deviceOrientation.appendChild(orientationMessage);
  },true);
