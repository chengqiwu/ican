import React, { Component } from 'react'
import Language from 'router/common/Language'
import { NavLink } from 'react-router-dom'

import 'css/index/header.scss'
import css_sprites from 'images/index/css_sprites.png'

class Header extends Component {
    render() {
        return(
            <div className='header'>
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
                        <div className='user'></div>
                        <Language/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header