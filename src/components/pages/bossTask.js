import React, { Component } from 'react';
export default class BossTask extends Component {
  constructor (props) {
    super(props)
    this.state = {
      taskList: []
    }
  }
  componentDidMount() {
    const taskList = [
      {
        data: '这是一段文字1'
      },
      {
        data: '这是一段文字2'
      }
    ]
    this.setState({taskList})
  }
 render() {
   let {taskList} = this.state
  return (
    <div className="container">
      {
        taskList.map( (item, index) => {
          return (
            <div className="item" key={index}>{item.data}</div>
          )
        })
      }</div>
  )
 }
}