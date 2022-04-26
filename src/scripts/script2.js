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
var orientationMessage = document.createElement('p');

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

