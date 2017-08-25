/*
 * This is the entrypoint of all the JavaScript files.
 */

import Svelte from 'svelte';
import App from './components/app/app.html';

const app: Svelte = new App({
    target: document.querySelector('#app-root'),
});

// // import 'bootstrap';
// import Routes from './routes';

// document.addEventListener('DOMContentLoaded', main);

// function main () {
//     (window as any).Routes = new Routes();
// }