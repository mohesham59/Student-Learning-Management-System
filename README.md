# ⚡ EduLMS — Student Learning Management System

A client-side Learning Management System built with pure **HTML**, **CSS**, and **JavaScript**. No frameworks, no libraries — just clean, organized front-end code. Data is stored and persisted using **localStorage**.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Pages](#pages)
- [Features](#features)
- [Project Structure](#project-structure)
- [How to Run](#how-to-run)
- [localStorage Structure](#localstorage-structure)
- [Technologies Used](#technologies-used)

---

## 📖 About the Project

This project was built as a client-side LMS where students can register, log in, manage their tasks and courses, and update their profile. All data is saved in the browser using localStorage so it persists across page reloads.

---

## 📄 Pages

| Page | File | Description |
|------|------|-------------|
| Login | `login.html` | Sign in with registered credentials |
| Register | `register.html` | Create a new student account |
| Dashboard | `dashboard.html` | Overview with clock, announcements, and statistics |
| Tasks | `tasks.html` | Add, delete, complete, search, filter, and sort tasks |
| Courses | `courses.html` | Add and delete courses in a card grid layout |
| Profile | `profile.html` | View stats and update username |

---

## ✨ Features

### 🔐 Authentication
- Register with Full Name, Username, and Password
- Login with real credential checking (username + password must match)
- Password strength indicator (Weak / Fair / Good / Strong)
- Show / Hide password toggle
- Duplicate username check on registration
- Auto-login after successful registration
- Auth guard — all pages redirect to login if not logged in
- Session stored in localStorage

### 🏠 Dashboard
- Live clock updated every second (12-hour format with AM/PM)
- Announcements carousel with Prev / Next buttons
- Statistics cards with animated number counting (Total Tasks, Completed, Pending, Courses)
- Recent tasks and courses preview sections

### ✅ Tasks
- Add tasks with Title, Due Date, and Priority (High / Medium / Low)
- Mark tasks as complete / incomplete (with strikethrough style)
- Delete tasks with confirmation dialog
- Real-time search by task title
- Filter by: All / Pending / Completed / High Priority
- Sort by: Newest / Due Date / Priority
- Task count display
- Tasks saved in localStorage

### 📚 Courses
- Add courses with Course Name and Instructor
- Random emoji icon assigned to each course
- Delete courses with confirmation dialog
- Responsive card grid layout
- Courses saved in localStorage

### 👤 Profile
- Display user avatar with first letter of name
- Show stats: total tasks, courses, completed, pending
- Edit and update username
- Changes reflected instantly in the sidebar
- Success message on save

### 🎨 UI / UX
- Dark theme with CSS variables
- Sidebar navigation on all pages (after login)
- Toast notifications instead of plain alerts
- Smooth fade-in animations on page load
- Hover effects on task items showing action buttons
- Fully separated HTML, CSS, and JS files

---

## 📁 Project Structure

```
EduLMS/
│
├── login.html
├── register.html
├── dashboard.html
├── tasks.html
├── courses.html
├── profile.html
│
├── style.css        # Shared styles: sidebar, buttons, inputs, badges, toast
├── login.css        # Login & Register page styles
├── dashboard.css    # Dashboard stats, clock, announcements
├── tasks.css        # Task list, toolbar, checkboxes
├── pages.css        # Courses grid cards & Profile layout
│
├── utils.js         # Shared helpers: auth guard, logout, toast, localStorage
├── login.js         # Login logic and session handling
├── register.js      # Register logic, validation, password strength
├── dashboard.js     # Clock, announcements, stats, recent data
├── tasks.js         # Add, delete, complete, search, filter, sort tasks
├── courses.js       # Add, delete, render courses
└── profile.js       # Load profile, update username, display stats
```

---

## 🚀 How to Run

No installation or server needed. Just:

1. Download or clone the repository
```bash
git clone https://github.com/your-username/EduLMS.git
```

2. Open the project folder
3. Open `login.html` in your browser
4. Click **Register** to create a new account
5. After registering you will be redirected to the Dashboard automatically

> ⚠️ **Important:** Keep all files in the same folder structure. Moving files without updating the paths will break the CSS and JS links.

---

## 💾 localStorage Structure

| Key | Type | Description |
|-----|------|-------------|
| `lms_users` | Array | List of all registered users `{ id, fullname, username, password, joinedAt }` |
| `lms_session` | String | Username of the currently logged-in user |
| `lms_user` | String | Display name of the currently logged-in user |
| `lms_tasks` | Array | All tasks `{ id, title, date, priority, status, createdAt }` |
| `lms_courses` | Array | All courses `{ id, name, instructor, icon, addedAt }` |

---

## 🛠 Technologies Used

| Technology | Usage |
|------------|-------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, animations, CSS variables, Flexbox, Grid |
| JavaScript (ES6+) | Logic, DOM manipulation, localStorage |
| Google Fonts | `Plus Jakarta Sans` + `Syne` fonts |
| localStorage API | Data persistence across sessions |

---

## 👨‍💻 Author

Built as a student front-end project.

---

## 📝 License

This project is for educational purposes only.
