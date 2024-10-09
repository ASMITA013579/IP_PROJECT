let loggedInUser = null;

document.getElementById("signin-btn")?.addEventListener("click", signIn);
document.getElementById("signup-btn")?.addEventListener("click", signUp);
document.getElementById("signout-btn")?.addEventListener("click", signOut);

function signUp() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (username && password && role) {
        localStorage.setItem("loggedInUser", JSON.stringify({ username, role }));
        alert("Signed up successfully!");
        window.location.href = "index.html";
    } else {
        alert("Please fill all fields.");
    }
}

function signIn() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (username && password && role) {
        localStorage.setItem("loggedInUser", JSON.stringify({ username, role }));
        alert("Signed in successfully!");
        window.location.href = "index.html";
    } else {
        alert("Please fill all fields.");
    }
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
