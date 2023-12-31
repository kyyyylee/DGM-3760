// initial todos
// DO NOT EDIT THIS ARRAY
// You may add props to objects if needed.
let todos = [];
let categories = [];

async function getElements() {
  let todosPromise = fetch("/api/todos");
  let categoriesPromise = fetch("/api/categories");

  try {
    const [todosResponse, categoriesResponse] = await Promise.all([
      todosPromise,
      categoriesPromise,
    ]);

    const todosData = await todosResponse.json();
    const categoriesData = await categoriesResponse.json();

    todos = todosData;
    categories = categoriesData;

    removeChildren(todoList);
    populateList(todos);
    removeChildren(categoryList);
    populateCategories(categories);
    categorySelection();
    categoryFilter();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
getElements();

//global scopes
const todoList = document.querySelector(".todoList");
const newButton = document.getElementById("newBtn");
const newTodoInput = document.getElementById("input");
const pendingTasks = document.querySelector("#pendingTasks");
const clearButton = document.getElementById("clearBTN");
const categoryButton = document.getElementById("categoryBTN");
const categoryList = document.querySelector(".categoryList");
const categoryFilterer = document.getElementById("categoryFilter");

//prevent repeat todos WORKS
function removeChildren(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

//User can add todos WORKS
newButton.addEventListener("click", addNewTodo);
let newTodoID = 3;
function addNewTodo() {
  const newTodoName = document.getElementById("input").value;
  const selectedCategory = document.getElementById("categorySelector").value;

  fetch("/api/todos")
    .then((res) => res.json())
    .then((data) => {
      let newTodo = {
        id: newTodoID,
        todo: newTodoName,
        complete: false,
        category: selectedCategory,
      };
      fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: newTodo }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          todos = data;
          removeChildren(todoList);
          populateList(todos);
        });

      document.getElementById("input").value = "";
      newTodoID++;
      console.log(newTodo);
    });
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
    let listItem = document.createElement("li");
    listItem.innerText = todo.todo;
    listItem.onclick = () => {
      toggleDone(todo.id);
    };
    if (todo.complete) {
      listItem.classList.add("done");
    }
    let editButton = document.createElement("span");
    editButton.classList.add("fa", "fa-edit", "editBtn");
    editButton.onclick = (event) => {
      event.stopPropagation();
      editTodo(todo.id);
    };
    let trashButton = document.createElement("span");
    trashButton.classList.add("fa", "fa-trash");
    trashButton.onclick = (event) => {
      event.stopPropagation();
      deleteTodo(todo.id);
    };
    listItem.appendChild(trashButton);
    listItem.appendChild(editButton);
    todoList.appendChild(listItem);
  });
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

//User can delete todos and categories
function deleteTodo(id) {
  fetch(`/api/todos/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      todos = data;
      removeChildren(todoList);
      populateList(todos);
    });
}

function deleteCategory(id) {
  fetch(`/api/categories/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      categories = data;
      removeChildren(categoryList);
      populateCategories(categories);
      categorySelection();
      categoryFilter();
      removeChildren(todoList);
      populateList(todos);
    });
}

//User can edit todos & categories
function getTodoById(id) {
  return todos.find((todo) => {
    return todo.id === id;
  });
}

function editTodo(id) {
  let newText = prompt("Edit:");
  if (newText !== null) {
    const updatedTodo = { todo: newText };
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ updatedTodo }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        todos = data;

        todos = todos.map((todo) => {
          if (todo.id === id) {
            todo.todo = newText;
          }
          return todo;
        });

        todos = todos.map((todo) => {
          if (todo.id === id) {
            todo.todo = newText;
          }
          return todo;
        });

        removeChildren(todoList);
        populateList(todos);
      });
  }
}

function getCategoryByID(id) {
  return categories.find((category) => {
    return category.id === id;
  });
}

function editCategory(id) {
  let newText = prompt("Edit:");
  if (newText !== null) {
    const updatedCategory = { name: newText };
    fetch(`/api/todos/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify({ category: updatedCategory }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        categories = data;
        todos = todos.map((todo) => {
          if (todo.category === id) {
            todo.category = newText;
          }
          return todo;
        });
        categories = categories.map((category) => {
          if (category.id === id) {
            category.name = newText;
          }
          return category;
        });
        removeChildren(categoryList);
        populateCategories(categories);
        categorySelection();
        categoryFilter();
        removeChildren(todoList);
        populateList(todos);
      });
  }
}

//User can mark todos as complete WORKS
function toggleDone(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      todo.complete = !todo.complete;
    }
    return todo;
  });
  removeChildren(todoList);
  populateList(todos);
}

//User can add a catergory
categoryButton.addEventListener("click", addCategory);
let newCategoryID = 3
function addCategory() {
  const categoryText = document.getElementById("category").value
  const newCategory = { 
    name: categoryText,
    id: newCategoryID, 
  }
  categories.push(newCategory);
  removeChildren(categoryList);
  populateCategories(categories);
  categorySelection();
  categoryFilter();
  //clear input box after entering
  document.getElementById("category").value = ""
  newCategoryID ++
  console.log(newCategory);
}

//User can view categories
function populateCategories(categories) {
  categories.forEach((category) => {
    let listItem = document.createElement("li");
    listItem.innerText = category.name;
    let editButton = document.createElement("span");
    editButton.classList.add("fa", "fa-edit", "editBtn");
    editButton.onclick = (event) => {
      event.stopPropagation();
      editCategory(category.id);
    };
    let trashButton = document.createElement("span");
    trashButton.classList.add("fa", "fa-trash");
    trashButton.onclick = (event) => {
      event.stopPropagation();
      deleteCategory(category.id);
    };
    listItem.appendChild(trashButton);
    listItem.appendChild(editButton);
    categoryList.appendChild(listItem);
  });
}

//User selects a category when adding a todo
function categorySelection() {
  let categorySelector = document.getElementById("categorySelector");
  categorySelector.innerHTML = '<option value="">Category</option>';
  categories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category.name;
    option.innerText = category.name;
    categorySelector.appendChild(option);
  });
}

//User can filter list by category
categoryFilterer.addEventListener("change", filterTodos);

function categoryFilter() {
  categoryFilterer.innerHTML = '<option value="all">All</option>';
  categories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category.name;
    option.innerText = category.name;
    categoryFilterer.appendChild(option);
  });
}

function filterTodos() {
  let selectedCategory = document.getElementById("categoryFilter").value;

  if (selectedCategory === "all") {
    removeChildren(todoList);
    populateList(todos);
  } else {
    let filteredTodos = todos.filter((todo) => {
      return todo.category === selectedCategory;
    });
    removeChildren(todoList);
    populateList(filteredTodos);
  }
}

//load up todos on page load WORKS
populateList(todos);
