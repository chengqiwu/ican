import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import history from 'router/history'
import { blowfish } from 'utils/tools'
import { verifyCode, userRegister } from 'utils/Api'
import { codeUrl } from '../../url'
import { toast } from 'react-toastify'

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
      toast.info('请输入用户名', {
        position: toast.POSITION.BOTTOM_CENTER,
        pauseOnHover: false,
        hideProgressBar: true,
        autoClose: 3000,
      })
      return
    }
    // [\s\S]*
    if (!username.match(/^[a-zA-Z\u4e00-\u9fa5][\s\S]*/)){
      // ([\u4e00-\u9fa5_a-zA-Z0-9]{5,23})$/)) {
      toast.info('输入用户名格式不正确', {
        position: toast.POSITION.BOTTOM_CENTER,
        pauseOnHover: false,
        hideProgressBar: true,
        autoClose: 3000,
      })
      return
    } else {
      let len = username.replace(/[^x00-xff]/g, 'aa').length
      if (len >24 || len < 6) {
        toast.info('输入用户名格式不正确', {
          position: toast.POSITION.BOTTOM_CENTER,
          pauseOnHover: false,
          hideProgressBar: true,
          autoClose: 3000,
        })
        return
      }
    }
    if(!password) {
      toast.info('输入密码', {
        position: toast.POSITION.BOTTOM_CENTER,
        pauseOnHover: false,
        hideProgressBar: true,
        autoClose: 3000,
      })
      return
    }
    if (!password.match(/^[^\u4e00-\u9fa5]{6,24}$/)) {
      toast.info('输入密码格式不正确', {
        position: toast.POSITION.BOTTOM_CENTER,
        pauseOnHover: false,
        hideProgressBar: true,
        autoClose: 3000,
      })
      return
    }
    if (!repassword) {
      toast.info('请确认密码', {
        position: toast.POSITION.BOTTOM_CENTER,
        pauseOnHover: false,
        hideProgressBar: true,
        autoClose: 3000,
      })
      return
    }
    if (repassword !== password) {
      toast.info('两次密码不一样', {
        position: toast.POSITION.BOTTOM_CENTER,
        pauseOnHover: false,
        hideProgressBar: true,
        autoClose: 3000,
      })
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
            toast.info('必须同意《精禾云平台服务条款》后才能继续', {
              position: toast.POSITION.BOTTOM_CENTER,
              pauseOnHover: false,
              hideProgressBar: true,
              autoClose: 3000,
            })
            return
          } else {
            return true
          }
        }
      })
      .then(flag => {
        flag &&
                userRegister({
                  username,
                  password: blowfish(password)
                }).then(res => res.data)
                  .then(data => {
                    if (data.msg === '200') {
                      // toast.success('注册成功，请验证', {
                      //   position: toast.POSITION.BOTTOM_CENTER,
                      //   pauseOnHover: false,
                      //   hideProgressBar: true,
                      //   autoClose: 1000,
                      //   onClose: () => history.push('/validate')
                      // })
                      history.push('/validate')
                      sessionStorage.setItem('token', data.result)
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
    return (
      <div className='register-from center'>
        <form onSubmit={this.handleSubmit}>
          <div className='from-items'>
            <label className='item-key'>用户名</label>
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
            <label className='item-key'>密码</label>
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
            <label className='item-key'>确认密码</label>
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
            <label className='item-key'>验证码</label>
            <div className='center'>
              <input type="text" name='codeNumber' value={this.state.codeNumber} onChange={this.inputChange} required/>
              <img ref={img => this.img = img} src={codeUrl+this.state.timestamp} alt="" />
              <a href="#" onClick={this.getCode.bind(this)}>看不清？换一张</a>
            </div>
          </div>
          <div className='from-items'>
            <label className='item-key'></label>
            <div className='from-checkbox center'>
              <input type="checkbox" className='register' name="protocol" id='protocol'
                checked={this.state.protocol}
                onChange={this.inputChange} required/>                                
              <label htmlFor='protocol' >同意 《<a href="./terms.htm" target='_blank'>精禾云平台服务条款</a>》</label>
            </div>
          </div>
          <div className='from-items'>
            <label className='item-key'></label>
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