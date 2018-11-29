import React, { Component } from 'react';
import moment from 'moment'
import df from 'dateformat'
import PubSub from 'pubsub-js'
import {Button, Calendar,DatePicker, Modal, Alert } from 'antd'
import axios from 'axios'
import Highcharts from 'highcharts';
//import SwineTable from '@/components/pages/swineTable';
import  '@/components/css/style.css'
//import HighchartsDrilldown from 'highcharts/modules/drilldown';
//import Highcharts3D from 'highcharts/highcharts-3d';
alert('newsDeatails')
const SwineTable = import('@/components/pages/swineTable')
export default class NewsDetail extends Component {
 constructor (props) {
  super(props)
  alert('live  constructor')
  this.state = {
   orgCode: '161322001',
   farmOrg: '434701-0-0',
   showModal: false,
   locationName: '',
   date: '',
   tableData: [],
   columns: [
    {
     title: '项目',
     dataIndex: 'FARM_ORG',
     key: 'FARM_ORG'
    },
    {
     title: '采购',
     dataIndex: 'BF',
     key: 'BF'
    },
    {
     title: '转入',
     dataIndex: 'TRN_IN',
     key: 'TRN_IN'
    },
    {
     title: '转出',
     dataIndex: 'TRN_OUT',
     key: 'TRN_OUT'
    },
    {
     title: '销售',
     dataIndex: 'SALE',
     key: 'SALE'
    },
    {
     title: '死亡',
     dataIndex: 'DEAD',
     key: 'DEAD'
    },
    {
     title: '淘汰',
     dataIndex: 'CULL',
     key: 'CULL'
    },
    {
     title: '期末',
     dataIndex: 'CF',
     key: 'CF'
    }
   ],
   dataOjb: {},
   dataOjb01: [],
   dataOjb02: [],
   container0Config: {}
  }
 }
 changeDate = (value, d) => {
  this.setState({date: d})
  this.getReport01(d)
  this.getReport02(d)
  this.getReport03(d)
 }
 //  获取表格数据，并构建表格
 getReport01 = (date) => {
  const _self = this
  const {orgCode, farmOrg} = _self.state
  const dataOjb = {
   "locationID": [],
   "locationName": [],
   "legend": ['期初', '采购', '转入', '转出', '销售', '死亡', '淘汰', '期末'],
   "legendData1": [],
   "legendData2": [],
   "legendData3": [],
   "legendData4": [],
   "legendData5": [],
   "legendData6": [],
   "legendData7": [],
   "legendData8": [],
   "descLocationName": []
  }
  axios({
   method: 'post',
   url: `/report/${orgCode}/${farmOrg}/get_report`,
   data: {
    command: 'getCommand1',
    dateToday: date,
    endDate: date,
    gdCode: ['1003'],
    gdType: ['D000201'],
    startDate: date,
    startsWith: 1
   }
  })
    .then(function (res) {
     const data = res.data[0]
     data.datas.map((result, i) => {
      dataOjb.locationID.push(result.LOCATION_ID);
      dataOjb.locationName.push(result.LOCATION_NAME_LOC);
      dataOjb.legendData1.push((typeof(result.BF)=="undefined")?0:result.BF);
      dataOjb.legendData2.push((typeof(result.PURCHASE)=="undefined")?0:result.PURCHASE);
      dataOjb.legendData3.push((typeof(result.TRN_IN)=="undefined")?0:result.TRN_IN);
      dataOjb.legendData4.push((typeof(result.TRN_OUT)=="undefined")?0:result.TRN_OUT);
      dataOjb.legendData5.push((typeof(result.SALE)=="undefined")?0:result.SALE);
      dataOjb.legendData6.push((typeof(result.DEAD)=="undefined")?0:result.DEAD);
      dataOjb.legendData7.push((typeof(result.CULL)=="undefined")?0:result.CULL);
      dataOjb.legendData8.push((typeof(result.CF)=="undefined")?0:result.CF);
      // 根据当前语言选择中文或者英文
      dataOjb.descLocationName.push((typeof(result.LOCATION_NAME_LOC)=="undefined")?0:result.LOCATION_NAME_LOC);
     })
     _self.setState({dataOjb})
     _self.getHighcharts01()
    })
 }
 getReport02 = (date) => {
  const _self = this
  const {orgCode, farmOrg} = _self.state
  const dataOjb01 = []
  axios({
   method: 'post',
   url: `/report/${orgCode}/${farmOrg}/get_report`,
   data: {
    command: 'getCommand1',
    dateToday: date,
    endDate: date,
    gdCode: ['1001'],
    gdType: ['D000201'],
    startDate: date,
    datasFlag: '2'
   }
  })
    .then(function (res) {
     const data = res.data
     data.map((result, i) => {
      dataOjb01[i] = []
      dataOjb01[i][1] = result.VAL_1;
      dataOjb01[i][0] = result.NAME_VAL_1;
     })
     _self.setState({dataOjb01})
     _self.getHighcharts02(dataOjb01)
    })
 }
 getReport03 = (date) => {
  const _self = this
  const {orgCode, farmOrg} = _self.state
  const dataOjb02 = []
  axios({
   method: 'post',
   url: `/report/${orgCode}/${farmOrg}/get_report`,
   data: {
    command: 'getCommand1',
    dateToday: date,
    endDate: date,
    gdCode: ['1002'],
    gdType: ['D000201'],
    startDate: date,
    datasFlag: '2'
   }
  })
    .then(function (res) {
     const data = res.data
     data.map((result, i) => {
      dataOjb02[0] = result.PIG_QTY_BW24L
      dataOjb02[1] = result.PIG_QTY_BW24
      dataOjb02[2] = result.PIG_QTY_BW25
      dataOjb02[3] = result.PIG_QTY_BW26
      dataOjb02[4] = result.PIG_QTY_BW27
      dataOjb02[5] = result.PIG_QTY_BW28
      dataOjb02[6] = result.PIG_QTY_BW29M
     })
     _self.setState({dataOjb02})
     _self.getHighcharts03(dataOjb02)
    })
 }
 //  构建表格
 getHighcharts01 = () => {
  const _self = this
  const {dataOjb} = this.state
  new Highcharts.Chart('container0', {
   chart: {
    type: 'column'
   },
   credits:{
    enabled: false
   },
   title: {
    text: '各舍存栏信息'
   },
   xAxis: {
    categories: dataOjb.descLocationName
   },
   yAxis: {
    min: 0,
    title: {
     text: ''
    },
    stackLabels: {  // 堆叠数据标签
     enabled: true,
     style: {
      fontWeight: 'bold',
      color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
     }
    }
   },
   legend: {
    align: 'center',
    verticalAlign: 'top',
    y: 20,
    floating: true,
    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
    borderColor: '#CCC',
    borderWidth: 1,
    shadow: false
   },
   tooltip: {
    formatter: function () {
     return '<b>' + this.x + '</b><br/>' +
       this.series.name + ': ' + this.y + '<br/>' +
       '总量: ' + this.point.stackTotal;
    }
   },
   plotOptions: {
    column: {
     stacking: 'normal',
     dataLabels: {
      enabled: true,
      color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
      style: {
       // 如果不需要数据标签阴影，可以将 textOutline 设置为 'none'
       textOutline: '1px 1px black'
      }
     },
     events: {
      click: function (e) {
       const name = e.point.category
       const i = dataOjb.locationName.indexOf(name)
       const locationName = dataOjb.locationID[i]
       _self.setState({showModal: true})
       _self.getSwines(locationName)
      }
     }
    }
   },
   series: [
    {
    name: '期初',
    data: dataOjb.legendData1
   }, {
    name: '采购',
    data: dataOjb.legendData2
   }, {
    name: '转入',
    data: dataOjb.legendData3
   }, {
    name: '转出',
    data: dataOjb.legendData4
   }, {
    name: '销售',
    data: dataOjb.legendData5
   }, {
    name: '死亡',
    data: dataOjb.legendData6
   }, {
    name: '淘汰',
    data: dataOjb.legendData7
   }, {
    name: '期末',
    data: dataOjb.legendData8
   }
   ]
  })
 }
 getHighcharts02 = (ojbData) => {
  console.log(ojbData)
  new Highcharts.Chart('divA1Graph',{
   chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false
   },
   title: {
    text: '存栏结构',
    y: 30
   },
   credits: {
    enabled: false
   },
   tooltip: {
    pointFormat: '{point.y}头</b>'
   },
   plotOptions: {
    pie: {
     allowPointSelect: true,
     cursor: 'pointer',
     size:180,
     point:{
      events:{
       mouseOver: function(e){
        //console.log(e);
       }
      }
     },
     dataLabels: {
      enabled: true,
      distance: 10,
      format: '{point.name}:<br><b>{point.y}头</b>',
     },
     showInLegend: true
    }
   },
   series: [{
    type: 'pie',
    name: '',
    data: ojbData
   }]
  })
 }
 getHighcharts03 = (ojbData) => {
  new Highcharts.Chart('divB1Graph',{
   chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
   },
   title: {
    text: '分周龄可售肥猪分布',
    y: 30
   },
   credits: {
    enabled: false
   },
   exporting: {
    allowHTML: true
   },
   tooltip: {
    pointFormat: '{point.y}<b>头</b>'
    //pointFormat: '{point.y}: <b>{point.percentage}%</b>'
   },
   plotOptions: {
    pie: {
     allowPointSelect: true,
     cursor: 'pointer',
     size:180,
     point:{
      events:{
       mouseOver: function(e){
        console.log(e);
       }
      }
     },
     dataLabels: {
      enabled: true,
      distance: 10,
      format: '{point.name}:<br><b>{point.y}头</b>',
     },
     showInLegend: true
    }
   },
   series: [{
    type: 'pie',
    name: '',
    data: [
     ['<24周', ojbData[0]],
     [' 24周', ojbData[1]],
     [' 25周', ojbData[2]],
     [' 26周', ojbData[3]],
     [' 27周', ojbData[4]],
     [' 28周', ojbData[5]],
     ['>29周', ojbData[6]]
    ]
   }]
  })
 }

 getSwines = (locationName) => {
  const _self = this
  const {farmOrg, orgCode, date} = this.state
  axios({
   method: 'post',
   url: `/report/${orgCode}/${farmOrg}/get_report`,
   data: {
    command: 'getCommand2',
    dateToday: date,
    endDate: date,
    gdCode: ['1003'],
    gdType: ['D000201'],
    startDate: date,
    paraClickValue1: locationName,
    datasFlag: 2
   }
  })
    .then((res) => {
     const tableData = res.data
     tableData.map((item, index) => {
      tableData[index].key = index
     })
     _self.setState({tableData})
    })
 }
 doSearch = () => {
  const {date} = this.state
  this.getReport01(date)
  this.getReport02(date)
  this.getReport03(date)
 }
 closeModal = () => {
  this.setState({showModal: false})
 }
 componentWillMount () {
  let date = df(new Date(), 'yyyy-mm-dd')
  this.setState({date})
 }
 componentDidMount  () {
  this.doSearch()
 }
 render() {
  const {date, showModal, tableData,columns, locationName } = this.state
  alert('xxx' + date)
  return (
    <div>
     <div style={{textAlign: 'center'}}>
      <DatePicker onChange={this.changeDate} defaultValue={moment(date, 'yyyy-mm-dd')} />
      <Button onClick={this.doSearch}>查询</Button>
     </div>
     {/*各舍存栏信息*/}
     <div id="container0"></div>
     {/*存栏结构*/}
     <div id="divA1Graph"></div>
     {/*分周玲可售肥猪分布*/}
     <div id="divB1Graph"></div>
     <Modal  visible={showModal} footer={null} width='100%' style={{top: 0,bottom: 0,right: 0,left: 0, minHeight: '100%', backgroundColor:'#fff'}} onCancel={this.closeModal}>
      <SwineTable x={600} marginTop={30} date={date} tableData={tableData} columns={columns}></SwineTable>
     </Modal>
    </div>
  )
 }
}