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

// 새로운 DOM요소 만들기
function createItem(text){
  // item 한줄에 있는 요소들(리스트)만들기
  const itemRow = document.createElement('li'); 
  itemRow.setAttribute('class', 'item__row' );

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const span = document.createElement('span');
  span.setAttribute('class', 'item__name');
  span.innerHTML = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class','item__delete')
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt trash"></i>';
  deleteBtn.addEventListener("click",()=>{
    items.removeChild(itemRow);
  });

  const itemDivider = document.createElement('div');
  itemDivider.setAttribute('class', 'item__divider')

    // item 안에 span과 deleteBtn 넣어주기
  item.appendChild(span);
  item.appendChild(deleteBtn);
  // itemRow 안에 item(span&deleteBtn)과 devider 넣어주기
  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);

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

