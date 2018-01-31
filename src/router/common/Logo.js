import React, { Component } from 'react'
import logo from 'images/common/logo.png'
import su from 'images/login/su.png'
const Logo = () => {
    return (
        <div className='login-logo'>
            <img src={logo} alt="精禾大数据"/>
            <img src={su} className='logo-separate'/>
            <span>精禾云平台</span>
        </div>
    )
}
export default Logo