'use strict';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const ITEM_MAX_SIZE = 80; //carrot image size = 80x80px
const GAME_DURATION_SEC = 5;
// DOM 요소 받아오기
const playBtn = document.querySelector('.playbtn');
const remain = document.querySelector('.remain');
const timer = document.querySelector('.timer');
const field = document.querySelector('.playground');
const popUp = document.querySelector('.pop-up');

// field 의 size, position 가져오기
const fieldRect = field.getBoundingClientRect();

// 게임의 상태를 기억하고 있는 변수가 있어야 함 (게임 시작 전)
let started = false;
let score = 0;
let time = undefined;

playBtn.addEventListener('click', ()=>{
  // 만약 게임이 시작이 되었다면, 게임을 중지해야 하고 게임이 시작되지 않았다면 게임을 시작해야함.
  if(started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started; // started를 반대로 할당해주기
})

function startGame(){
  // 게임이 시작 되었을 떄 벌레와 당근을 생성
  initGame();
  showStopBtn();
  showTimerAndRemain();
  startGameTimer();
}

function stopGame(){

}

function startGameTimer(){
  
  let remainingTimeSec = GAME_DURATION_SEC; // 지정된 시간동안 Interval 이 될수있도록 만들어주기 위한 변수(몇초동안 계속 인터벌을 유지할 것인지)
  updateTimeText(remainingTimeSec); // Text에 remaining TIME을 보여줌
  // 위 지역 변수 참고(let time = undefined);
  time = setInterval(()=>{
    if(remainingTimeSec <= 0) {
      clearInterval();
      return;
    } 
    updateTimeText(--remainingTimeSec); // 하나씩 줄여서 표기
  },1000) // 1,000ms = 1s 1초에 한번씩 업데이트
}
function updateTimeText(sec){
  const minutes = Math.floor(sec/60); // ex) 65/60 => 1 minute
  const seconds = sec % 60; // 나머지 5초는 여기에
  timer.innerText = `${minutes}:${seconds}`;
}
// play button -> stop button
function showStopBtn(){
  const icon = document.querySelector('.fa-play');
  // play icon에 있는 class 를 받아와서 stop icon class 추가
  icon.classList.add('fa-stop');
  // 그리고 나서 play icon 제거
  icon.classList.remove('fa-play');
}

function showTimerAndRemain(){
  // display none으로 하면 render tree에서 빠지므로 field size에 영향을 줄 수 있음
timer.style.visibility = "visible";
remain.style.visibility = "visible";
}
function initGame(){
  field.innerHTML = '';// field의 HTML 을 초기화시켜줘서 게임을 리셋시켜줌
  remain.innerText = CARROT_COUNT; // Remain 갯수 셋팅

  // 벌레와 당근을 생성한 뒤 field에 추가해준다
  addItem('carrot',CARROT_COUNT,'img/carrot.png');
  addItem('bug',BUG_COUNT,'img/bug.png');
}

// * 함수+인자설정 으로 동일한 일을 할 수 있도록 만들어줌
// * (createBug,createCarrot과 같이 함수를 중복해서 만들 필요가 없음)
// 인자로(클라스이름,갯수,이미지경로)를 추가해준다.
function addItem(className, count, imgPath){
  // 범위지정
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width-ITEM_MAX_SIZE;// Item이 지정범위를 넘어서 배치되는 것을 방지
  const y2 = fieldRect.height-ITEM_MAX_SIZE;

  // 만들고 싶은 count만큼 돌기
  for(let i = 0; i < count ; i++){

    //img 태그를 이용한 Item 만들기
    const item = document.createElement('img');
    item.setAttribute('src',imgPath);
    item.setAttribute('class', className);

    // random position 지정
    item.style.position = "absolute";
    const x = randomNumber(x1, x2); //함수(min,max)
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min,max){
  return Math.random() * (max-min) + min;
}

