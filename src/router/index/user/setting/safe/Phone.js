import React, { Component } from 'react'
import Rx from 'rxjs/Rx'
import { toast } from 'react-toastify'
import { blowfish } from 'utils/tools'
import { updateContact, updateContactSuccess, getUserInfo2, validatePassword } from 'utils/Api'
class Phone extends Component {
  constructor() {
    super()
    this.state = {
      phone: '',
      modify: false,
      code: '',
      pending: false,
      countdown: 60,
      success: false,
      passwordVer: false,
      password: ''
    }
  }
  componentDidMount() {
    getUserInfo2().then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          this.setState({
            phone: data.result.phone || ''
          })
        }
      })
  }
    changeValue = (e) => {
      const { name, value } = e.target
      this.setState({
        [name]: value
      })
    }
    activePassword = (e) => {
      e.preventDefault()
      this.setState({
        passwordVer: true
      })
    }
    activeModify = (e) => {
      e.preventDefault()
      this.setState({
        modify: true
      })
    }
    getCode = (e) => {
      e.preventDefault()
      var fd = new FormData()
      fd.append('verifyWay', 0)
      fd.append('verify', this.state.phone)
      updateContact(fd)
        .then(e => e.data)
        .then(data => {
          if (data.msg === '200') {
            this.code = data.result
            this.setState({
              pending: true
            })

            const countdown = 60
            let observable = Rx.Observable.interval(1000)
              .takeWhile(x => x <= countdown)

            this.subcription = observable.subscribe(x => {
              if (x === countdown) {
                this.setState({
                  pending: false,
                  countdown: 60
                })
                this.subcription.unsubscribe()
                return
              }
              this.setState({
                countdown: this.state.countdown - 1
              })
            })

          }
        })
    }
    submit = (e) => {
      e.preventDefault()

      if (this.state.code === this.code) {
        var fd = new FormData()
        fd.append('verifyWay', 0)
        fd.append('verify', this.state.phone)
        updateContactSuccess(fd)
          .then(e => e.data)
          .then(data => {
            if (data.msg === '200') {
              toast.success('密码修改成功', {
                autoClose: 1000
              })
              this.setState({
                success: true
              })
              setTimeout(() => this.setState({
                success: false,
                modify: false
              }), 1000)
            }
          })
      } else {
        this.setState({
          code: ''
        })
      }
        
    }
    cancel = (e) => {
      this.setState({
        modify: false
      })
    }
    vailPassword = (e) => {
      e.preventDefault()
      if (!this.state.password) {
        toast.info('请输入密码')
        return
      }
      const fd = new FormData()
      fd.append('password', blowfish(this.state.password))
      validatePassword(fd)
        .then(e => e.data)
        .then(data => {
          if (data.msg === '200') {
            if (data.result === 'true') {
              toast.success('密码验证成功', {
                autoClose: 2000
              })
              this.setState({
                modify: true,
                passwordVer: false,
                password: ''
              })
            } else {
              this.setState({
                password: ''
              })
            }
          }
        })
    }
    render() {
      return (
        this.state.passwordVer ?
          <form onSubmit={this.vailPassword}><div className="box">
            <label htmlFor="password">验证密码：</label>
            <input type="password" id='password' name='password' value={this.state.password} onChange={this.changeValue} />
            <div className="modify">
              <button className='submit'>验证</button>
            </div>
          </div>
          </form> :
          <form onSubmit={this.submit}>
            <div className='box'>
              <label htmlFor="phone">手机：</label>
              <input type="text" disabled={!this.state.modify} name="phone" id="phone"
                value={this.state.phone}
                onChange={this.changeValue} />
              {!this.state.modify ?
                <div className='noModify'><a href="#" onClick={this.activePassword}>更改</a></div>
                : <div className='modify'>
                  <input type="text" name='code' className='code' value={this.state.code}
                    onChange={this.changeValue} />
                  {
                    !this.state.pending ?
                      <a href="#" onClick={this.getCode}>获取手机验证码</a> :
                      <a href="#" onClick={e => e.preventDefault()}>重新获取（{this.state.countdown}s）</a>
                  }
                  <input type="submit" value="保存" className='submit' />
                  <input type="button" value="取消" className='submit' onClick={this.cancel} />

                </div>
              }
              {/* {this.state.success && <div className='tips'>操作成功!!</div>} */}
            </div>
          </form>
      )
      
    }
}

export default Phone