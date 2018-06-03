import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import history from 'router/history'
import { forgetPass } from 'utils/Api'

class ForgetForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            verifyWay: '',
        }
        this.inputChange = this.inputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        const { username, verifyWay } = this.state
        var image = new FormData()
        image.append('username', username)
        image.append('verifyWay', verifyWay)
        forgetPass(image).then(res => res.data)
            .then(data => {
                if (data.msg === '200') {
                    history.push('/reset',{username: this.state.username})
                } else {
                    alert(data.result)
                }
            })
    }
    inputChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <div className='forget-from center'>
                <form onSubmit={this.handleSubmit}>
                    <div className='from-items'>
                        <label>用户名</label>
                        <div className='from-item'>
                            <input type="text" name='username' placeholder='请输入你的用户名' required
                                value={this.state.username}
                                onChange={this.inputChange} />
                            <span className={classNames({
                                'forget-prompt': true,
                            })}></span>
                        </div>
                      
                    </div>
                    <div className='from-items'>
                        <label>找回方式</label>
                        <div className='from-item'>
                            <div>
                                <div>
                                    <input type="radio" name="verifyWay" id="phone" value='0' onChange={this.inputChange} required/>
                                    <label htmlFor="phone">手机号找回</label> 
                                </div>
                                <div>
                                    <input type="radio" name="verifyWay" id="email" value='1' onChange={this.inputChange} required/>
                                    <label htmlFor="email">邮箱找回</label> 
                                </div>
                            </div>
                            <span className={classNames({
                                'forget-prompt': true,
                            })}>请选择你的找回方式</span>
                        </div>
                    </div>
                    <div className='from-items'>
                        <label></label>
                        <input type="submit" className='forget-submit' value='下一步' />
                    </div>
                </form>
            </div>

        )
    }
}
export default ForgetForm