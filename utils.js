// ===== Auth Guard =====
function requireAuth() {
    if (!localStorage.getItem("lms_session")) {
        window.location.href = "login.html";
    }
}

// ===== Logout =====
function logout() {
    // Only clear session, keep users list and data
    localStorage.removeItem("lms_session");
    localStorage.removeItem("lms_user");
    localStorage.removeItem("lms_tasks");
    localStorage.removeItem("lms_courses");
    window.location.href = "login.html";
}

// ===== Get current user display name =====
function getUser() {
    return localStorage.getItem("lms_user") || "Student";
}

// ===== Load user info into sidebar =====
function loadUserInfo() {
    const username = getUser();
    const nameEl   = document.getElementById("sidebar-username");
    const avatarEl = document.getElementById("sidebar-avatar");
    if (nameEl)   nameEl.textContent   = username;
    if (avatarEl) avatarEl.textContent = username.charAt(0).toUpperCase();
}

// ===== Toast notification =====
function showToast(message, type = "success") {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === "success" ? "✓" : "✕"}</span><span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// ===== Tasks helpers =====
function getTasks() {
    return JSON.parse(localStorage.getItem("lms_tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("lms_tasks", JSON.stringify(tasks));
}

// ===== Courses helpers =====
function getCourses() {
    return JSON.parse(localStorage.getItem("lms_courses")) || [];
}

function saveCourses(courses) {
    localStorage.setItem("lms_courses", JSON.stringify(courses));
}
