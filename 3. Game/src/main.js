'use strict';

import PopUp from './popup.js';
import Game from './game.js';

//class(Popup)가 어디에 쓰이는지에 따라 적절한 변수명(gameFinishBanner) 지정 
const gameFinishBanner = new PopUp(); 


const game = new Game(5, 2, 2);
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


