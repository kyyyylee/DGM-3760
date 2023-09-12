//array of categories
let categories = ['School', 'Work', 'Chores', 'Personal']

//todo data model: array of objects. each todo is a new object
let todos = [
    {
      todoName: 'Example To Do',
      todoStatus: false,
      todoID: 0,
      todoCategory: categories[0] ,
      todoDueDate: "01/01/2001",
    }
]

//function to add todo (object)
function addToDo () {
    //will eventually make the new to do be a form for input
    newToDo = {
        todoName: 'To Do App DGM 3760',
      todoStatus: false,
      todoID: 1,
      todoCategory: categories[0] ,
      todoDueDate: "08/31/2023",
    }
    todos.push(newToDo)
    console.log(todos)
}

//function to add a new category
function addCategory () {
    newCategory = 'Shopping'
    categories.push(newCategory)
    console.log(categories)
}
addToDo()
addCategory()