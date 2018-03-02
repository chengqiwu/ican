import React, { Component } from 'react'
import Language from 'router/common/Language'
import { NavLink } from 'react-router-dom'

import 'css/index/header.scss'
import css_sprites from 'images/index/css_sprites.png'
import {updateUserInfo, getUserInfo} from '../../utils/Api'
const userInfo = getUserInfo()
class Header extends Component {
    constructor() {
        super()
        // { username, role, icon, phone, email }
        this.state = {
            popup: false,
            username: userInfo.username,
            address: '',
            icon: ''
        }
        this.showUserInfo = this.showUserInfo.bind(this)
        this.updateUserInfo = this.updateUserInfo.bind(this)
        this.changeInput = this.changeInput.bind(this)
    }
    showUserInfo() {
        this.setState({
            popup: true
        })
    }
    updateUserInfo(e) {
        e.preventDefault()
        const info = {
            name: this.state.username,
            address: this.state.address,
            
        }
        const formData = new FormData(this.form)
        console.log(formData.append)
        formData.append('icon', this.icon.files[0])
        formData.append('userVo', JSON.stringify(info))
        
        console.log(formData)
        updateUserInfo(formData).then(res=>console.log(res))
    }
    changeInput(e) {
        const { name, value } = e.target
        console.log(name)
        this.setState({
            [name]: value
        })
    }
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
                        <div className='user' onClick={this.showUserInfo.bind(this)}>
                            <div className='userPopup'>
                                <h3>用户信息：</h3>
                                
                                <form ref={form => this.form = form} onSubmit={this.updateUserInfo} encType="multipart/form-data">
                                    头像: <input type="file" name='icon'
                                        value={this.state.icon}
                                        ref={icon => this.icon = icon}
                                        onChange={this.changeInput}/>
                                    name: <input type="text" name='username'
                                        value={this.state.username} 
                                        onChange={this.changeInput} />
                                    address:<input type="text" name='address'
                                        value={this.state.address}
                                        onChange={this.changeInput} />
                                    <input type="submit" value="更新"/>
                                </form>
                            </div>
                        </div>
                        <Language/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header