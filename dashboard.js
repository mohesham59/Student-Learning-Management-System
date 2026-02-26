requireAuth();
loadUserInfo();

// ===== Announcements =====
const announcements = [
    "📢 Welcome to your Learning Management System!",
    "📅 Assignment 1 deadline is next Friday. Stay on track!",
    "🎓 New course materials have been uploaded. Check your courses.",
    "✅ Remember to mark your tasks as complete when done.",
    "💡 Tip: Use the priority filter to focus on High priority tasks first.",
    "🚀 Keep up the great work! Consistency is key to success."
];

let announcementIndex = 0;

function updateAnnouncement() {
    const el = document.getElementById("announcement-text");
    el.style.opacity = "0";
    setTimeout(() => {
        el.textContent = announcements[announcementIndex];
        el.style.opacity = "1";
        el.style.transition = "opacity 0.4s ease";
    }, 200);
    document.getElementById("ann-counter").textContent = (announcementIndex + 1) + " / " + announcements.length;
}

function nextAnnouncement() {
    announcementIndex = (announcementIndex + 1) % announcements.length;
    updateAnnouncement();
}

function prevAnnouncement() {
    announcementIndex = (announcementIndex - 1 + announcements.length) % announcements.length;
    updateAnnouncement();
}

updateAnnouncement();

// ===== Clock =====
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    if (hours < 10) hours = "0" + hours;

    document.getElementById("clock").textContent = hours + ":" + minutes + ":" + seconds + " " + ampm;

    // Date
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    document.getElementById("clock-date").textContent =
        days[now.getDay()] + ", " + months[now.getMonth()] + " " + now.getDate() + " " + now.getFullYear();
}

updateClock();
setInterval(updateClock, 1000);

// ===== Statistics =====
function loadStats() {
    const tasks = getTasks();
    const courses = getCourses();

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "done").length;
    const pending = total - completed;

    // Animate counting
    animateCount("stat-total", total);
    animateCount("stat-completed", completed);
    animateCount("stat-pending", pending);
    animateCount("stat-courses", courses.length);
}

function animateCount(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    let current = 0;
    const step = Math.ceil(target / 20) || 1;
    const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(interval);
    }, 40);
}

loadStats();

// ===== Recent Tasks =====
function loadRecentTasks() {
    const tasks = getTasks().slice(-5).reverse();
    const container = document.getElementById("recent-tasks");

    if (tasks.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-icon">📋</div><p>No tasks yet</p></div>';
        return;
    }

    container.innerHTML = tasks.map(task => `
        <div class="mini-list-item">
            <div>
                <div class="mini-item-title" style="${task.status === 'done' ? 'text-decoration:line-through;color:var(--text-dim)' : ''}">${task.title}</div>
                <div class="mini-item-sub">${task.date} • ${task.priority}</div>
            </div>
            <span class="badge ${task.status === 'done' ? 'badge-done' : 'badge-pending'}">${task.status === 'done' ? 'Done' : 'Pending'}</span>
        </div>
    `).join("");
}

// ===== Recent Courses =====
function loadRecentCourses() {
    const courses = getCourses().slice(-4).reverse();
    const container = document.getElementById("recent-courses");

    if (courses.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-icon">📚</div><p>No courses yet</p></div>';
        return;
    }

    container.innerHTML = courses.map(course => `
        <div class="mini-list-item">
            <div>
                <div class="mini-item-title">${course.name}</div>
                <div class="mini-item-sub">👤 ${course.instructor}</div>
            </div>
        </div>
    `).join("");
}

loadRecentTasks();
loadRecentCourses();
