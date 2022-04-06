/* FORM VALIDATION */
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
  if(email.validity.valueMissing) {
    emailError.textContent = 'You need to enter an e-mail valid format.';
  } else if(email.validity.typeMismatch) {
    emailError.textContent = 'Entered value needs to be an e-mail valid format.';
  } else if(email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
  }
  emailError.className = 'error active';
} 

/* WEB COMPONENTS AND CUSTOM ELEMENTS */
class MyProduct extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'})
        this.shadowRoot.innerHTML = '<style>h2 {color:blue}</style><h2>Hi! I am a web componnent!</h2>';
    }
}
window.customElements.define('my-product', MyProduct);

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
        console.log("Llegue al switch")
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
        console.log("Llegue");

        this.innerHTML = `<div>
            <h1>Hello ${this.name} ${this.surname} from a callback function with an attribute changed call back</h1>
            <h1>This is a paragraph</h1>
        </div>`;
        this.style.color = "green";
    }
}
window.customElements.define("hello-world", helloWorld);