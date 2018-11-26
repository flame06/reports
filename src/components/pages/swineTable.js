import React, { Component } from 'react';
import {Table} from 'antd'
import axios from 'axios'
import PubSub from 'pubsub-js'
export default class SwineTable extends Component {
  constructor (props) {
    super(props)
  }
  clickRow = (record) => {
    console.log(record.name)
  }
 render() {
   const {columns, tableData} = this.props
   return (
    <div style={{height: '100%',marginTop: 30}}>
      <Table columns={columns} bordered dataSource={tableData}
             scroll={{x: 600}}>
      </Table>
    </div>
  )
 }
}