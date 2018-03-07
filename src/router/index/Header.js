import React, { Component } from 'react'
import Language from 'router/common/Language'
import { NavLink, Route } from 'react-router-dom'

import 'css/index/header.scss'
import css_sprites from 'images/index/css_sprites.png'
import Popup from './Popup'
import UserInfo from './UserInfo'
import history from '../history'
class Header extends Component {
    constructor() {
        super()
        this.state = {
            hiden: true,
        }
        this.showUserInfo = this.showUserInfo.bind(this)
        this.fadeHiden = this.fadeHiden.bind(this)
    }
    showUserInfo() {
        this.setState({
            hiden: false
        })
        history.push('/index/userinfo')
    }
    fadeHiden() {
        this.setState({
            hiden: true
        })
    }
    render() {
        console.log(this.state.hiden)
        return [
            <div className='header' key='1'>
                <div>
                    <div className='title'>
                        <div className='bg-logo'></div>
                        <h3>精禾云平台</h3>
                    </div>
                    <div className='block'>

                    </div>
                    <nav className='nav'>
                        <NavLink to='/index/field'>
                            <div className='bg-field'></div>
                            <span>田地</span>
                        </NavLink>
                        <div></div>
                        <NavLink to='/index/schedule'>
                            <div className='bg-schedule'></div>
                            <span>日程表</span>
                        </NavLink>
                        <div></div>                        
                        <NavLink to='/index/farmers'>
                            <div className='bg-farmers'></div>
                            <span>种植户</span>
                        </NavLink>
                        <div></div>                        
                        <NavLink to='/'>
                            <div className='bg-information'></div>
                            <span>资讯</span>
                        </NavLink>
                    </nav>
                    
                </div>
                <div className='header-right'>
                    <div>
                        <div className='user' onClick={this.showUserInfo}>
                           
                        </div>
                        <Language/>
                    </div>
                </div>
            </div>,
            this.state.hiden ? null : 
                <Route key={2} path='/index/userinfo' render={() => {
                    return <Popup key='2' title='用户信息' css={{ top: 'calc(50% + 50px)' }} fadeHiden={this.fadeHiden}>
                        <UserInfo></UserInfo>
                    </Popup>
                }} />
               
               
        ]
    }
}

export default Header