// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list'); //ul

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

function addTodo(event){
  // prevent form from submitting
  event.preventDefault();

  // + Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");

  // +li
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // check mark button
  const completedBtn = document.createElement('button');
  completedBtn.innerHTML = '<i class="fas fa-check-square"></i>';
  completedBtn.classList.add("complete-btn");
  todoDiv.appendChild(completedBtn);

    // check trash button
  const trashBtn = document.createElement('button');
  trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);

    // append TO LIST
    todoList.appendChild(todoDiv);

    //clear TODO INPUT VALUE
    todoInput.value = " ";
}

function deleteCheck(e){
  const item = e.target;
  const todo = item.parentElement;
  // Delete todo
  if(item.classList[0] === 'trash-btn'){
    //! animation first -> remove
  todo.classList.add("fall");
  todo.addEventListener('transitionend', ()=>{
    todo.remove();
  })
  }
  // Check Mark
  if(item.classList[0] === 'complete-btn'){
  todo.classList.toggle("completed");
  }
}