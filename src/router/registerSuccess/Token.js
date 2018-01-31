import React, {Component} from 'react'
import PropTypes from 'prop-types'
class Token extends Component {
    constructor() {
        super()
        this.tokenHandle= this.tokenHandle.bind(this)
    }
    tokenHandle(e) {
        e.preventDefault()
        if (this.props.type === 'phone') {
            this.props.history.push({ pathname: '/registerSuccess/tokensuccess', search: `?type=${this.props.type}-success` })
            
        } else {
            this.props.history.push({ pathname: '/registerSuccess/tokensuccess', search: `?type=${this.props.type}` })

        }
    }
    render() {
        const input = this.props.type === 'phone' ?
            <input type="text" name='phone' placeholder='输入手机号' /> :
            <input type="email" name='email' placeholder='输入邮箱' />
        return (
            <div>
                <form className='token-form' onSubmit={this.tokenHandle}>
                    {input}
                    {this.props.type === 'email' ? undefined : <div className='token-code'>
                        <input type="text" name="code" placeholder='验证码' />
                        <a href="#">获取验证码</a>
                    </div>}
                    <input type="submit" className='token-submit' />
                </form>
            </div>
            
        )
    }
}
Token.propTypes = {
    type: PropTypes.string,
    history: PropTypes.object
}
export default Token