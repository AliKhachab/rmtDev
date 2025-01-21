import {
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_API_URL
} from '../common.js';
import renderError from './Error.js';
import renderJobList from './JobList.js';
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
            renderJobList(jobItems);
        })
        .catch(error => {
            console.log(error);
        }); // sample jobs fetch call
};

searchFormEl.addEventListener('submit', submitHandler);
