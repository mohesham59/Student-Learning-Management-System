requireAuth();
loadUserInfo();

// ===== Load Profile =====
function loadProfile() {
    const username = getUser();
    document.getElementById("profile-username").value = username;
    document.getElementById("profile-display-name").textContent = username;
    document.getElementById("profile-avatar-letter").textContent = username.charAt(0).toUpperCase();

    // Stats
    const tasks = getTasks();
    const courses = getCourses();
    const completed = tasks.filter(t => t.status === "done").length;

    document.getElementById("profile-stat-tasks").textContent = tasks.length;
    document.getElementById("profile-stat-courses").textContent = courses.length;
    document.getElementById("profile-stat-done").textContent = completed;
    document.getElementById("profile-stat-pending").textContent = tasks.length - completed;
}

// ===== Update Username =====
function updateUsername() {
    const newUsername = document.getElementById("profile-username").value.trim();

    if (!newUsername) {
        showToast("Username cannot be empty!", "error");
        return;
    }

    if (newUsername.length < 3) {
        showToast("Username must be at least 3 characters.", "error");
        return;
    }

    localStorage.setItem("lms_user", newUsername);

    // Update UI immediately
    document.getElementById("profile-display-name").textContent = newUsername;
    document.getElementById("profile-avatar-letter").textContent = newUsername.charAt(0).toUpperCase();
    document.getElementById("sidebar-username").textContent = newUsername;
    document.getElementById("sidebar-avatar").textContent = newUsername.charAt(0).toUpperCase();

    const successEl = document.getElementById("success-msg");
    successEl.classList.remove("hidden");
    setTimeout(() => successEl.classList.add("hidden"), 3000);

    showToast("Username updated successfully! ✓");
}

loadProfile();

document.getElementById("profile-username").addEventListener("keydown", function(e) {
    if (e.key === "Enter") updateUsername();
});
