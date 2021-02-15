'use strict';

// Promise is a JavaSrript object for asyncronous operation.
// State: pending(수행중) ➡ fulfilled(완료) or rejected
//? Producer vs Consumer

// 1. Producer
// ! When new Promise is created, the executor runs automatially.
// ! 새로운 promise가 만들어 질때, 전달된 콜백함수(executor)가 자동적으로 실행되기 때문에 불필요한 network를 실행시키거나 하지 않도록 주의
const promise = new Promise((resolve,reject) => {
  // Doing some heavy work(network, read files)
  console.log('doing something...');
  setTimeout(()=> {
    resolve('ellie');
    //reject(new Error('no network'));
  }, 2000);
});


// 2. Consumer: then, catch, finally
promise//
.then((value) => {
  console.log(value);
})
.catch(error => {
  console.log(error);
})
.finally(()=> {console.log('finally')}); // 성공과 실패에 상관없이 마지막 기능 수행

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1),1000); // 1초 후 숫자 1을 전달
});

fetchNumber
.then(num => num*2)
.then(num => num*3)
.then(num => { // then은 값을 전달해도 되고 promise를 전달해도 됨
  return new Promise((resolve, reject)=> {
    setTimeout(()=> resolve(num-1),1000);
  })
})
.then(num => console.log(num));
// then 을 여러번 묶을 수 있음

// 4. Error Handling 
const getHen = () => new Promise((resolve,reject)=> {
  setTimeout(()=> resolve('🐔'),1000);
});

const getEgg = hen => new Promise((resolve,reject)=> {
  setTimeout(()=> reject(new Error (`error! ${hen} => 🥚`)), 1000);
});

const cook = egg => new Promise((resolve,reject)=> {
  setTimeout(()=> resolve(`${egg} => 🍳`), 1000);
});

getHen() //
.then(getEgg) // hen 을 받아와서 getEgg 함수 호출
.then(cook) // 정상적으로 수행 시, 받아온 egg를 이용해서 cook함수 호출
.catch(error=>{
  return '🥐';
})
.then(console.log); // 받아온 결과를 meal이라고 해서 console.log에 출력
