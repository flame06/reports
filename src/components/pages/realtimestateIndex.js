import React, { Component } from 'react';
import F2 from '@antv/f2'
import PieLabel from '@antv/f2/lib/plugin/pie-label'
import axios from "axios";
import {Button, DatePicker, Modal} from "antd";
import moment from "moment";
import df from "dateformat";
import SwineTable from '@/components/pages/swineTable'
export default class RealtimestateIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      orgCode: '161322001',
      farmOrg: '434701-0-0',
      showModal: false,
      showQRModal: false,
      date: df(new Date(), 'yyyy-mm-dd'),
      tableData: [],
      columns: [
        {
          title: '指标',
          dataIndex: 'descLoc',
          key: 'descLoc',
          render: (v, o) => {
            // console.log(v, o)
            return <a href='javascript:;' onClick={this.showModal.bind(this, o)}>{v}</a>
          }
        },
        {
          title: '数量',
          dataIndex: 'datas[0].VAL_QTY',
          key: 'datas[0].VAL_QTY'
        },
        {
          title: '占比',
          dataIndex: 'datas[0].VAL_RATE',
          key: 'datas[0].VAL_RATE'
        }
      ],
      swineData: [],
      swineColumns: [
        {
          title: '',
          dataIndex: 'key',
          key: 'key',
          render: (v) => {
            return v + 1
          }
        },
        {
          title: '耳号',
          dataIndex: 'SWINE_TRACK',
          key: 'SWINE_TRACK',
          render: (v, o) => {
            return <a href="javascript:;" onClick={this.getSwineQRcode.bind(this, o)}>{v}</a>
          }
        },
        {
          title: '状态日期',
          dataIndex: 'ACTIVITY_DATE',
          key: 'ACTIVITY_DATE'
        },
        {
          title: '上次状态日期',
          dataIndex: 'LAST_ACTIVITY_DATE',
          key: 'LAST_ACTIVITY_DATE'
        },
        {
          title: '胎次',
          dataIndex: 'PARITY',
          key: 'PARITY'
        },
        {
          title: '相差天数',
          dataIndex: 'DATE_DIFF',
          key: 'DATE_DIFF'
        }
      ],
      swineQRData: [],
      swineQRColumns: [
        {
          title: '',
          dataIndex: 'ext',
          key: 'ext'
        },
        {
          title: 'swineTrack',
          dataIndex: 'swineTrack',
          key: 'swineTrack'
        },
        {
          title: 'bornQty',
          dataIndex: 'bornQty',
          key: 'bornQty'
        }
      ]
    }
  }
  getSwineQRcode = (o) => {
    console.log('二维码', o)
    this.setState({showQRModal: true})
    this.getQRData(this.state.date, o)
  }
  getQRData = (date, o) => {
    const _self = this
    const {farmOrg, orgCode} = this.state
    axios({
      method: 'post',
      url: '/api/swine_sow_card/sow_cards',
      data: {
        farmOrg: farmOrg,
        orgCode: orgCode,
        swineDateIn: o['SWINE_DATE_IN'],
        swineTrack: o['SWINE_TRACK']
      }
    }).then((res) => {
      _self.setState({swineQRData: res.data})
      console.log(res.data)
    })
  }
  closeModal = () => {
    this.setState({showModal: false})
  }
  closeQRModal = () => {
    this.setState({showQRModal: false})
  }
  showModal = (o) => {
    this.setState({showModal: true})
    this.getSwineData(this.state.date, o)
  }
  getSwineData = (date, o) => {
    console.log(`["${o.gdCode}"]`)
    const _self = this
    const {farmOrg, orgCode} = this.state
    axios({
      method: 'post',
      url: `/report/${orgCode}/${farmOrg}/get_report`,
      data: {
        command: 'getCommand2',
        dateToday: date,
        endDate: date,
        gdCode: [`${o.gdCode}`],
        gdType: ['D000301'],
        startDate: date,
        datasFlag: '2'
      }
    })
      .then((res) => {
        const swineData = res.data
        swineData.map((item, index) => {
          swineData[index].key = index
        })
        _self.setState({swineData})
      })
  }
  getTableData = (date) => {
    const _self = this
    const {farmOrg, orgCode} = this.state
    axios({
      method: 'post',
      url: `/report/${orgCode}/${farmOrg}/realTimeStateTable`,
      data: {
        command: 'getCommand1',
        dateToday: date,
        endDate: date,
        gdCode: ["2001", "3001", "4001", "5001", "6001", "7001", "8001"],
        gdType: ['D000301'],
        startDate: date,
        startsWith: '1'
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
  getData = (date) =>{
    const _self = this
    console.log(date)
    const {orgCode, farmOrg} = this.state
    axios({
      method: 'post',
      url: `/report/${orgCode}/${farmOrg}/get_report`,
      data: {
        command: 'getCommand1',
        dateToday: date,
        endDate: date,
        gdCode: ['1001'],
        gdType: ['D000301'],
        startDate: date,
        datasFlag: '2',
        startsWith: '1'
      }
    }).then((res) => {
      console.log(res.data)
      const data = res.data
      _self.getChart(data)
    })
  }
  getChart = (data) => {
    const chart = new F2.Chart({
      id: 'chart01',
      plugins: PieLabel,
      pixelRatio: window.devicePixelRatio // 指定分辨率
    });
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      radius: 0.9,
      innerRadius: 0.6
    })
    chart.axis(false);
    chart.tooltip({
      showTitle: false,
      showName: false,
      onShow: function onShow(ev) {
        var items = ev.items;
        items[0].value = " 头数: " + items[0].value
        console.log(ev)
      }
    });
    chart.legend({
      position: 'bottom'
    });
    chart.guide().html({
      position: ['50%', '50%'],
      html: '<div style="text-align: center;width:100px;height: 50px;">\n<p style="font-size: 12px;color: darkred;margin: 0" id="title"></p>\n      <p style="font-size: 18px;color: #343434;margin: 0;font-weight: bold;" id="money"></p>\n      </div>'
    });
    chart.interval().position('*VAL').adjust('stack').color('DESC_LOC');
    console.log(chart)
    chart.pieLabel({
      sidePadding: 30,
      activeShape: true,
      label1: function label1(data) {
        return {
          text: data.DESC_LOC,
          fill: '#343434',
          fontWeight: 'bold'
        };
      },
      label2: function label2(data) {
        return {
          text: '头数：' + data.VAL,
          fill: '#999'
        };
      },
      onClick: function onClick(ev) {
        var data = ev.data;
        var title = document.getElementById('title')
        var money = document.getElementById('money')
        if (data) {
          title.innerText = data.DESC_LOC
          money.innerText = data.VAL
        }
      }
    });
    chart.render()
  }
  changeDate = (value, d) => {
    this.setState({date: d})
    this.getData(d)
  }
  doSearch = () => {
    const {date} = this.state
    this.getData(date)
    this.getTableData(date)
  }
  componentDidMount() {
    const {date} = this.state
    this.doSearch(date)
  }
  render() {
    const {date, showModal,showQRModal, tableData, columns, swineData, swineColumns, swineQRData, swineQRColumns} = this.state
    return (
    <div>
      <div style={{textAlign: 'center'}}>
        <DatePicker onChange={this.changeDate} defaultValue={moment(date, 'yyyy-mm-dd')} />
        <Button onClick={this.doSearch}>查询</Button>
      </div>
      <div className='chart-wrap'>
        <canvas id="chart01"  width="360" height="320"></canvas>
      </div>
      <SwineTable marginTop={30} date={date} tableData={tableData} columns={columns}></SwineTable>
      <Modal  visible={showModal} footer={null} width='100%' style={{top: 0,bottom: 0,right: 0,left: 0, minHeight: '100%', backgroundColor:'#fff'}} onCancel={this.closeModal}>
        <SwineTable x={600} marginTop={30} date={date} tableData={swineData} columns={swineColumns}></SwineTable>
      </Modal>
      <Modal  visible={showQRModal} footer={null} width='100%' style={{top: 0,bottom: 0,right: 0,left: 0, minHeight: '100%', backgroundColor:'#fff'}} onCancel={this.closeQRModal}>
        <SwineTable x={600} marginTop={30} date={date} tableData={swineQRData} columns={swineQRColumns}></SwineTable>
      </Modal>
    </div>

  )
 }
}