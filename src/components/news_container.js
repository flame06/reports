import React, { Component } from 'react';
import NavLink from '@/components/nav_link'
export default class NewsContainer extends Component {
 constructor(props) {
  super(props)
  this.state = {
   menus: [
    {
     link: '/report1',
     title: 'NewsDetail'
    },
    {
     link: '/report2',
     title: 'UserCenter'
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