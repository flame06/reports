/**
 * 路由页面
 */
import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Menus from '@/components/router/menus'
import DayIndex from '@/components/pages/dayIndex'
import LivestockIndex from '@/components/pages/livestockIndex'

export default class RouteMap extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Menus} />
          <Route path="/dayIndex" component={DayIndex}/>
          <Route path="/livestockIndex" component={LivestockIndex}/>
        </div>
      </Router>
    )
  }
}