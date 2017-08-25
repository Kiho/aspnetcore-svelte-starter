/*
 * This is the entrypoint of all the JavaScript files.
 */

// import 'bootstrap';
import Routes from './routes';

document.addEventListener('DOMContentLoaded', main);

function main () {
    (window as any).Routes = new Routes();
}