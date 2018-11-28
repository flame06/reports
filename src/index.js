//import React from 'react';
//import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';
//
//ReactDOM.render(<App />, document.getElementById('root'));
//
//// If you want your app to work offline and load faster, you can change
//// unregister() to register() below. Note this comes with some pitfalls.
//// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

//import React from 'react'
//import ReactDOM from 'react-dom'
//import {Router, hashHistory, IndexRoute, Route} from 'react-router'
//import App from '@/components/App'
//import NewsContainer from '@/components/news_container'
//import NewsDetail from '@/components/news_detail'
//import UserCenter from '@/components/user_center'
//
//ReactDOM.render(
//  (
//    <Router history={hashHistory}>
//      <Route path='/' component={App}>
//        <IndexRoute component={NewsContainer}/>
//        <Route path='/detail/:uniquekey' component={NewsDetail}>123</Route>
//        <Route path='/usercenter' component={UserCenter}>456</Route>
//      </Route>
//    </Router>
//  ),
//  document.getElementById('root')
//)
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/App'

ReactDOM.render((
  <App />
), document.getElementById('root'));