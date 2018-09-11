import React, { Component } from 'react'
import PorpTypes from 'prop-types'
import classnames from 'classnames'
import { toast } from 'react-toastify'
import md5 from 'js-md5'
import { blowfish, unBlowfish } from 'utils/tools'
import Cookies from 'js-cookie'
import { Link, Route, Switch } from 'react-router-dom'
import user from 'images/login/user.png'
import password from 'images/login/passw.png'
import { withRouter } from 'react-router-dom'
import history from 'router/history'
import { userLogin } from 'utils/Api'

class LoginFrom extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      pending: false,
      remember: false
    }
  }
  inputChange = (e) => {
    const { name } = e.target
    if (name !== 'protocol') {
      this.setState({
        [name]: e.target.value
      })
    }
  }
  componentDidMount() {
    const userInfoItem = JSON.parse(localStorage.getItem('userInfoItem'))
    if (userInfoItem) {
      this.setState({
        username: userInfoItem.username,
        password: unBlowfish(userInfoItem.password),
        remember: true
      })
    }
  }
  changeRemeber = () => {
    if (!this.state.remember) { // !false
      localStorage.removeItem('userInfoItem')
    }
    this.setState({
      remember: !this.state.remember
    })
  }
  submitHandle = (e) => {
    e.preventDefault()
    const { username, password } = this.state
    if (!username) {
      toast.info('请输入用户名', {
        position: toast.POSITION.BOTTOM_CENTER,
        pauseOnHover: false,
        hideProgressBar: true,
        autoClose: 3000,
      })
      return
    }
    if (!password) {
      toast.info('请输入密码', {
        position: toast.POSITION.BOTTOM_CENTER,
        pauseOnHover: false,
        hideProgressBar: true,
        autoClose: 3000,
      })
      return
    }
    this.setState({
      pending: true
    })
    if (this.state.remember) {
      localStorage.setItem('userInfoItem', JSON.stringify({
        username: username,
        password: blowfish(password)
      }))
    }
    userLogin({
      username: username,
      password: blowfish(password)
    }).then(res => {
      if (res.data.msg === '200') {
        history.push({ pathname: '/index' })
        sessionStorage.setItem('state', JSON.stringify(res.data.result))
        Cookies.set('name', md5(username), { path: '', expires: 1 / 24 })
      } else if (res.data.msg === '211') {
        const flag = confirm('您还没有通过验证，请点击确认按钮完成验证操作。')
        if (flag) {
          sessionStorage.setItem('token', res.data.result.token)
          history.push({ pathname: '/validate' })
        }
      }
      this.setState({
        pending: false
      })

    }).catch(err => {
      this.setState({
        pending: false
      })
    })
  }
  forgetPassword = (e) => {
    e.preventDefault()
    history.push({
      pathname: '/forget'
    })
  }
  render() {
    return (
      <div className='user-content'>

        <form className='user-form' onSubmit={this.submitHandle}>
          <input type="password" style={{ width: 0, height: 0, border: 'none' }} />
          <div>
            <div>
              <img src={user} alt='' />
              <input type='text' name='username' placeholder='用户名'
                value={this.state.username}
                onChange={this.inputChange} />
            </div>
            <hr />
            <div>
              <img src={password} alt='' />
              <input type='password' name='password' placeholder='请输入密码'
                value={this.state.password}
                onChange={this.inputChange} />

            </div>
          </div>
          <input type="password" style={{ width: 0, height: 0, border: 'none' }} />
          <button type='submit' className={classnames({
            'user-submit': true,
            'disable': this.state.pending
          })} style={{ cursor: 'pointer' }}>
            <div>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</div>
            <div className={classnames({
              'loading': this.state.pending
            })}></div>
          </button>
        </form>
        <div className='user-help'>
          <div>
            <input type='checkbox' id='remember' checked={this.state.remember} onChange={this.changeRemeber} />
            <label htmlFor="remember">记住密码</label>
          </div>
          <div>
            <Link to='/user_reg' className='user-register'>欢迎注册</Link>
            <a href="#" className='user-forget' onClick={this.forgetPassword}>忘记密码</a>
          </div>

        </div>

      </div>
    )
  }

}
LoginFrom.propTypes = {
  history: PorpTypes.object
}
export default withRouter(LoginFrom)