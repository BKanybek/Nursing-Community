document.addEventListener("DOMContentLoaded", function () {
    if (document.body.classList.contains("jobs-page")) {
        loadJobs();
    } else if (document.body.classList.contains("job-detail-page")) {
        loadJobDetails();
    }
});

// Загружаем вакансии из JSON и отображаем их
function loadJobs() {
    fetch("js/jobs.json")
        .then(response => response.json())
        .then(jobs => {
            let jobsContainer = document.getElementById("jobs-container");
            jobsContainer.innerHTML = jobs.map(job => createJobCard(job)).join("");

            // Добавляем обработчик клика на каждую карточку
            document.querySelectorAll(".view-job").forEach(button => {
                button.addEventListener("click", function () {
                    let jobId = this.getAttribute("data-id");
                    localStorage.setItem("selectedJobId", jobId);
                    window.location.href = "job-detail.html";
                });
            });
        })
        .catch(error => console.error("Error loading jobs:", error));
}

// Функция для создания HTML-карточки вакансии
function createJobCard(job) {
    return `
        <div class="col-lg-4 col-md-6 col-12 mb-4">
            <div class="custom-block bg-white shadow-lg">
                <div class="d-flex justify-content-center align-items-start">
                    <img src="${job.image}" class="img-fluid job-image" alt="${job.title}">
                </div>
                <div class="d-flex flex-column h-100 p-4">
                    <h4 class="mb-3">${job.title}</h4>
                    <p class="mb-2"><strong>Location:</strong> ${job.location}</p>
                    <p class="mb-2"><strong>Salary:</strong> ${job.salary}</p>
                    <p class="mb-3">${job.description}</p>
                    <button class="btn custom-btn mt-auto view-job" data-id="${job.id}">View Details</button>
                </div>
            </div>
        </div>
    `;
}

// Загружаем детали вакансии в `job-detail.html`
function loadJobDetails() {
    fetch("js/jobs.json")
        .then(response => response.json())
        .then(jobs => {
            let jobId = localStorage.getItem("selectedJobId");
            let job = jobs.find(job => job.id == jobId);

            if (job) {
                document.getElementById("job-title").textContent = job.title;
                document.getElementById("job-location").textContent = job.location;
                document.getElementById("job-salary").textContent = job.salary;
                document.getElementById("job-type").textContent = job.jobType;
                document.getElementById("job-description").textContent = job.description;

                let requirementsList = document.getElementById("job-requirements");
                job.requirements.split(";").forEach(req => {
                    let li = document.createElement("li");
                    li.textContent = req.trim();
                    requirementsList.appendChild(li);
                });
            } else {
                document.getElementById("job-title").textContent = "Job not found";
            }
        })
        .catch(error => console.error("Error loading job details:", error));
}



document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("partners-container")) {
        loadPartners();
    }
});

// Функция загрузки партнеров
function loadPartners() {
    fetch("js/partners.json")
        .then(response => response.json())
        .then(partners => {
            let partnersContainer = document.getElementById("partners-container");
            partnersContainer.innerHTML = partners.map(partner => createPartnerCard(partner)).join("");
        })
        .catch(error => console.error("Error loading partners:", error));
}

// Функция создания HTML-карточки партнера
function createPartnerCard(partner) {
    return `
        <div class="col-lg-4 col-md-6 col-12 mb-4">
            <div class="partner-card shadow-lg p-4 text-center">
                <img src="${partner.logo}" class="partner-logo img-fluid mb-3" alt="${partner.name}">
                <h4>${partner.name}</h4>
                <p>${partner.description}</p>
                <a href="${partner.website}" target="_blank" class="btn custom-btn">Visit Website</a>
            </div>
        </div>
    `;
}

