import {
    jobListSearchEl,
    jobDetailsContentEl,
    BASE_API_URL,
    getData,
    state,
    RESULTS_PER_PAGE
} from '../common.js';
import renderError from './Error.js';
import renderJobDetails from './JobDetails.js';
import renderSpinner from './Spinner.js';

const renderJobList = () => {
    // remove previous job items
    jobListSearchEl.innerHTML = '';

    state.searchJobItems.slice((RESULTS_PER_PAGE * state.currentPage) - RESULTS_PER_PAGE, state.currentPage * RESULTS_PER_PAGE).forEach(jobItem => {
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
};

const clickHandler = async event => {
    event.preventDefault(); // prevent reload on event

    const jobItemEl = event.target.closest('.job-item'); // find the clicked job item and highlight it, remove previous highlight if any
    document.querySelector('.job-item--active')?.classList.remove('job-item--active');
    jobItemEl.classList.add('job-item--active');

    jobDetailsContentEl.innerHTML = '';
    renderSpinner('jobDetails');

    const id = jobItemEl.children[0].getAttribute('href'); // update link
    try { 
        const data = await getData(`${BASE_API_URL}/jobs/${id}`);

        const { jobItem } = data;
        renderSpinner('jobDetails');
        renderJobDetails(jobItem);

    } catch (error) {
        renderSpinner('jobDetails');
        renderError(error.message);
    }
}
jobListSearchEl.addEventListener('click', clickHandler);

export default renderJobList;