import React, { Component } from 'react'
import Rx from 'rxjs/Rx'
import { updateContact, getUserPhone, updateContactSuccess } from 'utils/Api'
class Phone extends Component {
    constructor() {
        super()
        this.state = {
            phone: getUserPhone(),
            modify: false,
            code: '',
            pending: false,
            countdown: 60,
            success: false
        }
    }
    changeValue = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
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
                                pending: false
                            })
                            this.subcription.unsubscribe()
                            return
                        }
                        this.setState({
                            countdown: this.state.countdown - 1
                        })
                    })

                } else {
                    alert('获取验证码失败，请稍后重试')
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
            alert('输入验证码不正确，请重新输入')
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
    render() {
        return (
            <form onSubmit={this.submit}>
                <div className='box'>
                    <label htmlFor="phone">手机：</label>
                    <input type="text" disabled={!this.state.modify} name="phone" id="phone"
                        value={this.state.phone}
                        onChange={this.changeValue} />
                    {!this.state.modify ?
                        <div className='noModify'><a href="#" onClick={this.activeModify}>更改</a></div>
                        : <div className='modify'>
                            <input type="text" name='code' className='code' value={this.state.code}
                                onChange={this.changeValue}/>
                            {
                                !this.state.pending ?
                                    <a href="#" onClick={this.getCode}>获取手机验证码</a> :
                                    <a href="#" onClick={e => e.preventDefault()}>重新获取（{this.state.countdown}s）</a>
                            }
                            <input type="submit" value="保存" className='submit'/>
                            <input type="button" value="取消" className='submit' onClick={this.cancel}/>
                          
                        </div>
                    }
                    {this.state.success && <div className='tips'>操作成功!!</div>}
                </div>

            </form>
        )
        
    }
}

export default Phone