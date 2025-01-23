import {
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    sortingEl
} from '../common.js';

const clickHandler = event => {
    const clickedButtonEl = event.target.closest('.sorting__button');

    if (!clickedButtonEl) {
        console.log('not a button');
        return;
    }; // stop the function if the thing that was clicked was the area around the button
    // and not the button itself
    
    const recent =  clickedButtonEl.className.includes('--recent') ? true : false;
    
    if (recent) {
        console.log('recent');
    } else {
        console.log('relevant');
    }
};
sortingEl.addEventListener('click', clickHandler);