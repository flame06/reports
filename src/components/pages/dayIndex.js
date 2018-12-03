import React, { Component } from 'react';
import moment from 'moment'
import df from 'dateformat'
import {Button, Spin,DatePicker, Tabs } from 'antd'
import axios from 'axios'
import Highcharts from 'highcharts';
import SwineTable from '@/components/pages/swineTable'

const webapi = 'http://localhost:9090'
const web = 'http://localhost:9190'

alert('dayindex')
export default class NewsDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      orgCode: '161322001',
      farmOrg: '434701-0-0',
      date: '',
      tab: '1',
      gdCode: ['10'],
      gdType: ['D000101'],
      tableData: [],
      columns: [
        {
          title: '配种$分娩',
          dataIndex: 'descLoc',
          key: 'descLoc'
        },
        {
          title: '当天',
          dataIndex: 'datas[0]["VAL_TODAY"]',
          key: 'datas[0]["VAL_TODAY"]'
        },
        {
          title: '本月累计',
          dataIndex: 'datas[0]["VAL_MONTH"]',
          key: 'datas[0]["VAL_MONTH"]'
        }
      ]
    }
  }
  changeDate = (value, d) => {
    console.log(1)
    this.setState({date: d})
    const {gdType, gdCode} = this.state
    this.getData (d, gdType, gdCode)
  }
  getData = (date, gdType, gdCode) => {
    const _self = this
    const {orgCode, farmOrg} = _self.state
    axios({
      method: 'post',
      url: web + `/report/${orgCode}/${farmOrg}/get_report`,
      data: {
        command: 'getCommand1',
        dateToday: date,
        endDate: date,
        gdCode: gdCode,
        gdType: gdType,
        startDate: date,
        startsWith: 1
      }
    })
    .then((res) => {
      let tableData = res.data
      if (tableData[0].gdCode === '3001' || tableData[0].gdCode === '3002') {
        tableData = res.data[0].datas
      }
      console.log(tableData)
      tableData.map((item,index) => {
        tableData[index].key = index
      })
      console.log(tableData)
      _self.setState({
        tableData
      })
    })
  }
  changeTab = (key) => {
    const {date, gdType} = this.state
    let columns = []
    if (key === '1') {
      this.setState({
        gdCode: ['10'],
        columns:[
        {
          title: '配种$分娩',
          dataIndex: 'descLoc',
          key: 'descLoc'
        },
        {
          title: '当天',
          dataIndex: 'datas[0]["VAL_TODAY"]',
          key: 'datas[0]["VAL_TODAY"]'
        },
        {
          title: '本月累计',
          dataIndex: 'datas[0]["VAL_MONTH"]',
          key: 'datas[0]["VAL_MONTH"]'
        }
      ]})
      this.getData(date, gdType, ['10'])
    } else if (key === '3') {
      this.setState({
        gdCode: ['3001'],
        columns:[
        {
          title: '销售明细',
          dataIndex: 'DETAIL_NAME_LOC',
          key: 'DETAIL_NAME_LOC'
        },
        {
          title: '项目',
          dataIndex: 'TYPE',
          key: 'TYPE',
          render: (text, row, index) => {
            if(row.VAL_TYPE_NAME_ENG === 'QTY') {
              return {children: '数量'}
            }
            if (row.VAL_TYPE_NAME_ENG === 'WGH') {
              return {children: '重量'}
            }
            if (row.VAL_TYPE_NAME_ENG === 'AMOUNT') {
              return {children: '金额'}
            }
          }
        },
        {
          title: '当天',
          dataIndex: 'TODAY_VAL',
          key: 'TODAY_VAL'
        },
        {
          title: '本月累计',
          dataIndex: 'MM_ACC_VAL',
          key: 'MM_ACC_VAL'
        },
        {
          title: '上月同期',
          dataIndex: 'MM_PREV_TODAY_VAL',
          key: 'MM_PREV_TODAY_VAL'
        },
        {
          title: '本年累计',
          dataIndex: 'YEAR_ACC_VAL',
          key: 'YEAR_ACC_VAL'
        }
      ]})
      this.getData(date, gdType, ['3001'])
    } else if (key === '4') {
      this.setState({
        gdCode: ['3002'],
        columns:[
          {
            title: '采购明细',
            dataIndex: 'DETAIL_NAME_LOC',
            key: 'DETAIL_NAME_LOC'
          },
          {
            title: '项目',
            dataIndex: 'TYPE',
            key: 'TYPE',
            render: (text, row, index) => {
              if(row.VAL_TYPE_NAME_ENG === 'QTY') {
                return {children: '数量'}
              }
              if (row.VAL_TYPE_NAME_ENG === 'WGH') {
                return {children: '重量'}
              }
              if (row.VAL_TYPE_NAME_ENG === 'AMOUNT') {
                return {children: '金额'}
              }
            }
          },
          {
            title: '当天',
            dataIndex: 'TODAY_VAL',
            key: 'TODAY_VAL'
          },
          {
            title: '本月累计',
            dataIndex: 'MM_ACC_VAL',
            key: 'MM_ACC_VAL'
          },
          {
            title: '上月同期',
            dataIndex: 'MM_PREV_TODAY_VAL',
            key: 'MM_PREV_TODAY_VAL'
          },
          {
            title: '本年累计',
            dataIndex: 'YEAR_ACC_VAL',
            key: 'YEAR_ACC_VAL'
          }
        ]})
      this.getData(date, gdType, ['3002'])
    } else if (key === '2') {
      this.setState({
        gdCode: ['2001'],
        columns:[
          {
            title: '保育',
            dataIndex: 'DETAIL_NAME_LOC',
            key: 'DETAIL_NAME_LOC'
          },
          {
            title: '项目',
            dataIndex: 'TYPE',
            key: 'TYPE',
            render: (text, row, index) => {
              if(row.VAL_TYPE_NAME_ENG === 'QTY') {
                return {children: '数量'}
              }
              if (row.VAL_TYPE_NAME_ENG === 'WGH') {
                return {children: '重量'}
              }
              if (row.VAL_TYPE_NAME_ENG === 'AMOUNT') {
                return {children: '金额'}
              }
            }
          },
          {
            title: '当天',
            dataIndex: 'TODAY_VAL',
            key: 'TODAY_VAL'
          },
          {
            title: '本月累计',
            dataIndex: 'MM_ACC_VAL',
            key: 'MM_ACC_VAL'
          },
          {
            title: '上月同期',
            dataIndex: 'MM_PREV_TODAY_VAL',
            key: 'MM_PREV_TODAY_VAL'
          },
          {
            title: '本年累计',
            dataIndex: 'YEAR_ACC_VAL',
            key: 'YEAR_ACC_VAL'
          }
        ]})
      this.getData(date, gdType, ['2001'])
    }
  }
  doSearch = () => {
    const {date, gdType, gdCode} = this.state
    this.getData(date, gdType, gdCode)
  }
  componentWillMount () {
    let date = df(new Date(), 'yyyy-mm-dd')
    this.setState({date})
  }
  componentDidMount  () {
    this.doSearch()
  }
 render() {
   const {date, tableData,columns,tab } = this.state
   const TabPane = Tabs.TabPane
  return (
    <div>
      <div style={{textAlign: 'center'}}>
        <DatePicker onChange={this.changeDate} defaultValue={moment(date, 'yyyy-mm-dd')} />
        <Button onClick={this.doSearch}>查询</Button>
      </div>
      {/*各舍存栏信息*/}
      <Tabs defaultActiveKey={tab} onChange={this.changeTab}>
        <TabPane tab="配种分娩" key="1">
          <SwineTable x={400} marginTop={0} date={date} tableData={tableData} columns={columns}></SwineTable>
        </TabPane>
        <TabPane tab="保育育成" key="2">
          <SwineTable x={600} marginTop={0} date={date} tableData={tableData} columns={columns}></SwineTable>
        </TabPane>
        <TabPane tab="销售" key="3">
          <SwineTable x={600} marginTop={0} date={date} tableData={tableData} columns={columns}></SwineTable>
        </TabPane>
        <TabPane tab="采购" key="4">
          <SwineTable x={600} marginTop={0} date={date} tableData={tableData} columns={columns}></SwineTable>
        </TabPane>
      </Tabs>
    </div>
  )
 }
}