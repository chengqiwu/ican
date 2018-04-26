import React, { Component } from 'react'
import PorpTypes from 'prop-types'
import classnames from 'classnames'
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
            password: '',
            pending: false
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
        this.setState({
            pending: true
        })
        userLogin({
            username: escape(username),
            password: escape(password)
        }).then(res=>{
            if(res.data.msg === '200') {
                console.log(res)
                history.push({ pathname: '/index', state: res.data.result})
            } else {
                console.log(res)
                alert(res.data.result)
                this.setState({
                    pending: false
                })
            }
           
        }).catch(err => {
            alert('登陆异常，请稍候登陆')
            this.setState({
                pending: false
            })
        })
    }
    forgetPassword(e) {
        e.preventDefault()
        history.push({
            pathname: '/forget'
        })
    }
    render () {
        console.log(this.state.pending)
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
                    <button type='submit' className={classnames({
                        'user-submit': true,
                        'disable': this.state.pending
                    })} style={{ cursor: 'pointer' }}>
                        <div>登录</div> 
                        <div className={classnames({
                            'loading': this.state.pending
                        })}></div>
                    </button>
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