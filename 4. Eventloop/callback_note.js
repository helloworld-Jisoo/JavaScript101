class Counter{
  constructor(runEveryFiveTimes){ // class를 만들 때 callback 함수(runEveryFiveTimes)를 하나 전달받음
    this.counter = 0; // Counter class 안에 counter 변수가 있는데 이 class로 object를 만드는 순간 counter이란 변수는 초기화 된다.
    this.callback = runEveryFiveTimes; //constuctor 자체에서 callback 함수를 받아서 변수로 만듬.
    // 이 class에는 2가지 datatype이 있음.(counter & callback)
  }

  increase() {
    this.counter++; // increase란 함수를 호출할 때마다 counter의 숫자가 하나씩 증가할 것
    console.log(this.counter);
    if (this.counter % 5 === 0){
      this.callback && this.callback(this.counter) // = if(this.callback){this.callback(this.counter)}
    }
  }
}
function printSomething(num) {
  console.log(`wow, ${num}`);
}

function alertNum(num){
  alert(`Alert!, ${num}`);
}

// class Counter를 이용해서 새로운 object 만듬
const printCounter = new Counter(printSomething); // new class(생성자); this.callback-> printSomething
const alertCounter = new Counter(alertNum);
printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();
printCounter.increase();


/* class에 원하는 기능을 다 정의하게 되면 사용하는 사람이 control할 수 없고 재사용이 떨어짐, 
콜백함수를 이용해서 class를 만들면 class를 쓰는 사람이 custom 가능
하나의 class로 다양한 object를 만들어서 서로 다른 기능을 수행하는 object를 만들 수 있음 
→ 재사용 높아짐
가능하면 class를 하나의 완전체로 만들기보다 원하는 기능을 끼워서 재조립이 가능하도록 만드는 것이 좋음, 
그렇기 때문에 callback 함수의 등록을 받는 것 */