
// initial todos
// DO NOT EDIT THIS ARRAY
// You may add props to objects if needed.
let todos = []

//global scopes
const todoList = document.querySelector(".todoList");
const newButton = document.getElementById("newBtn");
const newTodoInput = document.getElementById("input");
const pendingTasks = document.querySelector("#pendingTasks");
const clearButton = document.getElementById("clearBTN");

//prevent repeat todos WORKS
function removeChildren(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

//User can add todos WORKS

newButton.addEventListener("click", addNewTodo);
let newTodoID = 1
function addNewTodo() {
  const newTodoName = document.getElementById("input").value;
  const newTodo = {
    id: newTodoID,
    text: newTodoName,
    complete: false
  };
  todos.push(newTodo);
  removeChildren(todoList);
  populateList(todos);
  document.getElementById("input").value = "";
  newTodoID ++
  console.log(newTodo);
}

//add new todo when pressing enter DOES NOT WORK YET
/* newBtn.addEventListener("keyup", (event) => {
  console.log(event)
  if (event.KeyboardEvent.code==='Enter') {
    removeChildren(todoList);
    const newTodoName = newTodoInput.value;
    const newTodo = {
      todoID: todos.length,
      todoText: newTodoName,
      todoComplete: false,
    };
    todos.push(newTodo);
    populateList(todos);
    newTodoInput.value = "";
    console.log(newTodo);
  }
}); */

//User can view todos WORKS
function populateList(todos) {
  todos.forEach((todo) => {
    let listItem = document.createElement("li")
    listItem.innerText = todo.text 
    listItem.onclick = () => {
      toggleDone(todo.id)
    }
    if (todo.complete) {
      listItem.classList.add("done")
    }
    let editButton = document.createElement("span")
    editButton.classList.add("fa", "fa-edit", "editBtn")
    editButton.onclick = (event) => {
      event.stopPropagation()
      editTodo(todo.id)
    }
    let trashButton = document.createElement("span")
    trashButton.classList.add("fa", "fa-trash")
    trashButton.onclick = (event) => {
      event.stopPropagation()
      deleteTodo(todo.id)
    }
    listItem.appendChild(trashButton)
    listItem.appendChild(editButton)
    todoList.appendChild(listItem)
  })
  numberLeft();
}

//App shows the user number of todos left to complete WORKS
function numberLeft() {
  let count = 0;
  for (let i in todos) {
    if (todos[i].complete === false) {
      count++;
    }
  }
  pendingTasks.innerHTML = `You have ${count} pending tasks.`;
  return count;
}

//App can delete (aka clear) all done todos at once. WORKS
clearButton.addEventListener("click", () => {
  deleteDoneTasks();
});
function deleteDoneTasks() {
  todos = todos.filter((todo) => todo.complete != true);
  removeChildren(todoList);
  populateList(todos);
}

//User can delete todos
function deleteTodo(id) {
  todos = todos.filter((todo) => {
    return todo.id !== id
  })
  removeChildren(todoList);
  populateList(todos);
}
//User can edit todos
function getTodoById(id) {
    return todos.find((todo) => {
      return todo.id === id
    })
  }
function editTodo(id) {
  let newText = prompt("Edit:", getTodoById(id).text)
  if (newText !== null) {
    todos = todos.map( (todo) => {
      if (todo.id === id) {
        todo.text = newText
      }
      return todo
    })
    removeChildren(todoList);
    populateList(todos);
  }
}

//User can mark todos as complete WORKS
function toggleDone(id) {
    todos = todos.map( (todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete
      }
      return todo
    })
    removeChildren(todoList);
    populateList(todos);
  }

//load up todos on page load WORKS
populateList(todos);
