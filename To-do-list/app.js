// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list'); //ul
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

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

  // Add todo to LocalStorage
  saveLocalTodos(todoInput.value);

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

  // Delete todo
  if(item.classList[0] === 'trash-btn'){
  const todo = item.parentElement;
    //! animation first -> remove
  todo.classList.add("fall");
  removeLocalTodos(todo);
  todo.addEventListener('transitionend', ()=>{
    todo.remove();
  })
  }
  // Check Mark
  if(item.classList[0] === 'complete-btn'){
  const todo = item.parentElement;
  todo.classList.toggle("completed");
  }
}

function filterTodo(e){
const todos = todoList.childNodes;
 todos.forEach(function(todo){
    switch(e.target.value){ // e.target = option
      case "all":
        todo.style.display = 'flex'; //💬 HTML 에 공백없는지 확인!!
        break;
      case "completed":
        if(todo.classList.contains("completed")){
          todo.style.display = "flex";
        }else{
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains("completed")){
          todo.style.display = "flex";
        }else {
          todo.style.display = "none";
        }
        break;
    }
  })
}

function saveLocalTodos(todo){
     // 1. Check --- hey, do I already have thing in there?
  let todos;
  if(localStorage.getItem('todos')=== null){ // check it exist
    todos=[]; // if doesn't exist, create empty array.
    } else{
      todos = JSON.parse(localStorage.getItem("todos")); // get back the actual to do from local storage
    }
    // 2. Grab todos and push in 
    todos.push(todo);
    // 3. Set it back into the local storage
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    let todos;
  if(localStorage.getItem('todos')=== null){ // check it exist
    todos=[]; // if doesn't exist, create empty array.
    } else{
      todos = JSON.parse(localStorage.getItem("todos")); // get back the actual to do from local storage
    }
  todos.forEach(function(todo){
  // + Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");

  // +li
  const newTodo = document.createElement('li');
  newTodo.innerText = todo;
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
    })
}

function removeLocalTodos(todo){
   // 1. Check --- hey, do I already have thing in there?
  let todos;
  if(localStorage.getItem('todos')=== null){ // check it exist
    todos=[]; // if doesn't exist, create empty array.
    } else{
      todos = JSON.parse(localStorage.getItem("todos")); // get back the actual to do from local storage
    }
  const todoIndex = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

