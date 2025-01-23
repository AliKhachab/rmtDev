import {
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    sortingEl,
    state
} from '../common.js';
import renderJobList from './JobList.js';

const clickHandler = event => {
    const clickedButtonEl = event.target.closest('.sorting__button');

    if (!clickedButtonEl) {
        console.log('not a button');
        return;
    }; // stop the function if the thing that was clicked was the area around the button
    // and not the button itself
    
    const recent =  clickedButtonEl.className.includes('--recent') ? true : false;

    if (recent) {
        sortingBtnRecentEl.classList.add('sorting__button--active'); // toggle recent button
        sortingBtnRelevantEl.classList.remove('sorting__button--active'); // disable relevant button
        state.searchJobItems.sort((a, b) => {
            return a.daysAgo - b.daysAgo;
        });
    } else {
        sortingBtnRecentEl.classList.remove('sorting__button--active'); // inverse of the above
        sortingBtnRelevantEl.classList.add('sorting__button--active');
        state.searchJobItems.sort((a, b) => {
            return b.relevanceScore - a.relevanceScore;
        });
    }

    renderJobList();
};
sortingEl.addEventListener('click', clickHandler);