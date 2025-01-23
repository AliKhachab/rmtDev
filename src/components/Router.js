import {
    jobDetailsContentEl,
    BASE_API_URL,
    getData
} from '../common.js';
import renderJobDetails from './JobDetails.js';
import renderSpinner from './Spinner.js';

const loadHashChangeHandler = async () => {
    const id = window.location.hash.substring(1);

    if (id) {
        jobDetailsContentEl.innerHTML = '';
        renderSpinner('jobDetails');

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
};

window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler);