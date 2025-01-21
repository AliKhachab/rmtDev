import {
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_API_URL
} from '../common.js';
import renderError from './Error.js';
import renderSpinner from './Spinner.js';

const submitHandler = event => {
    event.preventDefault(); // prevent reload on submit

    const searchText = searchInputEl.value;

    // validation
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError('Numbers are not allowed in the search field.');
        return;
    }

    searchInputEl.blur(); // nunfocus search bar, remove previous job items, and spinner appears
    jobListSearchEl.innerHTML = '';
    renderSpinner('search');

    fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
        .then(response => {
            if (!response.ok) {
                console.log("Error in grabbing jobs info");
                return;
            }
            return response.json();
        })
        .then(data => {
            // extract useful data and display everything accordingly
            const { jobItems } = data;
            renderSpinner('search');
            numberEl.textContent = jobItems.length;
            jobItems.slice(0,7).forEach(jobItem => {
                const newJobItemHTML = 
                `
                <li class="job-item">
                    <a class="job-item__link" href="${jobItem.id}">
                        <div class="job-item__badge">${jobItem.badgeLetters}</div>
                        <div class="job-item__middle">
                            <h3 class="third-heading">${jobItem.title}</h3>
                            <p class="job-item__company">${jobItem.company}</p>
                            <div class="job-item__extras">
                                <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                                <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                                <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                            </div>
                        </div>
                        <div class="job-item__right">
                            <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                            <time class="job-item__time">${jobItem.daysAgo}d</time>
                        </div>
                    </a>
                </li>
                `;
                jobListSearchEl.insertAdjacentHTML('beforeend', newJobItemHTML);
            });
            

        })
        .catch(error => {
            console.log(error);
        }); // sample jobs fetch call
};

searchFormEl.addEventListener('submit', submitHandler);
