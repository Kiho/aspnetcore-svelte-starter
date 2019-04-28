/*
 * This is the entrypoint of all the JavaScript files.
 */

import Svelte from 'svelte';
import App from './components/app/app.html';
import * as config from './config';

config.init();

const app: Svelte = new App({
    target: document.querySelector('#app-root'),
});
