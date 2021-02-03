
const button = document.querySelector('button');


function plusList(){
  const list = document.querySelector('li');
  const input = document.querySelector('input');
  list.appendChild(input);
  document.querySelector("ul").appendChild(list);
}
button.addEventListener("click", ()=> {
  plusList();
});