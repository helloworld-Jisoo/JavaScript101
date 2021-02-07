'use strict';

const ITEM_MAX_SIZE = 80; //carrot image size = 80x80px
const field = document.querySelector('.playground');
// field 의 size, position 가져오기
const fieldRect = field.getBoundingClientRect();

function initGame(){
  // 벌레와 당근을 생성한 뒤 field에 추가해준다
  console.log(fieldRect);
  addItem('carrot',5,'img/carrot.png');
  addItem('bug',5,'img/bug.png');
}

// * 함수+인자설정 으로 동일한 일을 할 수 있도록 만들어줌(createBug,createCarrot과 같이 함수를 중복해서 만들 필요가 없음)
// 인자로(클라스이름,갯수,이미지경로)를 추가해준다.
function addItem(className, count, imgPath){
  // 범위지정
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width-ITEM_MAX_SIZE;// Item이 지정범위를 넘어서 배치되는 것을 방지
  const y2 = fieldRect.height-ITEM_MAX_SIZE;

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
    field.appendChild(item);
  }
}

function randomNumber(min,max){
  return Math.random() * (max-min) + min;
}

initGame();