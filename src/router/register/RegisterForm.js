import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import history from 'router/history'
import { Blowfish } from 'javascript-blowfish'
import { getVerifyCodeImage, verifyCode, userRegister } from 'utils/Api'
import { codeUrl } from '../../url'

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


function chgUrl(url) {
  var timestamp = (new Date()).valueOf()
  if ((url.indexOf('&') >= 0)) {
    url = url + '×tamp=' + timestamp
  } else {
    url = url + '?timestamp=' + timestamp
  }
  return url
}
class RegisterForm extends Component {
  constructor() {
    super()
    this.state = {
      code: undefined,
      username: '',
      password: '',
      repassword: '',
      protocol: false,
      codeNumber: '',
      timestamp: (new Date()).valueOf()
    }
    this.inputChange = this.inputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    // getVerifyCodeImage()
    //     .then(res => {
    //         let reader = new FileReader()
    //         reader.onload = (e) => {
    //             this.setState({
    //                 code: e.target.result
    //             })
    //         }
    //         reader.readAsDataURL(res.data)
    //     })

  }
  getCode(e) {
    e.preventDefault()
    this.changeImg()
        
    // getVerifyCodeImage()
    //     .then(res => {
    //         let reader = new FileReader()
    //         reader.onload = (e) => {
    //             this.setState({
    //                 code: e.target.result
    //             })
    //         }
    //         reader.readAsDataURL(res.data)
    //     })
  }
   
  handleSubmit(e) {
    e.preventDefault()

    const { username, password, repassword, protocol } = this.state
    if (!username) {
      alert('输入用户名')
      return
    }
    // [\s\S]*
    if (!username.match(/^[a-zA-Z\u4e00-\u9fa5][\s\S]*/)){
      // ([\u4e00-\u9fa5_a-zA-Z0-9]{5,23})$/)) {
      alert('输入用户名格式不正确')
      return
    } else {
      let len = username.replace(/[^x00-xff]/g, 'aa').length
      console.log(len)
      if (len >24 || len < 6) {
        alert('输入用户名格式不正确')
        return
      }
    }
    if(!password) {
      alert('输入密码')
      return
    }
    if (!password.match(/^[^\u4e00-\u9fa5]{6,24}$/)) {
      alert('输入密码格式不正确')
      return
    }
    if (!repassword) {
      alert('请确认密码')
      return
    }
    if (repassword !== password) {
      alert('两次密码不一样')
      this.setState({
        password: '',
        repassword: ''
      })
      return
    }
    verifyCode({
      timestamp: this.state.timestamp,
      verifyCode: this.state.codeNumber
    }).then(res => res.data) 
      .then(data => {
        if (data.msg === '200') {
          if (!protocol) {
            alert('必须同意《精禾云平台服务条款》后才能继续')
            return
          } else {
            return true
          }
        } else {
          alert(data.result)
        }
      })
      .then(flag => {
        const bf = new Blowfish('xg!$@gcp1*30y%#a')
        const pass = base64ToHex(bf.base64Encode(bf.encrypt(password))).replace(/\s/g, '')

        flag &&
                userRegister({
                  username,
                  password: pass
                }).then(res => res.data)
                  .then(data => {
                    if (data.msg === '200') {
                      history.push('/validate')
                      sessionStorage.setItem('token', data.result)
                    }else {
                      alert(data.result)
                    }

                  })
               
      })
       
       
  }
  changeImg() {
    // var imgSrc = this.img
    // var src = imgSrc.getAttribute('src')
    // imgSrc.setAttribute('src', 'http://47.104.81.112:8080/ican_n/api/user/getVerifyCodeImage?timestamp=' + (new Date()).valueOf())
    this.setState({
      timestamp: (new Date()).valueOf()
    })
  }
  inputChange(e) {
    const {name, value} = e.target
        
    switch (name) {
    case 'username':
      if (!value.match(/^[a-zA-Z\u4e00-\u9fa5]([\u4e00-\u9fa5_a-zA-Z0-9]{5,23})$/)) {
        this.setState({
          // vailUsername: true,
          username: value
        })
      } else {
        this.setState({
          // vailUsername: false,
          username: value
        })
      }
      break
    case 'password': 
      if (!value.match(/^[^\u4e00-\u9fa5]{6,24}$/)) {
        this.setState({
          // vailPassword: true,
          password: value
        })
      } else {
        this.setState({
          // vailPassword: false,
          password: value
        })
      }
      break
    case 'protocol':
      this.setState({
        protocol: !this.state.protocol
      })
      break
    default:
      this.setState({
        [name]: value
      })
    }
        
       
  }
  render() {
    console.log(this.state.password)
    return (
      <div className='register-from center'>
        <form onSubmit={this.handleSubmit}>
          <input type="password" style={{ width: 0, height: 0,border: 'none' }} />
          <div className='from-items'>
            <label>用户名</label>
            <div className='from-item'>
              <input type="text" name='username' placeholder='用户名' required
                className={this.state.vailUsername ? 'error' : ''}
                value={this.state.username}
                onChange={this.inputChange}/>
              <span className={classNames({
                'register-prompt': true,
              })}>由汉字、英文字母、数字或下划线组成，首字符不能为数字和特殊字符。6-24位，一个汉字占两个字符。</span>
            </div>

          </div>
          <div className='from-items'>
            <label>密码</label>
            <div className='from-item'>
              <input type="password" name='password' placeholder='********' required
                className={this.state.vailPassword ? 'error' : ''}
                value={this.state.password}
                onChange={this.inputChange} />                                
              <span className={classNames({
                'register-prompt': true,
              })}>由英文字母、数字或英文特殊字符组成，6-24位。</span>
            </div>

          </div>
          <div className='from-items'>
            <label>确认密码</label>
            <div className='from-item'>
              <input type="password" name='repassword' placeholder='********' required
                value={this.state.repassword}
                onChange={this.inputChange} />  
              {/* <span className={classNames({
                                'register-prompt': true,
                                'hiden': this.state.vailRePassword
                            })}>两次输入密码不一致</span>                            */}
            </div>
          </div>
          <div className='verification-code '>
            <label>验证码</label>
            <div className='center'>
              <input type="text" name='codeNumber' value={this.state.codeNumber} onChange={this.inputChange} required/>
              <img ref={img => this.img = img} src={codeUrl+this.state.timestamp} alt="" />
              <a href="#" onClick={this.getCode.bind(this)}>看不清？换一张</a>
            </div>
          </div>
          <div className='from-items'>
            <label></label>
            <div className='from-checkbox center'>
              <input type="checkbox" className='register' name="protocol"
                checked={this.state.protocol}
                onChange={this.inputChange} required/>                                
              <span>同意 《<a href="./terms.htm" target='_blank'>精禾云平台服务条款</a>》</span>
            </div>
          </div>
          <input type="password" style={{ width: 0, height: 0,border: 'none' }} />
          <div className='from-items'>
            <label></label>
            <input type="submit" className='register-submit' value='下一步' />
          </div>
        </form>
      </div>

    )
  }
}
RegisterForm.propTypes = {
  history: PropTypes.object
}
export default withRouter(RegisterForm)