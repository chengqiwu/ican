import React, {Component} from 'react'
import { updateUserInfo, getUserName } from 'utils/Api'
class BasicInfo extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            address: '',
            companyName: '',
            
        }
    }
    submit = (e) => {
        e.preventDefault()

        const userVo = {}
        userVo[name] = this.state.name
        userVo[address] = this.state.address
        userVo[companyName] = this.state.companyName
        var fd = new FormData()

        fd.append('userVo', JSON.stringify(userVo))
        this.logo.file && fd.append('companyLogo', this.logo.file[0])
        updateUserInfo(fd)
            .then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    alert('保存成功')
                }
            })
    }
    changeValue = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    render() {
        return <div className='info'>
            <form onSubmit={this.submit}>
                <div className='input-group'>
                    <label htmlFor="username">用户名：</label>
                    <input type="text" disabled id='username' value={getUserName()}/>
                </div>
                <div className='input-group'>
                    <label htmlFor="name">真实姓名：</label>
                    <input type="text" id='name' name='name' value={this.state.name} onChange={this.changeValue}/>
                </div>
                <div className='input-group'>
                    <label htmlFor="address">通讯地址：</label>
                    <input type="text" id='address' name='address' value={this.state.address} onChange={this.changeValue}/>
                </div>
                <div className='input-group'>
                    <label htmlFor="companyName">单位名称：</label>
                    <input type="text" id='companyName' name='companyName' value={this.state.company} onChange={this.changeValue}/>
                </div>
                <div className='input-group'>
                    <label htmlFor="companyLogo">单位LOGO：</label>
                    <input type="file" ref={logo => this.logo = logo}/>
                </div>
                <div className='submit'>
                    <input type="submit" value='保存'/>
                </div>
            </form>
        </div>
    }
}
export default BasicInfo