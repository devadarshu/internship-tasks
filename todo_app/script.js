
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const emptyMessage = document.querySelector("#emptyMessage");

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update empty message
function updateEmptyMessage() {
    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";
}

// Display tasks on the page
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent = task.text;

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.classList.add("complete-btn");
        completeBtn.dataset.action = "complete";
        completeBtn.dataset.index = index;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.dataset.action = "delete";
        deleteBtn.dataset.index = index;

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateEmptyMessage();
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
}

// Event listener for Add button
addBtn.addEventListener("click", addTask);

// Add task when Enter is pressed
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Event delegation for Complete and Delete buttons
taskList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button || !taskList.contains(button)) {
        return;
    }

    const index = Number(button.dataset.index);
    const action = button.dataset.action;

    if (action === "complete") {
        tasks[index].completed = !tasks[index].completed;
    }

    if (action === "delete") {
        tasks.splice(index, 1);
    }

    saveTasks();
    renderTasks();
});

// Restore tasks when the page loads
renderTasks();
