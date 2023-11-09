
// initial todos
// DO NOT EDIT THIS ARRAY
// You may add props to objects if needed.
let todos = [
  {
    todoID: 0,
    todoText: "Finish Homework",
    todoComplete: false,
  },
  {
    todoID: 1,
    todoText: "Walk the dog",
    todoComplete: true,
  },
  {
    todoID: 2,
    todoText: "Clean my room",
    todoComplete: false,
  },
];

//global scopes
const todoList = document.querySelector(".todoList");
const newBtn = document.getElementById("newBtn");
const newTodoInput = document.getElementById("input");
const pendingTasks = document.querySelector("#pendingTasks");
const clearButton = document.getElementById("clearBTN");

//prevent repeat todos
function removeChildren(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

//User can add todos
newBtn.addEventListener("click", addNewTodo);
function addNewTodo() {
  const newTodoName = document.getElementById("input").value;
  const newTodo = {
    todoID: todos.length,
    todoText: newTodoName,
    todoComplete: false
  };
  todos.push(newTodo);
  removeChildren(todoList);
  populateList(todos);
  document.getElementById("input").value = "";
}

//add new todo when pressing enter DOES NOT WORK YET
newBtn.addEventListener("keyup", (event) => {
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
});

//User can view todos
function populateList(todos) {
  todos.forEach((todo) => {
    let listItem = document.createElement("li")
    listItem.innerText = todo.todoText 
   /*  listItem.onclick = () => {
      toggleDone(todo.id)
    } */
    if (todo.complete) {
      listItem.classList.add("done")
    }
    todoList.appendChild(listItem)
  })
  numberLeft();
}

//App shows the user number of todos left to complete
function numberLeft() {
  let count = 0;
  for (let i in todos) {
    if (todos[i].todoComplete === false) {
      count++;
    }
  }
  pendingTasks.innerHTML = `You have ${count} pending tasks.`;
  return count;
}

//App can delete (aka clear) all done todos at once.
clearButton.addEventListener("click", () => {
  deleteDoneTasks();
});
function deleteDoneTasks() {
  todos = todos.filter((todo) => todo.todoComplete != true);
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
function editTodo(id) {
  let newText = prompt("Edit todo:", getTodoById(id).task)
  if (newText !== null) {
    todos = todos.map( (todo) => {
      if (todo.id === id) {
        todo.task = newText
      }
      return todo
    })
    removeChildren(todoList);
    populateList(todos);
  }
}
//User can mark todos as complete 
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


//load up todos on page load
populateList(todos);
