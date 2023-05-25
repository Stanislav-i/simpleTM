const URL = "https://646f4bfd09ff19b12086f6e1.mockapi.io/api/todos";

function createTask(value) { 
    return fetch(URL, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
    });
}

function getTasks() {
    return fetch(URL).then((res) => res.json());
}

function deleteTask(id) { 
    return fetch(`${URL}/${id}`, {
        method: "DELETE",
    });
}

function updateTask(id, status) { 
    return fetch(`${URL}/${id}`, {
      method: "PUT",
        body: JSON.stringify({isDone: status}),
      headers: {
        "Content-Type": "application/json",
      },
    });
}

export { createTask, getTasks, updateTask, deleteTask };

// async function getTasks() {
//   const res = await fetch(URL);
//   return await res.json();
// }