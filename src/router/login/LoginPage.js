import React, { Component } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import LoginFrom from './LoginFrom'
import SecondLogin from './SecondLogin'
import Sprite from './Sprite'
import Video from './Video'
// import logo from 'images/login/logo.png'
import 'css/login/login.scss'

class LoginPage extends Component {
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
    if (this.state.loginClose) {
      return
    }
    this.setState({
      loginClose: true
    })
  }
  render() {
    return (
      <div className='login-bg'>
        <Header/>
        <div className='login-content'>
          <Sprite show={this.showLogin} />
          <Video />
          <div className='user-login' style={{ display: (!this.state.loginClose ? 'none' : 'block') }}>
            <div>
              <a href="#" className='login-closer' onClick={this.closeClick}></a>
              {/* <img src={logo} alt=""/> */}
              <SecondLogin />
              <LoginFrom />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
LoginPage.propTypes = {

}
export default LoginPage