//? async & await (syntatic sugar)
// clear style of using promise 

//? 1. async
async function fetchUser(){ //* 함수 앞에 async => Promise로 자동변환 
  return 'Jisoo'; 
}
/* = function fetchUser(){
      return new Promise((resolve, reject)=> {
        resolve('Jisoo;);
      })
    }*/

const user = fetchUser(); 
user.then(console.log);

//? 2. await ✨ 
// async가 붙은 함수 안에서만 쓸 수 있음
function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple(){
  await delay(2000);
  return '🍎'
}

async function getBanana(){
  await delay(1000);
  return '🍌'
}

async function pickFruits(){
  const applePromise = getApple();
  const bananaPromise = getBanana();
    // promise를 만드는 순간 실행됨 (병렬적으로 실행됨)
  const apple = await applePromise;
  const banana = await bananaPromise;
  return`${apple} + ${banana}`
}
/* = function pickFruits(){
  return getApple()
  .then(apple =>{
    return getBanana()
    .then(banana => `${apple} + ${banana}`);
  });
} */
// * Error 처리 try & catch
pickFruits().then(console.log)

//? 3. USEFUL PROMISE APIs
//  promise.all = promise배열을 전달 -> 다 받아진 배열을 병렬적으로 전달
function pickAllFruits(){
  return Promise.all([getApple(), getBanana()])
  .then(fruits => fruits.join('+')) // join = 배열을 string으로 묶을 수 있는것
} 

pickAllFruits().then(console.log)

// Promise.race = 배열에 전달된 promise중에서 가장 먼저 값을 return하는 아이만 전달됨
function pickOnlyOne(){
  return Promise.race([getApple(),getBanana()]);
}
pickOnlyOne().then(console.log);

