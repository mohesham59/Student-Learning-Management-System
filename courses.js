requireAuth();
loadUserInfo();

let courses = getCourses();

const courseIcons = ["📘", "📗", "📙", "📕", "🖥️", "🧮", "🔬", "🎨", "📐", "🌐"];

function getRandomIcon() {
    return courseIcons[Math.floor(Math.random() * courseIcons.length)];
}

// ===== Add Course =====
function addCourse() {
    const name = document.getElementById("course-name").value.trim();
    const instructor = document.getElementById("course-instructor").value.trim();

    if (!name || !instructor) {
        showToast("Please fill in all fields!", "error");
        return;
    }

    const newCourse = {
        id: Date.now(),
        name: name,
        instructor: instructor,
        icon: getRandomIcon(),
        addedAt: new Date().toLocaleDateString()
    };

    courses.push(newCourse);
    saveCourses(courses);

    document.getElementById("course-name").value = "";
    document.getElementById("course-instructor").value = "";

    showToast("Course added successfully! ✓");
    renderCourses();
}

// ===== Delete Course =====
function deleteCourse(id) {
    const confirmed = confirm("Are you sure you want to delete this course?");
    if (!confirmed) return;

    courses = courses.filter(c => c.id !== id);
    saveCourses(courses);
    showToast("Course deleted.", "error");
    renderCourses();
}

// ===== Render Courses =====
function renderCourses() {
    const container = document.getElementById("courses-container");
    document.getElementById("course-count").textContent = courses.length + " course" + (courses.length !== 1 ? "s" : "");

    if (courses.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1">
                <div class="empty-icon">📚</div>
                <p>No courses yet. Add your first course above!</p>
            </div>`;
        return;
    }

    container.innerHTML = courses.map(course => `
        <div class="course-card">
            <div class="course-card-header">
                <div class="course-icon">${course.icon}</div>
                <button class="btn btn-danger" onclick="deleteCourse(${course.id})" style="padding:6px 10px;font-size:12px;">🗑</button>
            </div>
            <div class="course-name">${course.name}</div>
            <div class="course-instructor">👤 ${course.instructor}</div>
        </div>
    `).join("");
}

renderCourses();

document.getElementById("course-name").addEventListener("keydown", function(e) {
    if (e.key === "Enter") document.getElementById("course-instructor").focus();
});
document.getElementById("course-instructor").addEventListener("keydown", function(e) {
    if (e.key === "Enter") addCourse();
});
