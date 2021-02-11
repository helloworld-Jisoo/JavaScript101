// HTMLAudioElement
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playCarrot(){
  playSound(carrotSound);
}
export function playAlert(){
  playSound(alertSound);
}
export function playBackground(){
  playSound(bgSound);
}
export function playBug(){
  playSound(bugSound);
}
export function playwin(){
  playSound(winSound);
}
export function stopBackground(){
  stopSound(bgSound);
}

 //! Functions for Sound
function playSound(sound) {
  sound.currentTime = 0; // initialize the sound
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}