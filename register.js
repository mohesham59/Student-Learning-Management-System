// If already logged in, skip register page
if (localStorage.getItem("lms_session")) {
    window.location.href = "dashboard.html";
}

// ===== Show / Hide password =====
function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    input.type = input.type === "password" ? "text" : "password";
}

// ===== Show / Hide error =====
function showError(message) {
    const errEl = document.getElementById("error-msg");
    errEl.textContent = "⚠ " + message;
    errEl.classList.remove("hidden");
    errEl.style.animation = "none";
    errEl.offsetHeight;
    errEl.style.animation = "";
}

function hideError() {
    document.getElementById("error-msg").classList.add("hidden");
}

// ===== Password Strength Checker =====
function checkStrength() {
    const password = document.getElementById("password").value;
    const fill = document.getElementById("strength-fill");
    const text = document.getElementById("strength-text");

    let strength = 0;
    if (password.length >= 6)  strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
        { label: "",         color: "",          width: "0%" },
        { label: "Weak",     color: "#ef4444",   width: "25%" },
        { label: "Fair",     color: "#f97316",   width: "50%" },
        { label: "Good",     color: "#eab308",   width: "75%" },
        { label: "Strong",   color: "#22c55e",   width: "100%" },
    ];

    const level = Math.min(strength, 4);
    fill.style.width = levels[level].width;
    fill.style.backgroundColor = levels[level].color;
    text.textContent = levels[level].label ? "Strength: " + levels[level].label : "";
    text.style.color = levels[level].color;
}

// ===== Register =====
function register() {
    const fullname        = document.getElementById("fullname").value.trim();
    const username        = document.getElementById("username").value.trim();
    const password        = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    hideError();

    // Validation checks
    if (!fullname || !username || !password || !confirmPassword) {
        showError("Please fill in all fields.");
        return;
    }

    if (fullname.length < 3) {
        showError("Full name must be at least 3 characters.");
        return;
    }

    if (username.length < 3) {
        showError("Username must be at least 3 characters.");
        return;
    }

    if (/\s/.test(username)) {
        showError("Username cannot contain spaces.");
        return;
    }

    if (password.length < 6) {
        showError("Password must be at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        showError("Passwords do not match.");
        return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("lms_users")) || [];

    // Check if username already taken
    const usernameExists = users.find(u => u.username === username);
    if (usernameExists) {
        showError("This username is already taken. Please choose another.");
        return;
    }

    // Create new user object
    const newUser = {
        id:        Date.now(),
        fullname:  fullname,
        username:  username,
        password:  password,
        joinedAt:  new Date().toLocaleDateString()
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem("lms_users", JSON.stringify(users));

    // Auto-login after register
    localStorage.setItem("lms_session", newUser.username);
    localStorage.setItem("lms_user", newUser.fullname);

    // Go to dashboard
    window.location.href = "dashboard.html";
}

// Allow register with Enter key
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") register();
});
