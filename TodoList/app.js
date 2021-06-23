const todoForm = document.getElementById("todo-form");
const todoContainer = document.querySelector(".todo-container");
const todoFormInput = document.getElementById("todo-input");

let todos = [];

// create todo add and it to the DOM
function createTodo(todo) {
  let row = document.createElement("div");
  row.classList.add("todo-item");

  if (todo.completed) row.classList.add("completed-div");

  row.innerHTML = `
        <p class="${todo.completed ? "completed-text" : ""}">${todo.text}</p>
        <div class="todo-btns">
            <button data-id=${
              todo.id
            } onClick='updateTodo(this)' class="tick"> <i class="fas fa-check"></i></button>
            <button data-id=${
              todo.id
            } onClick='deleteTodo(this)' class="trash"> <i class="fas fa-trash"></i></button>
        </div>`;

  todoContainer.prepend(row); // prepanding to make todo appear at top
}

function addTodo(event) {
  event.preventDefault(); // SINCE it is a form
  const todoText = todoFormInput.value;
  const id = new Date().getTime();
  const todo = { id: id, text: todoText, completed: false };

  todos = [...todos, todo];
  localStorage.setItem("todos", JSON.stringify(todos));

  createTodo(todo); // creating and adding new todo to window
  todoFormInput.value = ""; // clearing the input FIeld
}

function updateTodo(element) {
  const id = element.dataset.id;

  for (todo of todos) {
    if (id == todo.id) {
      todo.completed = !todo.completed;
      break;
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));

  let parentDiv = element.parentNode.parentNode;
  parentDiv.classList.toggle("completed-div"); // toggling  classses to make todo look completed
  parentDiv.querySelector("p").classList.toggle("completed-text");
}

function deleteTodo(element) {
  const id = element.dataset.id;

  for (i in todos) {
    // finding todo using id
    if (todos[i].id == id) {
      todos.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));

  let parentDiv = element.parentNode.parentNode;
  parentDiv.classList.add("deleted");
  parentDiv.addEventListener("transitionend", () => {
    // for the fading to todo
    parentDiv.remove();
  });
}

function fetchAllTodos() {
  let temp = localStorage.getItem("todos");
  todos = temp
    ? JSON.parse(temp)
    : [
        { id: 1606813611717, text: "This is a Task!", completed: false },
        {
          id: 1606813625543,
          text: "This is a completed Task!",
          completed: true,
        },
      ];

  todos.forEach((todo) => createTodo(todo));
}

// EventListeners
todoForm.addEventListener("submit", addTodo);

// Initial Call TO local Storage
fetchAllTodos();
