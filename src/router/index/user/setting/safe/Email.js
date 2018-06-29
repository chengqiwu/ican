import React, { Component } from 'react'
import { updateContact, getUserEmail, updateContactSuccess } from 'utils/Api'
class Email extends Component {
    constructor() {
        super()
        this.state = {
            email: getUserEmail(),
            modify: false,
            success: false
        }
    }
    changeValue = (e) => {
        this.setState({
            email: e.target.value
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
        fd.append('verifyWay', 1)
        fd.append('verify', this.state.email)
        updateContact(fd)
            .then(e=> e.data)
            .then(data => {
                if (data.msg === '200') {
                    this.setState({
                        success: true
                    })
                    setTimeout(() => this.setState({
                        success: false,
                        // modify: false
                    }), 1000)
                }
            })
        
    }
    submit = (e) => {
        updateContactSuccess().then(e => console.log(e))
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
                    <label htmlFor="email">邮箱：</label>
                    <input type="email" disabled={!this.state.modify} name="email" id="email"
                        value={this.state.email}
                        onChange={this.changeValue} />
                    {!this.state.modify ?
                        <div className='noModify'><a href="#" onClick={this.activeModify}>更改</a></div>
                        : <div className='modify'>
                            <a href="#" onClick={this.getCode}>发送邮箱验证</a>
                            {/* <input type="text" name='code' className='code' placeholder='输入验证码' />
                            <input type="submit" value="保存" className='submit' />*/}
                            <input type="button" value="取消" className='submit' onClick={this.cancel}/> 
                        </div>
                    }
                    {this.state.success && <div className='tips'>发送成功!!</div>}
                </div>

            </form>
        )

    }
}

export default Email