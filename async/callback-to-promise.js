
class UserStorage {  
  loginUser(id, password) {
    return new Promise((resolve,reject)=>{
   setTimeout(()=> {
      if (
        (id === 'ellie' && password === 'dream') ||
        (id === 'Jisoo' && password === 'awesome'))
        {
         resolve(id);
        } else {
         reject(new Error('not found'))
        }
    },1000);
});
   
  }
  getRoles(user) {
    return new Promise((resolve,reject)=>{
    setTimeout(()=> {
        if(user === 'ellie'){
         resolve({name:'ellie', role: 'admin'});
        }else{
         reject(new Error('no access'));
        }
        },1000);
  });
  }
}
//* Coding
// Declare variables 
const userStorage = new UserStorage();
const id = prompt('enter your ID');
const password = prompt('enter your password');

userStorage.loginUser(id,password)// 1. userstorage 에서 로그인 
.then(userStorage.getRoles) // 2. 로그인 성공 시, getRoles 호출 (받아오는 인자(user)가 똑같기 때문에 생략)
.then(user => alert ( `Hello ${user.name}, you have a ${user.role} role`)) // 3. 최종에 받아오는 user를 이용해서 alert.
.catch(console.log) //* 문제가 생겼을 경우 console.log에 출력



