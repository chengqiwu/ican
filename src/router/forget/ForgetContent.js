import React, { Component } from 'react'
import ForgetForm from './ForgetForm'
class ForgetContent extends Component {

    render() {
        return (
            <div className='center'>
                <div className='forget-content'>
                    <div className='topbar'></div>
                    <h2 className='forget-title'>找回密码</h2>
                    <ForgetForm />
                </div>
            </div>
        )
    }
}
export default ForgetContent