const playBtn = document.querySelector('.playbtn');
const remain = document.querySelector('.remain');
const timer = document.querySelector('.timer');
const field = document.querySelector(".playground");
const popUp = document.querySelector(".pop-up");
// PLAYBTN CLICK FOR PLAY
playBtn.addEventListener('click', () => {
// PLAYBTN -> STOPBTN
  // STOPBTN CLICK -> GAME OVER
// DISPALY TIMER & REMAIN
timer.style.display = "block";
remain.style.display = "block";
// TIMER SET (countdown) 
countdown();
  // REMAIN SET 
   remain.textContent = 5;
  // RANDOM POSITIONING BUGS AND CARROTS

createBug();
createBug();
createBug();
createBug();
createBug();
createCarrot()
createCarrot()
createCarrot()
createCarrot()
createCarrot()

   });
   

// PLAYING
  // CLICK CARROT
    // DECREASE REMAIN NUMBERS
    // GAME WIN IF ALL BUG ARE KILLED IN TIME
popUp.setAttribute("class", "pop-up");

  // CLICK BUG -> GAME OVER


// GAME OVER POPUP : REPLAY?

function countdown(){
  let timeleft = 10;
  const countdown = setInterval(function(){
    if(timeleft<=1){
      clearInterval(countdown);
    }
    timer.value = 11 - timeleft;
    timeleft -= 1;  
    timer.innerText =  `0:${timeleft}`;
  }, 1000)
  setTimeout(function () {
    popUp.setAttribute("class", "pop-up");
  }, 1000*10);
}

  function createBug() {
    const bugs = new Image(50,50);
    bugs.src = "img/bug.png";
    field.appendChild(bugs);
    const max_width = field.clientWidth-80;
    const max_height = field.clientHeight-80;
    let x = Math.floor(Math.random() * Math.floor(max_width));
    let y = Math.floor(Math.random() * Math.floor(max_height));
    bugs.style.position = "absolute";
    bugs.style.left = `${x}px`;
    bugs.style.top = `${y}px`;

}

function createCarrot(){
 const carrots = new Image(50,50);
    carrots.src = "img/carrot.png";
    field.appendChild(carrots);
    const max_width = field.clientWidth;
    const max_height = field.clientHeight;
    let x = Math.floor(Math.random() * max_width);
    let y = Math.floor(Math.random() * max_height);
    carrots.style.position = "absolute";
    carrots.style.left = `${x}px`;
    carrots.style.top = `${y}px`;

}