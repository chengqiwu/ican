import React, { Component } from 'react'
import PorpTypes from 'prop-types'
import 'css/login/login.scss'
import { Link, Route, Switch } from 'react-router-dom'
import user from 'images/login/user.png'
import password from 'images/login/passw.png'
import { withRouter } from 'react-router-dom'

class LoginFrom extends Component {
    constructor() {
        super()
        this.submitHandle = this.submitHandle.bind(this)
        this.forgetPassword = this.forgetPassword.bind(this)
    }
    submitHandle(e) {
        e.preventDefault()
        this.props.history.push({ pathname: '/index'})
    }
    forgetPassword() {
        e.preventDefault()
    }
    render () {
        return (
            <div className='user-content'>
                <form className='user-form' onSubmit={this.submitHandle}>
                    <div>
                        <div>
                            <img src={user} alt='' />
                            <input type='text' name='username' placeholder='用户名' />
                        </div>
                        <hr />
                        <div>
                            <img src={password} alt='' />
                            <input type='password' name='password' placeholder='请输入密码' />
                        </div>
                    </div>

                    <input type="submit" className='user-submit' value="登录" />
                </form>
                <div className='user-help'>
                    <Link to='/register' className='user-register'>新用户注册</Link>
                    <a href="#" className='user-forget' onClick={this.forgetPassword}>忘记密码？</a>
                </div>

            </div>
        )
    }
   
}
LoginFrom.propTypes = {
    history: PorpTypes.object
}
export default withRouter(LoginFrom)