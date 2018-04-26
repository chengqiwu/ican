import React, { Component } from 'react'
import ResetForm from './ResetForm'
class ResetContent extends Component {

    render() {
        return (
            <div className='center'>
                <div className='reset-content'>
                    <div className='topbar'></div>
                    <h2 className='reset-title'>重置密码</h2>
                    <ResetForm />
                </div>
            </div>
        )
    }
}
export default ResetContent