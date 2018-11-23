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
    <div style={{padding: '15px', height: 60, backgroundColor: '#fef', position: 'fixed', top: 0, left: 0,right: 0, bottom: 0}}>
      <Icon type="left" style={{ fontSize: 16, color: '#08c', padding: 5, cursor: 'pointer'}} onClick={this.back} />
      <Button type="primary"> 标准按钮</Button>
    </div>
  )
 }
}
