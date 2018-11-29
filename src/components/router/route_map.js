/**
 * 路由页面
 */
import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {asyncComponent} from '@/components/layout/asyncComponent'
//import Menus from '@/components/router/menus'
//import DayIndex from '@/components/pages/dayIndex'
//import LivestockIndex from '@/components/pages/livestockIndex'
const Menus = asyncComponent(() => import('@/components/router/menus'))
const DayIndex = asyncComponent(() => import('@/components/pages/dayIndex'))
const LivestockIndex = asyncComponent(() => import('@/components/pages/livestockIndex'))
const RealTimeStateIndex = asyncComponent(() => import('@/components/pages/realtimestateIndex'))
export default class RouteMap extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/menus" />)}/>
          <Route path="/menus" component={Menus}/>
          <Route path="/dayIndex" component={DayIndex}/>
          <Route path="/livestockIndex" component={LivestockIndex}/>
          <Route path="/realtimestateIndex" component={RealTimeStateIndex}/>
          <Route render={()=><h1 style={{marginTop: 30, textAlign: 'center'}}>页面不见了！</h1>}></Route>
        </Switch>
      </Router>
    )
  }
}