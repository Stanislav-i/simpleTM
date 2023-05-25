import refs from "./refs.js";
// import { load, save } from "./storage.js";
import { createTask, getTasks, updateTask, deleteTask } from "./api.js"


function addCloseButton(target) {
  const span = document.createElement("span");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  target.appendChild(span);
}

function addNewTask() {
  const clearInput = () => (refs.myInput.value = "");

  const value = refs.myInput.value.trim();
  if (value === "") {
    alert("Add text");
    clearInput();
    return;
  }

  createTask({ text: value })
    .then((res) => res.json())
    .then((task) => createLi(task));
  clearInput();
}

function createLi({ text, isDone, id }) {
  const liEl = document.createElement("li");
  liEl.textContent = text;
  if (isDone) liEl.className = "checked";
  liEl.dataset.id = id;
  addCloseButton(liEl);
  refs.myUl.appendChild(liEl);
}

function handleTaskBehaviuor({ target }) {
  if (target.tagName === "LI") {
    target.classList.toggle("checked");
    
    updateTask(target.dataset.id, target.classList
      .contains("checked"))
      
  } else if (target.classList.contains("close")) {
    deleteTask(target.parentNode.dataset.id)
      .then((res) => target.parentNode.remove());
  }
}

function fillTasksList() {
  getTasks()
    .then(tasks => tasks.forEach((task) => createLi(task)));

    // getTasks().then((tasks) => tasks.forEach(createLi));
  
}

export { addNewTask, handleTaskBehaviuor, fillTasksList };
