import React, { Component } from 'react'
import PorpTypes from 'prop-types'
import classnames from 'classnames'
import 'css/login/login.scss'
import md5 from 'js-md5'
import { Blowfish } from 'javascript-blowfish'
import Cookies from 'js-cookie'
import { Link, Route, Switch } from 'react-router-dom'
import user from 'images/login/user.png'
import password from 'images/login/passw.png'
import { withRouter } from 'react-router-dom'
import history from 'router/history'
import { userLogin } from 'utils/Api'



if (!window.atob) {
  var tableStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  var table = tableStr.split('')

  window.atob = function (base64) {
    if (/(=[^=]+|={3,})$/.test(base64)) throw new Error('String contains an invalid character')
    base64 = base64.replace(/=/g, '')
    var n = base64.length & 3
    if (n === 1) throw new Error('String contains an invalid character')
    for (var i = 0, j = 0, len = base64.length / 4, bin = []; i < len; ++i) {
      var a = tableStr.indexOf(base64[j++] || 'A'), b = tableStr.indexOf(base64[j++] || 'A')
      var c = tableStr.indexOf(base64[j++] || 'A'), d = tableStr.indexOf(base64[j++] || 'A')
      if ((a | b | c | d) < 0) throw new Error('String contains an invalid character')
      bin[bin.length] = ((a << 2) | (b >> 4)) & 255
      bin[bin.length] = ((b << 4) | (c >> 2)) & 255
      bin[bin.length] = ((c << 6) | d) & 255
    }
    return String.fromCharCode.apply(null, bin).substr(0, bin.length + n - 4)
  }

  window.btoa = function (bin) {
    for (var i = 0, j = 0, len = bin.length / 3, base64 = []; i < len; ++i) {
      var a = bin.charCodeAt(j++), b = bin.charCodeAt(j++), c = bin.charCodeAt(j++)
      if ((a | b | c) > 255) throw new Error('String contains an invalid character')
      base64[base64.length] = table[a >> 2] + table[((a << 4) & 63) | (b >> 4)] +
                (isNaN(b) ? '=' : table[((b << 2) & 63) | (c >> 6)]) +
                (isNaN(b + c) ? '=' : table[c & 63])
    }
    return base64.join('')
  }

}

function hexToBase64(str) {
  return btoa(String.fromCharCode.apply(null,
    str.replace(/\r|\n/g, '').replace(/([\da-fA-F]{2}) ?/g, '0x$1 ').replace(/ +$/, '').split(' '))
  )
}

function base64ToHex(str) {
  for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, '')), hex = []; i < bin.length; ++i) {
    var tmp = bin.charCodeAt(i).toString(16)
    if (tmp.length === 1) tmp = '0' + tmp
    hex[hex.length] = tmp
  }
  return hex.join(' ')
}



class LoginFrom extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      pending: false,
      remember: false
    }
    this.inputChange = this.inputChange.bind(this)
    this.submitHandle = this.submitHandle.bind(this)
    this.forgetPassword = this.forgetPassword.bind(this)
  }
  inputChange(e) {
    const { name } = e.target
    if (name !== 'protocol') {
      this.setState({
        [name]: e.target.value
      })
    }
  }
  componentDidMount() {
    const bf = new Blowfish('xg!$@gcp1*30y%#a')
    const userInfoItem = JSON.parse(localStorage.getItem('userInfoItem'))
    if (userInfoItem) {
      this.setState({
        username: userInfoItem.username,
        password: bf.decrypt(bf.base64Decode(hexToBase64(userInfoItem.password))),
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
    submitHandle(e) {
      e.preventDefault()
      const { username, password } = this.state
      if (!username) {
        alert('输入用户名')
        return 
      }
      if (!password) {
        alert('输入密码')
        return 
      }
      this.setState({
        pending: true
      })
      const bf = new Blowfish('xg!$@gcp1*30y%#a')
      const pass = base64ToHex(bf.base64Encode(bf.encrypt(password)))

      if (this.state.remember) {
        localStorage.setItem('userInfoItem', JSON.stringify({
          username: username,
          password: pass
        }))
      }
      userLogin({
        username: username,
        password: pass.replace(/\s/g, '')
      }).then(res=>{
        if(res.data.msg === '200') {
          console.log(res)
          sessionStorage.setItem('state', JSON.stringify(res.data.result))
                
          history.push({ pathname: '/index'})
          Cookies.set('name', md5(username), { path: '', expires: 1 / 24 })
        } else if(res.data.msg ==='211') {
          console.log(res.data.result)
          const flag = confirm('您还没有通过验证，请点击确认按钮完成验证操作。')
          if (flag) {
            sessionStorage.setItem('token', res.data.result.token)
            history.push({ pathname: '/validate' })
          }
                

        } else {
          alert(res.data.result)
        }
        this.setState({
          pending: false
        })
           
      }).catch(err => {
        alert('登陆异常，请稍候登陆')
        this.setState({
          pending: false
        })
      })
    }
    forgetPassword(e) {
      e.preventDefault()
      history.push({
        pathname: '/forget'
      })
    }
    render () {
      return (
        <div className='user-content'>
                
          <form className='user-form' onSubmit={this.submitHandle}>
            <input type="password" style={{ width: 0, height: 0,border: 'none' }} />
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
            <input type="password" style={{ width: 0, height: 0,border: 'none' }} />
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
              <input type='checkbox' id='remember' checked={this.state.remember} onChange={this.changeRemeber}/>
              <label htmlFor="remember">记住密码</label>
            </div>
            <div>
              <Link to='/user_reg' className='user-register'>欢迎注册</Link>
              <a href="#" className='user-forget' onClick={this.forgetPassword}>忘记密码？</a>
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