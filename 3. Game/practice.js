const playBtn = document.querySelector('.playbtn');
const remain = document.querySelector('.remain');
const timer = document.querySelector('.timer');

// PLAYBTN CLICK FOR PLAY
playBtn.addEventListener('click', () => {
// PLAYBTN -> STOPBTN
  // STOPBTN CLICK -> GAME OVER
// TIMER SET (countdown) 
countdown();
  // REMAIN SET 
   remain.textContent = 10;
  // RANDOM POSITIONING BUGS AND CARROTS
 generateRandom.randomCoordinate();

   });
   
function countdown(){
  let timeleft = 10;
  const countdown = setInterval(function(){
    if(timeleft<=0){
      clearInterval(countdown);
    }
    timer.value = 11 - timeleft;
    timeleft -= 1;
    timer.innerText =  timeleft;
  }, 1000)
  setTimeout(function () {alert("game over")}, 1000*10);
}
// PLAYING
  // CLICK CARROT
    // DECREASE REMAIN NUMBERS
    // GAME WIN IF ALL BUG ARE KILLED IN TIME


  // CLICK BUG -> GAME OVER


// GAME OVER POPUP : REPLAY?

class Random{
  constructor(){
    this.random = 0;
  }
 randomCoordinate = function(){
   const canvas = document.querySelector('.playground');
  const max_width = canvas.offsetWidth;
  const max_height = canvas.offsetHeight;
    let r = [];
    let x = Math.floor(Math.random()*max_width);
    let y = Math.floor(Math.random()*max_height);
    r = [x,y];
    return r;
  };
  
}
function callBug(){
  bug.setAttribute(`<img class="bug" hidden="hidden" src="/img/bug.png" alt="">`)
}
const generateRandom = new Random(callBug);
