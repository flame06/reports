/**
 * 路由页面
 */
import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
//import App from '@/components/App'
import NewsContainer from '@/components/news_container'
import NewsDetail from '@/components/news_detail'
import UserCenter from '@/components/user_center'

export default class RouteMap extends Component {
  render() {
    return (
      <Router>
        <div style={{marginTop: 70, minHeight: '100%', bgColor: 'red'}}>
          <Route exact path="/" component={NewsContainer} />
          <Route path="/report1" component={NewsDetail}/>
          <Route path="/report2" component={UserCenter}/>
        </div>
      </Router>
    )
  }
}