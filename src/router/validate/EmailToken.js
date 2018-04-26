import React, { Component } from 'react'
// import ValidateFrom from './ValidateFrom'
import classNames from 'classnames'
import queryString from 'query-string'
import success from 'images/register/success.png'
import PropTypes from 'prop-types'
import history from 'router/history'
import { userRegister, userVerify } from 'utils/Api'

class EmailToken extends Component {
    constructor() {
        super()
        this.state = {
            count: 3
        }
    }
    componentDidMount() {
        const { location } = this.props
        const parsed = this.parsedLocation(location)

        userVerify(parsed).then(res=>{
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
    parsedLocation(location) {
        return queryString.parse(location.search)
    }
    callback() {
        history.push('/')
    }
    render() {
        return (
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
        )
    }
}
EmailToken.propTypes = {
    location: PropTypes.object
}
export default EmailToken