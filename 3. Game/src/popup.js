'use strict';

// export = 바깥으로 노출시키기
export default class PopUp{
  constructor(){
    // Create member variables
this.popUp = document.querySelector('.pop-up');
this.popUpText = document.querySelector('.message');
this.popUpRefresh = document.querySelector('.refresh');
this.popUpRefresh.addEventListener('click', () => {
  this.onClick && this.onClick(); // onClick이 있을때만 호출
  this.hide(); // 그리고 popup 숨기기
  });
}
  //  Callback
  setClickListener(onClick){
  this.onClick = onClick;
}

  showWithText(text){
  this.popUpText.innerText = text;
  this.popUp.classList.remove('pup-up--hide');
  }
  
  hide(){
  this.popUp.classList.add('pup-up--hide');
  }

}