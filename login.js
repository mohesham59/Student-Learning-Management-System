// If already logged in, go to dashboard
if (localStorage.getItem("lms_session")) {
    window.location.href = "dashboard.html";
}

// ===== Show / Hide password =====
function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    input.type = input.type === "password" ? "text" : "password";
}

// ===== Show error message =====
function showError(message) {
    const errEl = document.getElementById("error-msg");
    errEl.textContent = "⚠ " + message;
    errEl.classList.remove("hidden");
    errEl.style.animation = "none";
    errEl.offsetHeight; // reflow to re-trigger animation
    errEl.style.animation = "";
}

function hideError() {
    document.getElementById("error-msg").classList.add("hidden");
}

// ===== Login =====
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    hideError();

    if (!username || !password) {
        showError("Please fill in all fields.");
        return;
    }

    // Get all registered users from localStorage
    const users = JSON.parse(localStorage.getItem("lms_users")) || [];

    // Find user that matches username AND password
    const foundUser = users.find(u => u.username === username && u.password === password);

    if (!foundUser) {
        showError("Invalid username or password.");
        return;
    }

    // Save session (store username so other pages know who is logged in)
    localStorage.setItem("lms_session", foundUser.username);
    localStorage.setItem("lms_user", foundUser.fullname || foundUser.username);

    window.location.href = "dashboard.html";
}

// Allow login with Enter key
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") login();
});
