import React, { Component } from 'react'
import qq from 'images/login/qq.png'
import wechat from 'images/login/wechat.png'

class SecondLogin extends Component {
  render() {
    return (
      <div className='secondLogin'>
        <label>快速登录</label>
        <div className='second-login'>
          <img src={qq} alt="QQ登录" />
          <img src={wechat} alt="微信登陆" />
        </div>
      </div>
    )
  }
}
export default SecondLogin