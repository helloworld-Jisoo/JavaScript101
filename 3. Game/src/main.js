'use strict';

import PopUp from './PopUp.js';
import Field from './field.js';
import * as sound from './sound.js';
//! variables
const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

// DOM 요소 받아오기
const playBtn = document.querySelector('.playbtn');
const remain = document.querySelector('.remain');
const timer = document.querySelector('.timer');


 //! Initialize 
// 게임의 상태를 기억하고 있는 변수가 있어야 함 (게임 시작 전)
let started = false;
let score = 0;
let time = undefined;

//class(Popup)가 어디에 쓰이는지에 따라 적절한 변수명(gameFinishBanner) 지정 
const gameFinishBanner = new PopUp(); 
// callback 등록
gameFinishBanner.setClickListener(()=>{
  startGame();
})

const gameField = new Field(CARROT_COUNT,BUG_COUNT); // constructor(carrotCount, bugCount)
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if(!started) {
    return; // 게임이 시작되지 않으면 함수를 나갈꺼임 (*조건이 맞지 않을때 빨리 함수를 return하는 것이 중요함)
  } 
  //이제 원하는 기능 수행
  if(item === 'carrot'){
    score++; // score 점수 추가
    updateScoreBoard(); // UI에 점수 보여주기
       if(score === CARROT_COUNT){ // score 가 5점이 되면
        finishGame(true); // 게임 승리
    }
  } else if (item==='bug'){
    stopGameTimer(); // 게임 타이머 멈춤
    finishGame(false); //게임 패배
  }
}
//! Event 
playBtn.addEventListener('click', ()=>{
  // 만약 게임이 시작이 되었다면, 게임을 중지해야 하고 게임이 시작되지 않았다면 게임을 시작해야함.
  if(started) {
    stopGame();
  } else {
    startGame();
  }
})


//! Main functions
function startGame(){
  started = true;
  initGame(); // 게임이 시작 되었을 떄 벌레와 당근을 생성
  showStopBtn();
  showTimerAndRemain();
  startGameTimer();
  sound.playBackground();
}

function stopGame(){
  started = false;
  hideGameBtn();
  stopGameTimer();
  gameFinishBanner.showWithText('Replay?');
  sound.playAlert();
  sound.stopBackground();
}

function finishGame(win){
  started = false;
  hideGameBtn();
  if(win){
    sound.playwin;
  } else {
    sound.playBug;
  }
  sound.stopBackground; // stop bgSound when the game is finished
  stopGameTimer();
  gameFinishBanner.showWithText(win? 'You won' : 'You lost');
}

 //! Functions for Timer  

function stopGameTimer(){
  clearInterval(time);
}
function startGameTimer(){
  let remainingTimeSec = GAME_DURATION_SEC; // 지정된 시간동안 Interval 이 될수있도록 만들어주기 위한 변수(몇초동안 계속 인터벌을 유지할 것인지)
  updateTimeText(remainingTimeSec); // Text에 remaining TIME을 보여줌
  time = setInterval(()=>{   // 위 지역 변수 참고(let time = undefined);
    if(remainingTimeSec <= 0) { // timer 의 시간이 끝난다면,
      clearInterval(time);
      finishGame(CARROT_COUNT === score); // = finishGame(win)
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


 //! Functions for buttons  
function hideGameBtn(){
  playBtn.style.visibility = "hidden";
}
// play button -> stop button
function showStopBtn(){
  const icon = document.querySelector('.fas');
  // play icon에 있는 class 를 받아와서 stop icon class 추가
  icon.classList.add('fa-stop');
  // 그리고 나서 play icon 제거
  icon.classList.remove('fa-play');
  playBtn.style.visibility = "visible";
}

 //! Functions for Score
function showTimerAndRemain(){
  // display none으로 하면 render tree에서 빠지므로 field size에 영향을 줄 수 있음
timer.style.visibility = "visible";
remain.style.visibility = "visible";
}

function initGame(){
  remain.innerText = CARROT_COUNT; // Remain 갯수 셋팅
  gameField.init();
}

  function updateScoreBoard(){
    remain.innerText = CARROT_COUNT-score;
  }
// * 함수+인자설정 으로 동일한 일을 할 수 있도록 만들어줌
// * (createBug,createCarrot과 같이 함수를 중복해서 만들 필요가 없음)
// 인자로(클라스이름,갯수,이미지경로)를 추가해준다.




