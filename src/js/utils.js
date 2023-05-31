const inputTodo = document.querySelector(".new-todo");
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const listTodo = document.querySelector(".todo-list");
let todos = [];

class Todo {
  constructor(id, title, completed) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
}

export const renderTodo = (todo) => {
  let li = document.createElement("li");
  let div = document.createElement("div");
  let inputChk = document.createElement("input");
  let label = document.createElement("label");
  let btnDelete = document.createElement("button");
  let inputEdit = document.createElement("input");

  inputChk.setAttribute("type", "checkbox");
  inputChk.classList.add("toggle");
  btnDelete.classList.add("destroy");
  inputEdit.classList.add("edit");
  div.classList.add("view");
  label.innerText = todo.title;
  inputEdit.innerText = todo.title;

  div.append(inputChk, label, btnDelete);
  li.append(div, inputEdit);
  li.setAttribute("id", todo.id);
  if (todo.completed === "Completed") {
    li.classList.add("completed");
  }
  listTodo.append(li);
};

export const createTodo = () => {
  let newTodo;
  inputTodo.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const inputValue = e.target.value.trim();
      if (inputValue.length === 0) {
        alert("Please enter a ToDo with more than one letter");
      } else {
        const newId = (todos.length + 1).toString();
        newTodo = new Todo(newId, inputValue, "pending");
        todos.push(newTodo);
        localStorage.setItem("mydayapp-js", JSON.stringify(todos));
        inputTodo.value = "";
        renderTodo(newTodo);
      }
    }
  });
};

export const getTodos = (filter = "all") => {
  todos = JSON.parse(localStorage.getItem("mydayapp-js"));
  if (filter === "completed") {
    todos = todos.filter((todo) => todo.completed);
  } else if (filter === "pending") {
    todos = todos.filter((todo) => todo.completed === "pending");
  }
  todos.forEach((todo) => renderTodo(todo));
};
