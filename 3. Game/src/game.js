'use strict';
import Field from './field.js';
import * as sound from './sound.js';
export default class Game{
  constructor(gameDuration, carrotCount, bugCount){
    // Parameters 
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this. bugCount = bugCount;

    // DOM
  this.remain = document.querySelector('.remain');
  this.timer = document.querySelector('.timer');
  this.playBtn = document.querySelector('.playbtn');
  this.playBtn.addEventListener('click', () => {
    if(this.started) {
      this.stop();
    } else {
      this.start();
    }
    })

  this.gameField = new Field(carrotCount,bugCount);
  this.gameField.setClickListener(this.onItemClick);

    // Initialize
  this.started = false;
  this.score = 0;
  this.time = undefined;
  }
  // Callback for notice when the game stop to main.js
  setGameStopListener(onGameStop){
    this.onGameStop = onGameStop;
  }
  start(){
  this.started = true;
  this.initGame(); // 게임이 시작 되었을 떄 벌레와 당근을 생성
  this.showStopBtn();
  this.showTimerAndRemain();
  this.startGameTimer();
  sound.playBackground();
}

stop(){
  this.started = false;
  this.hideGameBtn();
  this.stopGameTimer();
  sound.playAlert();
  sound.stopBackground();
  this.onGameStop && this.onGameStop('cancel');
} 
  

finish(win){
  this.started = false;
  this.hideGameBtn();
  if(win){
    sound.playwin();
  } else {
    sound.playBug();
  }
  this.stopGameTimer();
  sound.stopBackground();
  this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
}

onItemClick = (item) => {
  if(!this.started) {
    return;
  }
  if(item === 'carrot'){
    this.score++;
    this.updateScoreBoard();
       if(this.score === this.carrotCount){ 
        this.finish(true); // win
    }
  } else if (item === 'bug'){
    this.stopGameTimer(); 
    this.finish(false); // lose
  }
};

showStopBtn(){
  const icon = document.querySelector('.fas');
  // play icon에 있는 class 를 받아와서 stop icon class 추가
  icon.classList.add('fa-stop');
  // 그리고 나서 play icon 제거
  icon.classList.remove('fa-play');
  this.playBtn.style.visibility = "visible";
}
hideGameBtn(){
  this.playBtn.style.visibility = "hidden";
}
showTimerAndRemain(){
  this.timer.style.visibility = "visible";
  this.remain.style.visibility = "visible";
}

startGameTimer(){
  let remainingTimeSec = this.gameDuration; // 지정된 시간동안 Interval 이 될수있도록 만들어주기 위한 변수(몇초동안 계속 인터벌을 유지할 것인지)
  this.updateTimeText(remainingTimeSec); // Text에 remaining TIME을 보여줌
  this.time = setInterval(()=>{   // 위 지역 변수 참고(let time = undefined);
    if(remainingTimeSec <= 0) { // timer 의 시간이 끝난다면,
      clearInterval(this.time);
      this.finish(this.carrotCount === this.score);
      return;
    } 
    this.updateTimeText(--remainingTimeSec); // 하나씩 줄여서 표기
  },1000) // 1,000ms = 1s 1초에 한번씩 업데이트
}
stopGameTimer(){
  clearInterval(this.time);
}
updateTimeText(sec){
  const minutes = Math.floor(sec/60); // ex) 65/60 => 1 minute
  const seconds = sec % 60; // 나머지 5초는 여기에
  this.timer.innerText = `${minutes}:${seconds}`;
}
initGame(){
  this.score = 0;
  this.remain.innerText = this.carrotCount; // Remain 갯수 셋팅
  this.gameField.init();
}

updateScoreBoard(){
    this.remain.innerText = this.carrotCount-this.score;
  }
}