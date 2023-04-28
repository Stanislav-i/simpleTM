import refs from "./refs.js";
import { load, save } from "./storage.js";

const STORAGE_KEY = "tasks";
let currentID = 1;

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
  createLi({
    text: value,
    id: currentID,
  });

  addTaskToStorage(value);
  clearInput();
}

function createLi({ text, isDone = false, id = currentID }) {
  const liEl = document.createElement("li");
  liEl.textContent = text;
  if (isDone) liEl.className = "checked";
  liEl.dataset.id = id;
  addCloseButton(liEl);
  refs.myUl.appendChild(liEl);
}

function handleTaskBehaviuor({ target }) {
  const currentState = load(STORAGE_KEY);
  if (target.tagName === "LI") {
    target.classList.toggle("checked");
    const taskObj = currentState.find(
      (task) => Number(task.id) === Number(target.dataset.id)
    );
    taskObj.isDone = !taskObj.isDone;
  } else if (target.classList.contains("close")) {
    target.parentNode.remove();
    const taskIndex = currentState.findIndex(
      (task) => Number(task.id) === Number(target.parentNode.dataset.id)
    );
    currentState.splice(taskIndex, 1);
  }
  save(STORAGE_KEY, currentState);
}

function createTaskObject({ text, isDone = false }) {
  return {
    text,
    isDone,
    id: currentID,
  };
}

function addTaskToStorage(text) {
  const currentState = load(STORAGE_KEY);
  if (currentState === undefined) {
    save(STORAGE_KEY, [createTaskObject({ text })]);
  } else {
    currentState.push(createTaskObject({ text }));
    save(STORAGE_KEY, currentState);
  }
  currentID += 1;
}

function fillTasksList() {
  const currentState = load(STORAGE_KEY);
  if (currentState !== undefined) {
      currentState.forEach((taskObj) => createLi(taskObj));
      currentID = currentState.length === 0 ? 1 : currentState[currentState.length - 1].id + 1;
  }
}

export { addNewTask, handleTaskBehaviuor, fillTasksList };
