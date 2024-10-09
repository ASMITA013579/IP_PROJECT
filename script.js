// Sample job data
let jobs = [
    {
        title: "Frontend Developer",
        company: "Tech Corp",
        location: "Remote",
        type: "Full-Time"
    },
    {
        title: "Data Analyst",
        company: "Data Solutions",
        location: "On-site",
        type: "Part-Time"
    },
];

function renderJobs(jobList) {
    const jobListings = document.getElementById("job-listings");
    jobListings.innerHTML = '';
    jobList.forEach(job => {
        const jobCard = document.createElement("div");
        jobCard.className = "job";
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>Company: ${job.company}</p>
            <p>Location: ${job.location}</p>
            <p>Type: ${job.type}</p>
            <button class="apply-btn">Apply</button>
        `;
        jobListings.appendChild(jobCard);
    });
}

// Filter jobs based on type and location
document.getElementById("job-type").addEventListener("change", filterJobs);
document.getElementById("location").addEventListener("change", filterJobs);

function filterJobs() {
    const type = document.getElementById("job-type").value;
    const location = document.getElementById("location").value;

    const filteredJobs = jobs.filter(job => {
        return (type === "all" || job.type === type) && (location === "all" || job.location === location);
    });

    renderJobs(filteredJobs);
}

document.getElementById("search-btn")?.addEventListener("click", () => {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const filteredJobs = jobs.filter(job => job.title.toLowerCase().includes(searchQuery));
    renderJobs(filteredJobs);
});

window.addEventListener("DOMContentLoaded", () => {
    renderJobs(jobs);
});

// Recruiters adding jobs
document.getElementById("add-job-btn")?.addEventListener("click", () => {
    const jobTitle = document.getElementById("job-title").value;
    const companyName = document.getElementById("company-name").value;
    const jobLocation = document.getElementById("job-location").value;
    const jobType = document.getElementById("job-type").value;

    if (jobTitle && companyName) {
        jobs.push({ title: jobTitle, company: companyName, location: jobLocation, type: jobType });
        alert("Job added successfully!");
        window.location.href = "index.html";
    } else {
        alert("Please fill all fields.");
    }
});
