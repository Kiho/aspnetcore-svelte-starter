/*
 * This is the entrypoint of all the JavaScript files.
 */

import Svelte from 'svelte';
import App from './components/app/app.html';

declare var basePath;
if (basePath && basePath.length > 0) {
    basePath = basePath.substring(0, basePath.length - 1);
}
console.log('basePath: ', basePath);

const app: Svelte = new App({
    target: document.querySelector('#app-root'),
});
