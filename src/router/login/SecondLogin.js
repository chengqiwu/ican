import React, { Component } from 'react'
import 'css/login/login.scss'
import qq from 'images/login/qq.png'
import wechat from 'images/login/wechat.png'

class SecondLogin extends Component {
    render() {
        return (
            <div>
                <div className='user-sepate'>
                    <div className='level'></div>
                    <span>快速登录</span>
                    <div className='level'></div>
                </div>
                <div className='second-login'>
                    <img src={qq} alt="QQ登录" />
                    <img src={wechat} alt="微信登陆" />
                </div>
            </div>
        )
    }
}
export default SecondLogin