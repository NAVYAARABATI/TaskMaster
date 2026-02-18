
const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("add-btn");
const listContainer = document.getElementById("list-container");
addBtn.addEventListener("click", addTask);
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = inputBox.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskText;
  const delBtn = document.createElement("button");
  delBtn.className = "delete-btn";
  delBtn.textContent = "Delete";
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);
  listContainer.appendChild(li);

  saveData();
  inputBox.value = "";
  checkbox.addEventListener("change", () => {
    li.classList.toggle("checked");
    saveData();
  });

  delBtn.addEventListener("click", () => {
    li.remove();
    saveData();
  });
}
function saveData() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

function loadData() {
  const data = localStorage.getItem("tasks");
  if (data) {
    listContainer.innerHTML = data;

    Array.from(listContainer.children).forEach((li) => {
      const checkbox = li.querySelector("input[type=checkbox]");
      const delBtn = li.querySelector("button.delete-btn");

      checkbox.addEventListener("change", () => {
        li.classList.toggle("checked");
        saveData();
      });

      delBtn.addEventListener("click", () => {
        li.remove();
        saveData();
      });
    });
  }
}

loadData();
