let loggedInUser = null;

// Register event listeners for sign-up, sign-in, and sign-out
document.getElementById("signin-btn")?.addEventListener("click", signIn);
document.getElementById("signup-btn")?.addEventListener("click", signUp);
document.getElementById("signout-btn")?.addEventListener("click", signOut);

function getRegisteredUsers() {
    return JSON.parse(localStorage.getItem("registeredUsers")) || [];
}

function saveRegisteredUser(user) {
    const users = getRegisteredUsers();
    users.push(user);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
}

function signUp() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const users = getRegisteredUsers();
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert("This username is already registered. Please log in.");
        return;
    }

    if (username && password && role) {
        saveRegisteredUser({ username, password, role });
        localStorage.setItem("loggedInUser", JSON.stringify({ username, role }));
        alert("Signed up successfully!");
        redirectToDashboard(role);
    } else {
        alert("Please fill all fields.");
    }
}

function signIn() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const users = getRegisteredUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        alert("User not found or incorrect password. Please sign up if you are a new user.");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify({ username: user.username, role: user.role }));
    alert("Logged in successfully!");
    redirectToDashboard(user.role);
}

function signOut() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", () => {
    loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        document.getElementById("welcome-message").innerText = `Welcome, ${loggedInUser.username}`;
        document.getElementById("signup-link").style.display = "none";
        document.getElementById("signout-btn").style.display = "inline";

        if (loggedInUser.role === "recruiter") {
            document.getElementById("add-job-link").style.display = "inline";
        }
    }
});

// Function to redirect users to the correct dashboard after login/signup
function redirectToDashboard(role) {
    if (role === "recruiter") {
        window.location.href = "add-job.html"; // Redirect to job creation page for recruiters
    } else if (role === "user") {
        window.location.href = "index.html"; // Redirect to job listing page for users
    }
}
