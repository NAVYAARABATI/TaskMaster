const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("add-btn");
const listContainer = document.getElementById("list-container");

function addTask() {
  const taskText = inputBox.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  li.append(checkbox, span, deleteBtn);
  listContainer.appendChild(li);
  inputBox.value = "";

  saveData();
}

addBtn.addEventListener("click", addTask);

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

listContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.closest("li").remove();
    saveData();
  }
});

listContainer.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const span = e.target.nextElementSibling;
    e.target.checked ? span.parentElement.classList.add("checked") : span.parentElement.classList.remove("checked");
    saveData();
  }
});

function saveData() {
  const tasks = [];
  listContainer.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      checked: li.querySelector("input").checked,
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
  const data = JSON.parse(localStorage.getItem("tasks") || "[]");
  listContainer.innerHTML = "";
  data.forEach((task) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.checked;

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    li.append(checkbox, span, deleteBtn);
    if (task.checked) li.classList.add("checked");
    listContainer.appendChild(li);
  });
}

showTask();
