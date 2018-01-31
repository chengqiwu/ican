import React, { Component } from 'react'
import RegisterSuccessFrom from './RegisterSuccessFrom'
import success from 'images/register/success.png'
class RegisterSuccessContent extends Component {
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
                                <span>恭喜你,注册成功</span>
                            </div>
                            <div className='success-token'>
                                <div>
                                    欢迎加入精禾云平台，你必须完成验证才能使用完整功能。
                                </div>
                                <div>
                                    可以从下面两种验证方式选择一种。
                                </div>
                                <RegisterSuccessFrom />
                            </div>
                        </div>
                   
                    </div>
                </div>
            </div>
        )
    }
}
export default RegisterSuccessContent