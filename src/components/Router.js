import {
    jobDetailsContentEl,
    BASE_API_URL,
    getData,
    state
} from '../common.js';
import renderJobDetails from './JobDetails.js';
import renderSpinner from './Spinner.js';
import renderError from './Error.js';

const loadHashChangeHandler = async () => {
    const id = window.location.hash.substring(1); // take the id from the link after the #

    if (id) { // if there is an id (i.e. if the link is just localhost://#, id = null or '', otherwise it has a number)
        jobDetailsContentEl.innerHTML = '';
        renderSpinner('jobDetails');

        try { // render job list try catch block copy-pasted, in essence same functionality as in JobList.js
            const data = await getData(`${BASE_API_URL}/jobs/${id}`);
    
            const { jobItem } = data;
            state.activeJobItem = jobItem;

            renderSpinner('jobDetails');
            renderJobDetails(jobItem);
    
        } catch (error) {
            renderSpinner('jobDetails');
            renderError(error.message);
        }
    }
};

window.addEventListener('DOMContentLoaded', loadHashChangeHandler); // event listener for when everything in the DOM
// is loaded, i.e. all HTML is completely loaded, all CSS is styled, etc.

window.addEventListener('hashchange', loadHashChangeHandler);
// event listener for when the hash in the URL changes, i.e. when the user clicks on a job item or hit's the back button
// or forward button on the top left of the browser