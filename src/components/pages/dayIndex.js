import React, { Component } from 'react';
import moment from 'moment'
import df from 'dateformat'
import {Button, Calendar,DatePicker } from 'antd'
import axios from 'axios'
import Highcharts from 'highcharts';
//import HighchartsMore from 'highcharts/highcharts-more';
//import HighchartsDrilldown from 'highcharts/modules/drilldown';
//import Highcharts3D from 'highcharts/highcharts-3d';
export default class NewsDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      orgCode: '161322001',
      farmOrg: '434701-0-0',
      date: '',
      dataOjb: {
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
      },
      container0Config: {}
    }
  }
  changeDate = (value, date) => {
    console.log(value, date)
    console.log(Highcharts);
    this.setState({date})
    this.doSearch()
  }
  //  container0第一个表格的数据
  getReport () {
    const _self = this
    const {orgCode, farmOrg, date, container0Config} = this.state
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
        console.log(dataOjb)
        _self.setState({dataOjb})
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
                  alert('click---?')
                }
              }
            }
          },
          series: [{
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
          }]
        })
      })
    //设置完成
    console.log('改变后的配置')
    //console.log(this.state.container0Config)
    console.log(dataOjb.legendData3)

  }
  doSearch = () => {
    this.getReport()
    const {container0Config} = this.state
    new Highcharts.Chart('divA1Graph', container0Config)
    new Highcharts.Chart('divB1Graph', container0Config)
 }
  componentWillMount () {
    let date = df(new Date(), 'yyyy-mm-dd')
    this.setState({date})
  }
  componentDidMount  () {
    this.doSearch()
  }
 render() {
   const {date } = this.state
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
    </div>
  )
 }
}