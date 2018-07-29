import React, { Component } from 'react'
import RegisterForm from './RegisterForm'
class RegisterContent extends Component {

  render() {
    return (
      <div className='center'>
        <div className='register-content'>
          <div className='topbar'></div>
          <h2 className='register-title'>注册精禾云平台账号</h2>
          <RegisterForm />
        </div>
      </div>
    )
  }
}
export default RegisterContent