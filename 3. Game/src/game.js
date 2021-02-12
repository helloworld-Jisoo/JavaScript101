'use strict';
import Field from './field.js';
import * as sound from './sound.js';
//* export가 2개 이상일 때에는 default를 쓰지 않는다

export const Reason = Object.freeze({
  win : 'win',
  lose: 'lose',
  cancel: 'cancel'
});

// ! Builder pattern (more than 3 constructors)
export class GameBuilder{
  withGameDuration(duration){
    this.gameDuration = duration; // 전달받은 duration 할당
    return this; // class 자체를 return
  }
  withCarrotCount(num){
    this.carrotCount = num;
    return this;
  }

  withBugCount(num){
    this.bugCount = num;
    return this;
  }
  // 사용자가 🔼이러한 함수를 이용해서 구체적인 값 설정

//! Builder pattern
build(){ // build pattern 호출 시 Game이라는 새 class를 만들어서 return
  return new Game(
    this.gameDuration,
    this.carrotCount,
    this.bugCount
  );
}
} 
class Game{
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
      this.stop(Reason.cancel);
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

  stop(reason){
  this.started = false;
  this.hideGameBtn();
  this.stopGameTimer();
  sound.playAlert();
  sound.stopBackground();
  this.onGameStop && this.onGameStop(reason);
  } 

onItemClick = (item) => {
  if(!this.started) {
    return;
  }
  if(item === 'carrot'){
    this.score++;
    this.updateScoreBoard();
       if(this.score === this.carrotCount){ 
        this.stop(Reason.win);
    }
  } else if (item === 'bug'){
    this.stopGameTimer(); 
    this.stop(Reason.lose); 
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
      this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
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