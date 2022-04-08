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

