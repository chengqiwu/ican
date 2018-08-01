import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import history from 'router/history'
import { blowfish } from 'utils/tools'
import { resetPass } from 'utils/Api'
import success from 'images/register/success.png'
class ResetForm extends Component {
  constructor(props) {
    super(props)
        
    this.state = {
      username: '',
      password: '',
      repassword: '',
      code: '',
      success: false,
      count: 3
    }
    this.inputChange = this.inputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    // console.log(history.location)
        
    let username = sessionStorage.getItem('username')
    if (!username) {
      history.push('/')
      return
    }
    this.username.value = username
  }
  handleSubmit(e) {
    e.preventDefault()
    const { username, password, repassword, code } = this.state
    if (password !== repassword) {
      alert('两次密码输入不正确')
      return
    }
    var image = new FormData()
    image.append('username', this.username.value)
    image.append('password', blowfish(password))
    image.append('code', code)
    resetPass(image).then(res => res.data)
      .then(data => {
        if (data.msg === '200') {
          this.setState({
            success: true
          })
          this.clock()
        } else{
          alert(data.result)
        }
      })

  }
  clock() {
    this.timer = setInterval(() => {

      this.setState(prevState => ({
        count: prevState.count - 1
      }))
      !this.state.count && clearInterval(this.timer)
      !this.state.count && this.callback()

    }, 1000)
  }
  inputChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  callback() {
    history.push('/')
  }
  render() {
    return (
      !this.state.success ?
        <div className='reset-from center'>
          <form onSubmit={this.handleSubmit}>
            <div className='verification-code '>
              <label>验证码</label>
              <div className='center'>
                <input type="text" name='code' value={this.state.code} onChange={this.inputChange} 
                  required style={{ marginRight: '10px', padding: '11px 20px'}}/>
                <span className={classNames({
                  'reset-prompt': true,
                })}>请输入上一步操作收到的验证码</span>
              </div>
            </div>
            <div className='from-items'>
              <label>用户名</label>
              <div className='from-item'>
                <input type="text" name='username' placeholder='用户名' required
                  disabled ref={username => this.username = username} />
                <span className={classNames({
                  'reset-prompt': true,
                })}>由汉字、英文字母、数字或下划线组成，首字符不能为数字和特殊字符。6-24位，一个汉字占两个字符。</span>

              </div>
            </div>
            <div className='from-items'>
              <label>新密码</label>
              <div className='from-item'>
                <input type="password" name='password' placeholder='********' required
                  value={this.state.password}
                  onChange={this.inputChange} />
                <span className={classNames({
                  'reset-prompt': true,
                })}>由英文字母、数字或英文特殊字符组成，6-24位。</span>
              </div>

            </div>
            <div className='from-items'>
              <label>确认新密码</label>
              <div className='from-item'>
                <input type="password" name='repassword' placeholder='********' required
                  value={this.state.repassword}
                  onChange={this.inputChange} />
              </div>
            </div>
                        
            <div className='from-items' style={{marginTop: '20px'}}>
              <label></label>
              <input type="submit" className='reset-submit' value='重置密码' />
            </div>
          </form>
                
        </div>
        :
        <div className='reset-success-form center'>
          <div>
            <div className='success-tip'>
              <img src={success} alt=""/>
              <span>恭喜你,密码重置成功</span>
            </div>
            <div className='success-token'>
              <button onClick={this.callback}>跳转登录页面</button>
                            自动跳转倒计时{this.state.count}
            </div>
          </div>
        </div>
    )
  }
}
ResetForm.propTypes = {
  history: PropTypes.object
}
export default ResetForm