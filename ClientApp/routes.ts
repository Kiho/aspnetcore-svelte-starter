import roadtrip from 'roadtrip';
import IndexHandler from './index.handler';
import { basePath } from './config';
import Home from './components/home/home.html';
import Counter from './components/counter/counter.html';
import FetchData from './components/fetchdata/fetchdata.html';

export default class Routes {
    router;

    indexHandler;
    counterHandler;
    fetchdataHandler;

    constructor(target: Element) {
        this.router = roadtrip;
        this.init(target);
    }

    init(target) {
        this.indexHandler = new IndexHandler(Home, target);
        this.counterHandler = new IndexHandler(Counter, target);
        this.fetchdataHandler = new IndexHandler(FetchData, target);

        this.router
            .add(`${basePath}/`, this.indexHandler.route)
            .add(`${basePath}/counter`, this.counterHandler.route)
            .add(`${basePath}/fetchdata`, this.fetchdataHandler.route)
            .start({
                fallback: `${basePath}/`
            });
    }
}