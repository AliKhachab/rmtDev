import {
    spinnerSearchEl,
    spinnerJobDetailsEl
} from '../common.js';

const renderSpinner = spinner => {
    const spinnerEl = spinner === 'search' ? spinnerSearchEl : spinnerJobDetailsEl;
    spinnerEl.classList.toggle('spinner--visible');
}
export default renderSpinner;