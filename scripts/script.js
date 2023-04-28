import refs from "./refs.js";
import { addNewTask, handleTaskBehaviuor, fillTasksList } from "./functions.js";



refs.addBtn.addEventListener('click', addNewTask);
refs.myUl.addEventListener('click', handleTaskBehaviuor);

window.addEventListener("DOMContentLoaded", fillTasksList);
