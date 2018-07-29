import React, { Component } from 'react'
// import ValidateFrom from './ValidateFrom'
import classNames from 'classnames'
import success from 'images/register/success.png'
import PropTypes from 'prop-types'
import history from 'router/history'
import Rx from 'rxjs/Rx'
import { registerVerify, userVerify } from 'utils/Api'
class ValidateContent extends Component {
  constructor() {
    super()
    this.state = {
      type: 'phone',
      phone: '',
      email: '',
      code: '',
      waitCode: '',
      active: false,
      phoneSuccess: false, //false 待验证 true 验证成功
      emailSuccess: false,
    }
    this.changeValidate = this.changeValidate.bind(this)
    this.validateHandle = this.validateHandle.bind(this)
    this.validateSuccess = this.validateSuccess.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.getCode = this.getCode.bind(this)
  }
  changeValidate(e) {
    e.preventDefault()
    if (this.state.phoneSuccess > 0 || this.state.emailSuccess > 0) {
      this.setState({
        phoneSuccess: 0,
        emailSuccess: 0
      })
    }
    const validateType = e.target.type
    if (this.state.type !== validateType) {
      this.setState({
        type: validateType,
               
      })
    }
    if (this.subcription) {
      this.subcription.unsubscribe()
      this.setState({
        active: false
      })
    }
    history.push('#' + e.target.type)
  }
  componentDidMount() {
    const token = sessionStorage.getItem('token')
    console.log(token)
    if (!token) {
      history.push('/user_reg')
    }
    // if (!history.location.state) {
    //     history.push('/user_reg')
    // }
    this.setState({
      token
    })
        
  }
  //组件将被卸载  
  componentWillUnmount() {
    //重写组件的setState方法，直接返回空
    this.setState = (state, callback) => {
      return
    }
  }
  validateHandle(e) {
    e.preventDefault()
        
    const {type, token} = this.state
    if (type === 'phone') {   
      if (this.state.code === this.state.waitCode) {
               
        userVerify({token}).then(res => res.data)
          .then(data => {
            if(data.msg === '200') {
              // this.setState({
              //     phoneSuccess: true
              // })  
              alert('太好了，您已经完成注册，请用您刚才创建的账号登录本平台，\r\n感受精禾为您提供的科学精准服务吧。')
              history.push('/')
            }
          })
      } else {
        alert('验证码输入错误，请重新输入')
      }
           
           
    }
    if (type === 'email') {
      if (!this.state.email) {
        alert('email')
        return
      } 
      if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.state.email))) {
        alert('输入邮箱有误，请重填')
        this.setState({
          email: ''
        })
        return
      }
      // this.setState({
      //     emailSuccess: true
      // })  
      const { state } = history.location
      registerVerify({
        token: this.state.token,
        verifyWay: this.state.type === 'phone' ? 0 : 1,
        verify: this.state.type === 'phone' ? this.state.phone : this.state.email
      }).then(res => {
        if (res.data.msg === '200') {
          // const { data: { result: { code } } } = res
          // this.setState({
          //     code
          // })
          alert('一封激活邮件已经发送到你的邮箱，\r\n请接收并按照邮件内提示完成激活操作。')
          history.push('/')
        }
      })
    }
  }
  validateSuccess(e) {
    e.preventDefault()
    const type = this.state.type
       
    history.push('/')
  }
  inputChange(e) {
    const { name } = e.target
    if (name !== 'protocol') {
      this.setState({
        [name]: e.target.value
      })
    }
  }
  getCode(e) {
    e.preventDefault()
        
    if (this.state.active ) {
      return
    }
    if (!this.state.phone) {
      alert('输入手机号')
      return
    }
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.state.phone))) {
      alert('手机号码有误，请重填')
      this.setState({
        phone: ''
      })
      return
    } 

    const obj = e.target
    let countdown = 60
    let observable = Rx.Observable.interval(1000)
      .takeWhile(x => x <= countdown)

    this.subcription = observable.subscribe(x => {
      if (x === countdown) {
        obj.innerHTML = '获取验证码'
        this.setState({
          active: false
        })
        return
      }
      obj.setAttribute('disabled', true)
      obj.innerHTML = '重新发送（' + (countdown - x) + 's)'
      if (!this.state.active) {
        this.setState({
          active: true
        })
      }
    })       
       
    registerVerify({
      token: this.state.token,
      verifyWay: this.state.type === 'phone' ? 0 : 1,
      verify: this.state.type === 'phone' ? this.state.phone : this.state.email
    }).then( res=> {
      if (res.data.msg === '200') {
        const { data: { result: { token, code } } } = res
        this.setState({
          code,
          token
        })
      }
           
    })
  }
  render() {
    const input = this.state.type === 'phone' ?
      <input type="text" name='phone' placeholder='输入手机号' 
        value={this.state.phone}
        onChange={this.inputChange} /> :
      <input type="email" name='email' placeholder='输入邮箱' 
        value={this.state.email} 
        onChange={this.inputChange} />
    const email = <div>
      <div>一封激活邮件已经发送到你的邮箱，</div>
      <div>请接收并按照邮件内提示完成激活操作。</div>
      <input type="submit" className='token-submit' value='完成注册' />
    </div>
    const phone = <div>
      <div>
                太好了，您已经完成注册，请用您刚才创建的账号登录本平台，
      </div>
      <div>
                感受精禾为您提供的科学精准服务吧。
      </div>
      <input type="submit" className='token-submit' value='开始登录' />
    </div>
    return (
      <div className='center'>
        <div className='register-content'>
          <div className='topbar'></div>
          <h2 className='register-title'>注册精禾云平台账号</h2>
          <div className='register-success-form center'>
            <div>
              <div className='success-tip'>
                <img src={success} />
                <span>就差一步了！</span>
              </div>
              <div className='success-token'>
                <div>
                                    你必须完成验证才能使用完整功能。
                </div>
                <div>
                                    可以从下面两种验证方式选择一种。
                </div>
                <div className='token-way'>
                  <a href='#' className={classNames({ 'center': true, 'token-active': this.state.type === 'phone' })}
                    type='phone'
                    onClick={this.changeValidate}>通过手机号验证</a>
                  <a href='#' className={classNames({ 'center': true, 'token-active': this.state.type === 'email' })}
                    type='email'
                    onClick={this.changeValidate}>通过E-mail验证</a>
                </div>
                {
                  (!this.state.phoneSuccess && !this.state.emailSuccess)  ? 
                    <form className='token-form' onSubmit={this.validateHandle}>
                      {input}
                      {this.state.type === 'email' ? undefined : <div className='token-code'>
                        <input type="text" name="waitCode" placeholder='验证码' 
                          value={this.state.waitCode} 
                          onChange={this.inputChange}/>
                        <a href="#" onClick={this.getCode} className={classNames({
                          'gary': this.state.active
                        })} >获取验证码</a>
                      </div>}
                      <input type="submit" className='token-submit' />
                    </form> 
                    : 
                    <form className='token-form-success' onSubmit={this.validateSuccess}>
                      {
                        this.state.type === 'phone' ? phone : email
                      }
                    </form>
                }
              </div>
            </div>
                   
          </div>
        </div>
      </div>
    )
  }
}
export default ValidateContent