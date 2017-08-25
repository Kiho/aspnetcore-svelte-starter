import roadtrip from 'roadtrip';
import IndexHandler from './index.handler';

import Home from './components/home/home.html';
import Counter from './components/counter/counter.html';
import FetchData from './components/fetchdata/fetchdata.html';

export default class Routes {
  router;

  index_handler;
  counter_handler;
  fetchdata_handler;

  constructor(target: Element) {
    this.router = roadtrip;
    this.init(target);
  }

  init(target) {
    this.index_handler = new IndexHandler(Home, target);
    this.counter_handler = new IndexHandler(Counter, target);
    this.fetchdata_handler = new IndexHandler(FetchData, target);

    this.router
      .add('/', this.index_handler.route)
      .add('/counter', this.counter_handler.route)
      .add('/fetchdata', this.fetchdata_handler.route)
    //   .add('/users/:id', this.user_details_handler.route)
      .start({
        fallback: '/'
      });
  }
}