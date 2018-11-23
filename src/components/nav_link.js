import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class  extends Component {
 render() {
  return (
    <div style={{border:'1px solid #ddd', margin: '10px'}}>
      <Link to={this.props.link}>{this.props.title}</Link>
    </div>
  )
 }
}