requireAuth();
loadUserInfo();

let tasks = getTasks();

// ===== Add Task =====
function addTask() {
    const title = document.getElementById("task-title").value.trim();
    const date = document.getElementById("task-date").value;
    const priority = document.getElementById("task-priority").value;

    if (!title || !date) {
        showToast("Please fill in title and date!", "error");
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        date: date,
        priority: priority,
        status: "not done",
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(tasks);

    document.getElementById("task-title").value = "";
    document.getElementById("task-date").value = "";

    showToast("Task added successfully! ✓");
    renderTasks();
}

// ===== Delete Task =====
function deleteTask(id) {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
    showToast("Task deleted.", "error");
    renderTasks();
}

// ===== Toggle Complete =====
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    task.status = task.status === "done" ? "not done" : "done";
    saveTasks(tasks);
    renderTasks();

    if (task.status === "done") showToast("Task marked as complete! 🎉");
}

// ===== Render Tasks =====
function renderTasks() {
    const container = document.getElementById("tasks-container");
    const search = document.getElementById("search-input").value.toLowerCase();
    const sort = document.getElementById("sort-select").value;
    const filter = document.getElementById("filter-select").value;

    let filtered = tasks.filter(t => t.title.toLowerCase().includes(search));

    if (filter === "done") filtered = filtered.filter(t => t.status === "done");
    if (filter === "pending") filtered = filtered.filter(t => t.status === "not done");
    if (filter === "high") filtered = filtered.filter(t => t.priority === "High");

    const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
    if (sort === "priority") {
        filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sort === "date") {
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === "newest") {
        filtered.sort((a, b) => b.id - a.id);
    }

    // Update count
    document.getElementById("task-count").textContent = filtered.length + " task" + (filtered.length !== 1 ? "s" : "");

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <p>${tasks.length === 0 ? "No tasks yet. Add your first task above!" : "No tasks match your search."}</p>
            </div>`;
        return;
    }

    container.innerHTML = filtered.map(task => {
        const isDone = task.status === "done";
        const priorityKey = task.priority.toLowerCase();
        return `
        <div class="task-item ${isDone ? "done" : ""}" id="task-${task.id}">
            <div class="task-checkbox ${isDone ? "checked" : ""}" onclick="toggleComplete(${task.id})">
                ${isDone ? "✓" : ""}
            </div>
            <div class="task-body">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">
                    <span class="badge badge-${priorityKey}">${task.priority}</span>
                    <span class="task-date">📅 ${task.date}</span>
                    <span class="badge ${isDone ? "badge-done" : "badge-pending"}">${isDone ? "Done" : "Pending"}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn btn-success" onclick="toggleComplete(${task.id})">${isDone ? "↩ Undo" : "✓ Complete"}</button>
                <button class="btn btn-danger" onclick="deleteTask(${task.id})">🗑 Delete</button>
            </div>
        </div>`;
    }).join("");
}

renderTasks();

// Real-time search
document.getElementById("search-input").addEventListener("input", renderTasks);
document.getElementById("sort-select").addEventListener("change", renderTasks);
document.getElementById("filter-select").addEventListener("change", renderTasks);

// Enter to add task
document.getElementById("task-title").addEventListener("keydown", function(e) {
    if (e.key === "Enter") addTask();
});
