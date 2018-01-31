import React, { Component } from 'react'
import LoginFrom from './LoginFrom'
import SecondLogin from './SecondLogin'
import more from 'images/login/more.png'
import 'css/login/login.scss'
import { withRouter } from 'react-router-dom'
class Content extends Component {
    render() {
        return (
            <div className='login-content'>
                <div className='login-more'>
                    <img src={more} alt="更好的农田管理者"/>
                    <div>
                        <a className='center'>了解更多</a>
                    </div>
                </div>
                <div className='user-login'>
                    <div className='user-header'>
                        <div>用户登录</div>
                        <div>USER LOGIN</div>
                    </div>
                    <LoginFrom />
                    <SecondLogin />
                </div>
            </div>
        )
    }
}
export default withRouter(Content)