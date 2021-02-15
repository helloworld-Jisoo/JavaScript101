'use strict';

// JavaScript is synchronous. 
// Execute the code black in order after hosting.
// hoisting: var, function declation 

console.log('1'); //sync
setTimeout(()=> console.log('2'),1000); //async
console.log('3'); //sync

// Synchronous callback
function printImmediatley(print){
  print();
}

printImmediatley(()=>console.log('hello')); //sync

//Asyncronous callback
function printWithDelay(print, timeout){
  setTimeout(print,timeout);
}

printWithDelay(()=>console.log('async callback'), 2000); //async



// 🎈 Callback Hell example
class UserStorage {  
  loginUser(id, password, onSuccess, onError) {
    setTimeout(()=> {
      if (
        (id === 'ellie' && password === 'dream') ||
        (id === 'Jisoo' && password === 'awesome'))
        {
          onSuccess(id); // 만약 IF Condition이 맞다면 onSuccess 호출, onSuccess는 id를 전달해준다.
        } else {
          onError(new Error('not found')); // 아니라면, Error 라는 Object를 만들어서 'not found' 메세지 전달.
        }
    },1000);
  }
  getRoles(user, onSuccess, onError) {
    setTimeout(()=> {
    if(user === 'ellie'){
      onSuccess({name:'ellie', role: 'admin'});
    }else{
      onError(new Error('no access'));
    }
    },1000);
  }
}

//* Coding
// Declare variables 
const userStorage = new UserStorage();

// Get Id & password from User
const id = prompt('enter your ID');
const password = prompt('enter your password');

// Login by using the class
userStorage.loginUser(
  id,
  password, 
  user => {
    userStorage.getRoles(
      user,
      userWithRole => {
        alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`)
      },
      error => {console.log(error);
      }
    );
  },
  (error) => {console.log(error)}
  );

//* 가독성 떨어짐, debugging 어려움