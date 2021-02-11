'use strict';
const ITEM_MAX_SIZE = 80; //carrot image size = 80x80px
const carrotSound = new Audio('./sound/carrot_pull.mp3');
export default class Field{
  constructor(carrotCount, bugCount){
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.playground');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  setClickListener(onItemClick){
    this.onItemClick = onItemClick;
  }
  
  init(){
    this.field.innerHTML = ''; // initialize Field 
    this._addItem('carrot',this.carrotCount,'./img/carrot.png');
    this._addItem('bug',this.bugCount,'./img/bug.png');
  }

  _addItem(className, count, imgPath){
  const x1 = 0;
  const y1 = 0;
  const x2 = this.fieldRect.width-ITEM_MAX_SIZE;// Item이 지정범위를 넘어서 배치되는 것을 방지
  const y2 = this.fieldRect.height-ITEM_MAX_SIZE;
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
    this.field.appendChild(item);
  }
}
  onclick(event){
    const target = event.target;
    if (target.matches('.carrot')){ // matches란 함수는 css selector가 해당하는지 확인
    target.remove(); // 당근을 없앰
    playSound(carrotSound);
    this.onItemClick && this.onItemClick('carrot');
    } else if (target.matches('.bug')){
      this.onItemClick && this.onItemClick('bug');
  }
  }
}
function playSound(sound) {
  sound.currentTime = 0; // initialize the sound
  sound.play();
}
function randomNumber(min,max){
  return Math.random() * (max-min) + min;
}
