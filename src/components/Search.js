import {
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_API_URL,
    getData,
    state,
    sortingBtnRecentEl,
    sortingBtnRelevantEl
} from '../common.js';
import renderError from './Error.js';
import renderJobList from './JobList.js';
import renderSpinner from './Spinner.js';
import renderPaginationButtons from './Pagination.js';

const submitHandler = async event => {
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
    try {
        const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

        // extract useful data and display everything accordingly
        const { jobItems } = data;

        state.searchJobItems = jobItems;
        state.currentPage = 1;

        renderSpinner('search');
        numberEl.textContent = jobItems.length;
        renderPaginationButtons();
        renderJobList();
    } catch (error) {
        renderSpinner('search');
        renderError(error.message);
    }
    // reset sorting buttons
    sortingBtnRelevantEl.click();

};

searchFormEl.addEventListener('submit', submitHandler);
