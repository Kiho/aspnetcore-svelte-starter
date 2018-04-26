/*
 * This is the entrypoint of all the JavaScript files.
 */

import Svelte from 'svelte';
import App from './components/app/app.html';

declare var siteName;
declare var basePath;
basePath = siteName + '/';

const app: Svelte = new App({
    target: document.querySelector('#app-root'),
});
