import React, { Component } from 'react'
import PorpTypes from 'prop-types'
import 'css/login/login.scss'
import { Link, Route, Switch } from 'react-router-dom'
import user from 'images/login/user.png'
import password from 'images/login/passw.png'
import { withRouter } from 'react-router-dom'
import history from 'router/history'
import { userLogin } from 'utils/Api'
class LoginFrom extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
        this.inputChange = this.inputChange.bind(this)
        this.submitHandle = this.submitHandle.bind(this)
        this.forgetPassword = this.forgetPassword.bind(this)
    }
    inputChange(e) {
        const { name } = e.target
        if (name !== 'protocol') {
            this.setState({
                [name]: e.target.value
            })
        }
    }
    submitHandle(e) {
        e.preventDefault()
        const { username, password } = this.state
        if (!username) {
            alert('输入用户名')
            return 
        }
        if (!username) {
            alert('输入密码')
            return 
        }
        userLogin({
            username,
            password
        }).then(res=>{
            console.log(res)
            if(res.data.msg === '200') {
                history.push({ pathname: '/index', state: res.data.result})
            }
        })
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
                            <input type='text' name='username' placeholder='用户名' 
                                value={this.state.username}
                                onChange={this.inputChange} />
                        </div>
                        <hr />
                        <div>
                            <img src={password} alt='' />
                            <input type='password' name='password' placeholder='请输入密码'
                                value={this.state.password} 
                                onChange={this.inputChange} />
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