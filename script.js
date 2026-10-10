const form=document.getElementById('form');
const username=document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('password');
const password2=document.getElementById('password2');
const phone=document.getElementById('phone');
//Show input error message 
function showError(input,message){
   const formControl=input.parentElement;
   formControl.className='form-control error';
   const small=formControl.querySelector('small');
   small.innerText=message;
}

//Show success outline 
function showSuccess(input){
   const formControl=input.parentElement;
   formControl.className='form-control success ';
}

//Check email is valid 
function checkEmail(input){
   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 if(re.test(input.value.trim())){
  showSuccess(input);
 }
 else{
 showError(input,'Email is not valid');
 }
}

//Check required fields
function checkRequired(inputArr){
   inputArr.forEach(function(input){
      if(input.value.trim()=== ''){
         showError(input,`${getFieldName(input)} is reauired`);
      }
      else{
         showSuccess(input);
      }
   });
}

//check input length
function checkLength(input,min,max){
   if(input.value.length<min){
      showError(input,`${getFieldName(input)} must be at least ${min} characters`);
   }
   else if(input.value.length>max){
      showError(input,`${getFieldName(input)} must be less than  ${max} characters`);
   }
   else{
      showSuccess(input);
   }
}

//check passwors watch
function checkPasswordsWatch(input1,input2){
   if(input1.value !== input2.value){
      showError(input2,'Passwords do not match')
   }
   else{
      showSuccess(input2);
   }
}

//get fieldname
function getFieldName(input){
   return input.id.charAt(0).toUpperCase() +input.id.slice(1);
}

//phone number
function checkPhone(input) {

   if (input.value.length !== 11) {
       showError(input, 'Phone number must be 11 digits');
   }
   else if (isNaN(input.value)) {
       showError(input, 'Phone number must contain only numbers');
   }
   else {
       showSuccess(input);
   }
}
//Even Listener
form.addEventListener('submit', function (e){
    e.preventDefault();
   checkRequired([username,email,phone,password,password2]);
   checkLength(username,3,15);
   checkLength(password,6,25);
   checkEmail(email);
   checkPasswordsWatch(password,password2);
   checkPhone(phone);
});