import React, { Component } from 'react'
import logo from 'images/common/logo.png'
import su from 'images/login/su.png'
import title from 'images/common/logo_white.png'
const Logo = () => {
    return (
        <div className='login-logo'>
            <div style={{display:'flex', alignItems: 'center'}}>
                <img src={logo} alt="精禾大数据" />

            </div>
            {/* <img src={su} className='logo-separate' />
            <img src={title} style={{height: '40px', marginLeft: '0px'}} className='logo-separate' /> */}
            {/* <span>精禾云平台</span> */}
        </div>
    )
}
export default Logo