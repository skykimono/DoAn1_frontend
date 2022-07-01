import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CustomNavbar from '../Components/CustomNavbar'
import RegisterForm from '../Components/RegisterFrom'
export default class Register extends Component {
  render() {
    return (
      <>
      <div style={{display: 'flex', alignItems: 'center',justifyContent: 'center',height: '105vh'}}><RegisterForm/></div>
      <div style={{height: 300}}></div>
      </>
    )
  }
}
