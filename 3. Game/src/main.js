'use strict';

import PopUp from './popup.js';
import {GameBuilder,  Reason } from './game.js';
import * as sound from './sound.js';
//class(Popup)가 어디에 쓰이는지에 따라 적절한 변수명(gameFinishBanner) 지정 
const gameFinishBanner = new PopUp(); 

const game = new GameBuilder()
.withGameDuration(5)
.withCarrotCount(3)
.withBugCount(3)
.build();

game.setGameStopListener((reason)=> {
  console.log(reason);
  let message;
  switch(reason){
    case Reason.cancel:
      message = 'Replay?'
      sound.playAlert();
    break;
    case Reason.win:
      message = 'You won!'
       sound.playwin();
    break;
    case Reason.lose:
      message = 'You lost'
      sound.playBug();
    break;
    default:
      throw new Error('non valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(()=>{
  game.start();
});


