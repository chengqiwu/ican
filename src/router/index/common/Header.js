import React, { Component } from 'react'
// import logo from 'images/common/logo_.png'
import title from 'images/common/title.png'
import 'css/index/common/header.scss'
const Header = (props) => {
    return (
        <div className='header-logo'>
            {/* <img className='logo' src={logo} alt="" /> */}
            <img className='logo' style={{width: '120px'}} src={title} alt=""/>
        </div>
    )
}
export default Header