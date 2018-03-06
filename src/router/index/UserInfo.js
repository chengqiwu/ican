import React, { Component } from 'react'
import 'css/index/famers/addFamers.scss'
import {updateUserInfo, getUserInfo} from 'utils/Api'

class AddFamers extends Component {
    constructor(props) {
        super(props)
        const userInfo = getUserInfo()
        console.log(userInfo)
        this.state = {
            name: userInfo.username,
            password: '',
            phone: userInfo.phone,
            address: ''
        }
        this.closeClick = this.closeClick.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
    }
    closeClick(e) {
        e.preventDefault()
        console.log('close')
        this.closer.blur()
    }
    inputChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    formSubmit(e) {
        e.preventDefault(0)
        console.log('form submit!')
        const userInfo = {
            password: this.state.password,
            phone: this.state.phone,
            name: this.state.name,
            address: this.state.address
        }
        
        const formData = new FormData()
        formData.append('icon', this.icon.files[0])
        formData.append('userVo', JSON.stringify(userInfo))
        updateUserInfo(formData).then(res=>console.log(res))
    }
    render() {
        return (
            <form ref={form => this.form = form} onSubmit={this.formSubmit} encType="multipart/form-data">
                <div className='icon'>
                    <label htmlFor="icon">上传头像</label>
                    <input type="file" name="icon" id='icon' ref={icon => this.icon = icon}/>
                </div>
                <div className='inputGroup'>
                    <div>
                        <label>姓名：</label>
                        <input type="text" name='loginName' value={this.state.name} onChange={this.inputChange}/>

                    </div>
                    <div>
                        <label>密码：</label>
                        <input type="password" name='password' value={this.state.password} onChange={this.inputChange}/>
                    </div>
                    <div>
                        <label>联系电话：</label>
                        <input type="number" name='phone' value={this.state.phone} onChange={this.inputChange}/>
                    </div>
                    <div>
                        <label>常用住址：</label>
                        <input type="text" name='address' value={this.state.address} onChange={this.inputChange}/>
                    </div>
                    <div className='form-button'>
                        <input type="submit" value="更新"/>
                    </div>
                </div>
                
            </form>
            // </Popup>
        )
    }
}

export default AddFamers