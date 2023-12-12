const express = require('express')
const hostname = "127.0.0.1"
const app = express()
const port = 3000

app.use(express.static('client'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded ( {extended: true}))

let categories = [
 /*  {
    name: "work",
    id: 0, 
  },
  {
    name: "school",
    id: 1, 
  },
  {
    name: "personal",
    id: 2, 
  }, */
];
let todos = [
 /*  {
    id: 0,
    text: "write code",
    complete: false,
    category: "work",
  },
  {
    id: 1,
    text: "basic todo app",
    complete: false,
    category: "school",
  },
  {
    id: 2,
    text: "clean room",
    complete: false,
    category: "personal",
  }, */
];

//GET TODOS
app.get("/api/todos", (req, res) => {
  res.send(todos);
});

//POST TODO
app.post("/api/todos", (req, res) => {
  const newTodo = req.body.todo;
  todos.push(newTodo);
  res.send(todos);
});

//PUT TODO (update)
app.put("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedTodo = req.body;
  todos = todos.map((todo) => {
    if (todo.id === todoId) {
      todo.todo = updatedTodo.todo;
    }
    return todo;
  });
  res.send(todos);
});

//DELETE TODO
app.delete("/api/todos/:id", (req, res) => {
  const todoID = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== todoID);
  res.send(todos);
});

//GET ALL TODOS for a CATEGORY
app.get("/api/todos/categories/:id", (req, res) => {
  const categoryName = req.params.categoryName;
  const todosForCategory = todos.filter(
    (todo) => todo.category === categoryName
  );
  res.send(todosForCategory);
});

//GET CATEGORIES
app.get("/api/categories", (req, res) => {
  res.send(categories);
});

//POST CATEGORIES
app.post("/api/categories", (req, res) => {
  const newCategory = req.body.name;
  categories.push(newCategory);
  res.send(categories);
});

//PUT CATEGORIES
app.put("/api/todos/categories/:id", (req, res) => {
  const categoryID = parseInt(req.params.id);
  const updatedCategory = req.body.category.name;
  categories = categories.map((category) => {
    if (category.id === categoryID) {
      category.name = updatedCategory;
    }
    return category;
  });
  res.send(categories);
});

//DELETE CATEGORIES
app.delete("/api/categories/:id", (req, res) => {
  const categoryID = parseInt(req.params.id);
  categories = categories.filter((category) => category.id !== categoryID);
  res.send(categories);
});


app.listen(port, () => {
    console.log(`Example app listening on port http://${hostname}:${port}`)
})