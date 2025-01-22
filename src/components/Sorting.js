import {
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    sortingEl
} from '../common.js';

const clickHandler = event => {
    event.preventDefault();
};
sortingEl.addEventListener('click', clickHandler);