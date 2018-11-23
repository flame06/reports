import React, { Component } from 'react';
import {Button} from 'antd'
import axios from 'axios'
export default class NewsDetail extends Component {
 getData = () => {
   axios({
     method: 'post',
     url: '/report/161322001/434701-0-0/get_report',
     data: {
       command: 'getCommand1',
       dateToday: '2018-11-07',
       endDate: '2018-11-07',
       gdCode: ['1003'],
       gdType: ['D000201'],
       startDate: '2018-11-07',
       startsWith: 1
     }
   })
   .then(function (res) {
     alert(1)
     console.log(res)
   })
 }
 render() {
  return (
    <div>
     <Button onClick={this.getData}>发送请求</Button>
    </div>
  )
 }
}