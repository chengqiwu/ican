import React, { Component } from 'react'
// import ValidateFrom from './ValidateFrom'
import classNames from 'classnames'
import success from 'images/register/success.png'
import PropTypes from 'prop-types'
import history from 'router/history'
import { userRegister, userVerify } from 'utils/Api'
class ValidateContent extends Component {
    constructor() {
        super()
        this.state = {
            type: 'phone',
            phone: '',
            email: '',
            code: '',
            phoneSuccess: false, //false 待验证 true 验证成功
            emailSuccess: false,
        }
        this.changeValidate = this.changeValidate.bind(this)
        this.validateHandle = this.validateHandle.bind(this)
        this.validateSuccess = this.validateSuccess.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.getCode = this.getCode.bind(this)
    }
    changeValidate(e) {
        if (this.state.phoneSuccess > 0 || this.state.emailSuccess > 0) {
            this.setState({
                phoneSuccess: 0,
                emailSuccess: 0
            })
        }
        const validateType = e.target.type
        if (this.state.type !== validateType) {
            this.setState({
                type: validateType
            })
        }
    }
    validateHandle(e) {
        e.preventDefault()
        
        const {type, token} = this.state
        if (type === 'phone') {
            // userVerify({token}).then(res=>{
            //     if (res.data.msg === '200') {
                   
            //     }
            // })     
            this.setState({
                phoneSuccess: true
            })  
           
        }
        if (type === 'email') {
            if (!this.state.email) {
                alert('email')
                return
            }
            // userVerify({token}).then(res=>{
            //     if (res.data.msg === '200') {

            //     }
            // })     
            this.setState({
                emailSuccess: true
            })  
           
        }
    }
    validateSuccess(e) {
        e.preventDefault()
        const type = this.state.type
    
        history.push('/')
    }
    inputChange(e) {
        const { name } = e.target
        if (name !== 'protocol') {
            this.setState({
                [name]: e.target.value
            })
        }
    }
    getCode() {
        if (!this.state.phone) {
            alert('输入手机号')
            return
        }
        const { state } = history.location
        userRegister({
            ...state,
            // username: '1111',
            // password: '111',
            verifyWay: this.state.type === 'phone' ? 0 : 1,
            verify: this.state.type === 'phone' ? this.state.phone : this.state.email
        }).then( res=> {
            if (res.data.msg === '200') {
                const { data: { result: { token, code } } } = res
                console.log(token)
                this.setState({
                    code,
                    token
                })
            }
           
        })
    }
    render() {
        const input = this.state.type === 'phone' ?
            <input type="text" name='phone' placeholder='输入手机号' 
                value={this.state.phone}
                onChange={this.inputChange} /> :
            <input type="email" name='email' placeholder='输入邮箱' 
                value={this.state.email} 
                onChange={this.inputChange} />
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
            <div className='center'>
                <div className='register-content'>
                    <div className='topbar'></div>
                    <h2 className='register-title'>注册精禾云平台账号</h2>
                    <div className='register-success-form center'>
                        <div>
                            <div className='success-tip'>
                                <img src={success} />
                                <span>恭喜你,注册成功</span>
                            </div>
                            <div className='success-token'>
                                <div>
                                    欢迎加入精禾云平台，你必须完成验证才能使用完整功能。
                                </div>
                                <div>
                                    可以从下面两种验证方式选择一种。
                                </div>
                                <div className='token-way'>
                                    <a href='#phone' className={classNames({ 'center': true, 'token-active': this.state.type === 'phone' })}
                                        type='phone'
                                        onClick={this.changeValidate}>通过手机号验证</a>
                                    <a href='#email' className={classNames({ 'center': true, 'token-active': this.state.type === 'email' })}
                                        type='email'
                                        onClick={this.changeValidate}>通过E-mail验证</a>
                                </div>
                                {
                                    (!this.state.phoneSuccess && !this.state.emailSuccess)  ? 
                                        <form className='token-form' onSubmit={this.validateHandle}>
                                            {input}
                                            {this.state.type === 'email' ? undefined : <div className='token-code'>
                                                <input type="text" name="code" placeholder='验证码' 
                                                    value={this.state.code} 
                                                    onChange={this.inputChange}/>
                                                <a href="#" onClick={this.getCode}>获取验证码</a>
                                            </div>}
                                            <input type="submit" className='token-submit' />
                                        </form> 
                                        : 
                                        <form className='token-form-success' onSubmit={this.validateSuccess}>
                                            {
                                                this.state.type === 'phone' ? phone : email
                                            }
                                        </form>
                                }
                            </div>
                        </div>
                   
                    </div>
                </div>
            </div>
        )
    }
}
export default ValidateContent