import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Icon} from 'antd'
export default class  extends Component {
 render() {
  return (
    <div style={{borderBottom:'1px solid #ddd'}}>
      <Link to={this.props.link} style={{padding:'10px',display: 'block'}}>
        <Icon type="area-chart" style={{paddingRight: '6px'}} />
        {this.props.title}
      </Link>
    </div>
  )
 }
}