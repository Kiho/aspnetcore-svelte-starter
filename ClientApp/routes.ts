import roadtrip from 'roadtrip';
import IndexHandler from './index.handler';

import Home from './components/home/home.html';
import Counter from './components/counter/counter.html';
// import UserDetailsHandler from './pages/user-details/user-details.handler';

export default class Routes {
  router;

  index_handler;
  counter_handler;
//   user_details_handler;

  constructor() {
    this.router = roadtrip;
    this.init();
  }

  init() {
    this.index_handler = new IndexHandler(Home);
    this.counter_handler = new IndexHandler(Counter);
    // this.user_details_handler = new UserDetailsHandler();

    this.router
      .add('/', this.index_handler.route)
      .add('/counter', this.counter_handler.route)
    //   .add('/users/:id', this.user_details_handler.route)
      .start({
        fallback: '/'
      });
  }
}