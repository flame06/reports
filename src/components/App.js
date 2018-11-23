import React, { Component } from 'react';
import RouteMap from '@/components/router/route_map'
import RHeader from '@/components/layout/r_header'
import RFooter from '@/components/layout/r_footer'

class App extends Component {
  render() {
    return (
      <div>
        <RHeader />
        <RouteMap />
        {/*this.props.children*/}
        <RFooter />
      </div>
    );
  }
}
export default App;
