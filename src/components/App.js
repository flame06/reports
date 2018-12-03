import React, { Component } from 'react';
import RouteMap from '@/components/router/route_map'
import RHeader from '@/components/layout/r_header'
import RFooter from '@/components/layout/r_footer'

export default class App extends Component {
  constructor (props) {
    super(props)
    console.log('APP')
    console.log(this)
  }
  render() {
    return (
      <div style={{minHeight: '100%'}}>
        <div   style={{position: 'fixed', top: 0,left: 0, width: '100%',backgroundColor: '#e6cde6', padding: '15px',zIndex: 1000}}>
          <RHeader />

        </div>
        <div style={{margin: '60px 0'}}>
          <RouteMap />
        </div>
        <div  style={{position: 'fixed', bottom: 0,left: 0, width: '100%',backgroundColor: '#E6CDE6',zIndex: 1000}}>
          <RFooter />
        </div>
      </div>
    );
  }
}
