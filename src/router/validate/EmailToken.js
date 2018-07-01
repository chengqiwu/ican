import React, { Component } from 'react'
// import ValidateFrom from './ValidateFrom'
import Header from '../common/Header'
import Footer from '../common/Footer'
import 'css/register/emailToken.scss'
import classNames from 'classnames'
import queryString from 'query-string'
import success from 'images/register/success.png'
import PropTypes from 'prop-types'
import history from 'router/history'
import { userRegister, userVerify, updateContactEmailSuccess } from 'utils/Api'

class EmailToken extends Component {
    constructor() {
        super()
        this.state = {
            count: 3
        }
    }
    componentDidMount() {
        console.log(123)
        const { location } = this.props
        const parsed = this.parsedLocation(location)
        console.log(parsed)
        if (parsed.email) {
            // 修改邮箱
            var fd = new FormData()
            fd.append('verifyWay', 1)
            fd.append('verify', parsed.email)
            updateContactEmailSuccess(fd, parsed.token)
                .then(e=>e.data)
                .then(data => {
                    this.timer = setInterval(() => {
                        this.setState(prevState => ({
                            count: prevState.count - 1
                        }))
                        !this.state.count && clearInterval(this.timer)
                        !this.state.count && this.callback()

                    }, 1000)
                })
            return

        }
        if (parsed.token) {
            userVerify(parsed).then(res => {
                if (res.data.msg === '200') {
                    this.timer = setInterval(() => {
                        this.setState(prevState => ({
                            count: prevState.count - 1
                        }))
                        !this.state.count && clearInterval(this.timer)
                        !this.state.count && this.callback()

                    }, 1000)
                }
            })

        }
        
    }
    parsedLocation(location) {
        return queryString.parse(location.search)
    }
    callback() {
        history.push('/')
    }
    render() {
        return (
            <div className='register-bg'>
                <Header/>
                <div className='center'>
                    <div className='register-content'>
                        <div className='topbar'></div>
                        <h2 className='register-title'>注册精禾云平台账号</h2>
                        <div className='register-success-form center'>
                            <div>
                                <div className='success-tip'>
                                    <img src={success} />
                                    <span>恭喜你,邮箱验证成功</span>
                                </div>
                                <div className='success-token'>
                                    <button onClick={this.callback}>跳转登录页面</button>
                                    自动跳转倒计时{this.state.count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
EmailToken.propTypes = {
    location: PropTypes.object
}
export default EmailToken