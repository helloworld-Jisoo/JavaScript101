const items = document.querySelector('.items');
const input = document.querySelector('.input');
const addBtn = document.querySelector('.add');

function onAdd(){
   // 1. 사용자가 입력한 텍스트를 받아옴
   const text = input.value;
   if (text === ''){
     input.focus();
     return;
   }
   // 2. 새로운 아이템 만듬 (텍스트+삭제버튼)
   const item = createItem(text);//text(input.value)를 전달받음
   // 3. items 컨테이너 안에 새로만든 아이템을 추가한다
   items.appendChild(item);
   // 4. 새로 추가된 아이템으로 scrolling
   item.scrollIntoView({block:'center'});
   // 5. input을 초기화한다
   input.value = ''; // input의 value를 텅텅비어진 값으로 초기화한다.
   input.focus(); 
  }


let id=0; //UUID
// 새로운 DOM요소 만들기
function createItem(text){
  // item 한줄에 있는 요소들(리스트)만들기
  const itemRow = document.createElement('li'); 
  itemRow.setAttribute('class', 'item__row' );
  itemRow.setAttribute('data-id',id);
  // string tamplate
  itemRow.innerHTML =` 
    <div class="item"}>
      <span class="item__name">${text}</span>
      <button class="item__delete">
        <i class="fas fa-trash-alt" data-id=${id}></i>
      </button>
    </div>
    <div class="item__divider"></div>`;
    id++
  return itemRow;
}

addBtn.addEventListener("click",()=> {
  onAdd();
} )
input.addEventListener("keypress",(event)=> {
  if(event.key==='Enter'){
    onAdd();
  }
});

items.addEventListener('click', event => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
