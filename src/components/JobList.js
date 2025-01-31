import {
    jobListSearchEl,
    jobDetailsContentEl,
    BASE_API_URL,
    getData,
    state,
    jobListBookmarksEl,
    RESULTS_PER_PAGE
} from '../common.js';
import renderError from './Error.js';
import renderJobDetails from './JobDetails.js';
import renderSpinner from './Spinner.js';

const renderJobList = (whichJobList = 'search') => {
    const jobListEl = whichJobList === 'search' ? jobListSearchEl : jobListBookmarksEl;

    // remove previous job items
    jobListEl.innerHTML = '';

    let jobItems;
    if (whichJobList === 'search') {
        jobItems = state.searchJobItems.slice((RESULTS_PER_PAGE * state.currentPage) - RESULTS_PER_PAGE, state.currentPage * RESULTS_PER_PAGE);
    } else if (whichJobList === 'bookmarks') {
        jobItems = state.bookmarkJobItems;
    } else {
        throw new Error('Invalid job list type');
    }

    jobItems.forEach(jobItem => {
        const newJobItemHTML = 
        `
        <li class="job-item ${state.activeJobItem.id === +jobItem.id ? 'job-item--active' : ''}">
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
                    <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === jobItem.id) &&'job-item__bookmark-icon--bookmarked'}"></i>
                    <time class="job-item__time">${jobItem.daysAgo}d</time>
                </div>
            </a>
        </li>
        `;
        jobListEl.insertAdjacentHTML('beforeend', newJobItemHTML);
    });
};

const clickHandler = async event => {
    event.preventDefault(); // prevent reload on event

    const jobItemEl = event.target.closest('.job-item'); // find the clicked job item and highlight it, remove previous highlight if any
    document.querySelectorAll('.job-item--active').forEach(activeJobItems => activeJobItems.classList.remove('job-item--active'));

    jobDetailsContentEl.innerHTML = '';
    renderSpinner('jobDetails');

    const id = jobItemEl.children[0].getAttribute('href'); // update link
    
    const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];
    console.log(allJobItems);
    state.activeJobItem = allJobItems.find(jobItem => jobItem.id === +id);

    renderJobList();

    history.pushState(null, '', `/#${id}`);

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
jobListBookmarksEl.addEventListener('click', clickHandler);


export default renderJobList;