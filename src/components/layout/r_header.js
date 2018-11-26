/**
 * 公用头部
 */
import React, { Component } from 'react';
import { Icon, Button } from 'antd'
export default class RHeader  extends Component {
  back = () => {
    window.history.go(-1)
  }
  componentWillMount () {
    console.log(this.props)
  }
 render() {
  return (
    <div>
      <Icon type="left" style={{ fontSize: 18, color: '#08c', padding: 5, cursor: 'pointer'}} onClick={this.back} />
    </div>
  )
 }
}
