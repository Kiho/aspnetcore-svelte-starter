/*
 * This is the entrypoint of all the JavaScript files.
 */

import App from './components/app/app.svelte';
import * as config from './config';

config.init();

const app = new App({
    target: document.querySelector('#app-root'),
});
