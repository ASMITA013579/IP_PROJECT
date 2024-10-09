// Mock job data
const mockJobs = [
    { title: "Software Engineer", company: "Tech Innovations", location: "Remote", type: "Full-Time" },
    { title: "Product Manager", company: "Creative Solutions", location: "On-site", type: "Part-Time" },
    { title: "Data Analyst", company: "Data Insights", location: "Remote", type: "Full-Time" },
    { title: "UI/UX Designer", company: "Design Co.", location: "On-site", type: "Freelance" },
    { title: "Web Developer", company: "WebWorks", location: "Remote", type: "Internship" },
];

// Function to get jobs from local storage (to keep jobs persistent)
function getJobs() {
    return JSON.parse(localStorage.getItem("jobs")) || mockJobs; // Use mock jobs if local storage is empty
}

// Function to save jobs to local storage (for recruiters)
function saveJobs(jobs) {
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

// Function to render jobs on the user page
function renderJobs() {
    const jobListings = document.getElementById("job-listings");
    const jobs = getJobs();
    jobListings.innerHTML = ''; // Clear existing job listings

    if (jobs.length === 0) {
        jobListings.innerHTML = '<p>No job listings available.</p>';
        return;
    }

    jobs.forEach(job => {
        const jobCard = document.createElement("div");
        jobCard.className = "job";
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Type:</strong> ${job.type}</p>
            <button class="apply-btn" onclick="applyForJob('${job.title}')">Apply Now</button>
        `;
        jobListings.appendChild(jobCard);
    });
}

// Function to handle job application
function applyForJob(jobTitle) {
    alert(`You have applied for the job: ${jobTitle}`);
}

// Recruiter job addition
document.getElementById("add-job-btn")?.addEventListener("click", () => {
    const jobTitle = document.getElementById("job-title").value;
    const companyName = document.getElementById("company-name").value;
    const jobLocation = document.getElementById("job-location").value;
    const jobType = document.getElementById("job-type").value;

    if (jobTitle && companyName) {
        const newJob = { title: jobTitle, company: companyName, location: jobLocation, type: jobType };
        const jobs = getJobs();
        jobs.push(newJob);
        saveJobs(jobs);
        alert("Job added successfully!");
        window.location.href = "index.html"; // Redirect to job listings for users
    } else {
        alert("Please fill all fields.");
    }
});

// Load jobs for users
window.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.role === "user") {
        renderJobs(); // Render jobs for users
    } else if (loggedInUser && loggedInUser.role === "recruiter") {
        // Recruiter is logged in; optionally, you can redirect to add-job.html
        window.location.href = "add-job.html"; // Redirect to job posting page
    }
});
