import React, { Component } from 'react';
import NavLink from '@/components/router/nav_link'
export default class Menus extends Component {
 constructor(props) {
  super(props)
  this.state = {
   menus: [
    {
     link: '/dayIndex',
     title: '日报'
    },
    {
     link: '/livestockIndex',
     title: '猪只存栏信息'
    },
     {
       link: '/realtimestateIndex',
       title: '猪只实时状态'
     },
     {
       link: '/BostTask',
       title: 'BossTask .js'
     }
   ]
  }
 }
 render() {
  return (
    <div>
     {this.state.menus.map((item, index) => {
      return <NavLink key={index} link={item.link} title={item.title}  />
     })}
    </div>
  )
 }
}