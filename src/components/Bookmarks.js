import {
    state,
    jobDetailsEl,
    bookmarksBtnEl,
    jobListBookmarksEl
} from '../common.js';
import renderJobList from './JobList.js';

const clickHandler = event => {
    if (!event.target.closest('.job-info__bookmark-icon')) return; // if the click is not on the bookmark icon, return
    if (state.bookmarkJobItems.some(bookmark => bookmark.id === state.activeJobItem.id)) { // if bookmark toggle is clicked and the job is not bookmarked 
        // add it to bookmarks, otherwise remove it
        state.bookmarkJobItems = state.bookmarkJobItems.filter(bookmark => bookmark.id !== state.activeJobItem.id);
    } else {
        state.bookmarkJobItems.push(state.activeJobItem);
    }
    localStorage.setItem('bookmarkJobItems', JSON.stringify(state.bookmarkJobItems));
    document.querySelector('.job-info__bookmark-icon').classList.toggle('job-info__bookmark-icon--bookmarked');
    renderJobList('bookmarks');
};


const mouseEnterHandler = () => {
    //show bookmarks when hovered over
    bookmarksBtnEl.classList.add('bookmarks-btn--active');
    jobListBookmarksEl.classList.add('job-list--visible');
};

const mouseLeaveHandler = () => {
    //hide bookmarks when mouse leaves
    bookmarksBtnEl.classList.remove('bookmarks-btn--active');
    jobListBookmarksEl.classList.remove('job-list--visible');
};

jobDetailsEl.addEventListener('click', clickHandler); // attach to the parent el and not the bookmarksBtnEl itself because bookmark button  
// doesn't exist until a job listing is clicked. instead, we need to check if bookmark is clicked and not the whole menu
bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);