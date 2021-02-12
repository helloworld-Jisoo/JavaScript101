'use strict';

import PopUp from './popup.js';
import GameBuilder from './game.js';

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
    case 'cancel':
      message = 'Replay?'
    break;
    case 'win':
      message = 'You won!'
    break;
    case 'lose':
      message = 'You lost'
    break;
    default:
      throw new Error('non valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(()=>{
  game.start();
});


