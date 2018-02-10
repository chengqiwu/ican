import React, { Component } from 'react'
import PropTypes from 'prop-types'
class TokenSuccess extends Component {
    constructor() {
        super()
        this.tokenHandle = this.tokenHandle.bind(this)
    }
    tokenHandle(e) {
        e.preventDefault()
        this.props.type === 'email-success' ? 
            this.props.history.push({ pathname: '/'}) :
            this.props.type === 'phone-success' ?
                this.props.history.push({ pathname: '/' }) :
                this.props.history.push({ pathname: '/registerSuccess/tokensuccess', search: `?type=${this.props.type}-success` })
    }
    render() {
        const email = <div>
            <div>一封激活邮件已经发送到你的邮箱，</div>
            <div>请接收并按照邮件内提示完成激活操作。</div>
            <input type="submit" className='token-submit' value='完成注册' />
        </div>
        const phone = <div>
            <div>
                太好了，您已经完成注册，请用您刚才创建的账号登录本平台，
            </div>
            <div>
                感受精禾为您提供的科学精准服务吧。
            </div>
            <input type="submit" className='token-submit' value='开始登录' />
        </div>
        return (
            <div>
                <form className='token-form-success' onSubmit={this.tokenHandle}>
                    {(this.props.type === 'phone-success' || this.props.type === 'email-success') ? phone : email}
                </form>
            </div>

        )
    }
}
TokenSuccess.propTypes = {
    type: PropTypes.string,
    history: PropTypes.object
}
export default TokenSuccess