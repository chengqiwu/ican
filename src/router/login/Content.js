import React, { Component } from 'react'
import LoginFrom from './LoginFrom'
import SecondLogin from './SecondLogin'
import Sprite from './Sprite'
import logo from 'images/login/logo.png'
import 'css/login/login.scss'
import { withRouter } from 'react-router-dom'
import Video from './Video'
class Content extends Component {
  constructor() {
    super()
    this.state = {
      loginClose: false
    }
  }
    closeClick = (e) => {
      e.preventDefault()
      this.setState({
        loginClose: false
      })
    }
    showLogin = () => {
      console.log(this.state.loginClose)
      if (this.state.loginClose) {
        return
      }
      this.setState({
        loginClose: true
      })
    }
    render() {
      return (
        <div className='login-content'>
          <Sprite show={this.showLogin}/>
          <Video />
          <div className='login-more'>
            {/* <img src={more} alt="更好的农田管理者"/>
                    <div>
                        <a className='center'>了解更多</a>
                    </div> */}
                   
          </div>
          <div className='user-login' style={{ display: (!this.state.loginClose ? 'none' : 'block')}}>
            <div>
              <a href="#" className='login-closer' onClick={this.closeClick}></a>
              <img src={logo} alt=""/>
              <SecondLogin />
              <LoginFrom />
            </div>
          </div>
        </div>
      )
    }
}
export default withRouter(Content)