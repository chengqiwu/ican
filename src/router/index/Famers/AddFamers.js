import React, { Component } from 'react'
import 'css/index/famers/addFamers.scss'
import { addFarmers, updateFarmers } from 'utils/Api'
class AddFamers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginName: '',
            password: '',
            repassword: '',
            name: '',
            phone: '',
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
        const farmersInfo = {
            loginName: this.state.loginName,
            password: this.state.password,
            phone: this.state.phone,
            name: this.state.name,
            address: this.state.address
        }
        const formData = new FormData()
        formData.append('icon', this.icon.files[0])
        formData.append('farmersInfo', JSON.stringify(farmersInfo))
        addFarmers(formData)
    }
    render() {
        return (<div id='container' className="popup">
            <div className='popup-title'>
                <h4>添加种植户</h4>
                <a href="#" className="popup-closer"
                    onClick={this.closeClick}
                    ref={closer => this.closer = closer}></a>
            </div>
            
            <div className="popup-content">
                <div className='icon'>
                    <label htmlFor="icon">上传头像</label>
                    <input type="file" name="icon" id='icon' ref={icon => this.icon = icon}/>
                </div>
                <form className='from' onSubmit={this.formSubmit}>
                    <div>
                        <label>登录名：</label>
                        <input type="text" name='loginName' value={this.state.loginName} onChange={this.inputChange}/>

                    </div>
                    <div>
                        <label>密码：</label>
                        <input type="text" name='password' value={this.state.password} onChange={this.inputChange}/>
                    </div>
                    <div>
                        <label>确认密码：</label>
                        <input type="text" name='repassword' value={this.state.repassword} onChange={this.inputChange}/>
                    </div>
                    <div>
                        <label>真实姓名：</label>
                        <input type="text" name='name' value={this.state.name} onChange={this.inputChange}/>
                    </div>
                    <div>
                        <label>联系电话：</label>
                        <input type="text" name='phone' value={this.state.phone} onChange={this.inputChange}/>
                    </div>
                    <div>
                        <label>常用住址：</label>
                        <input type="text" name='address' value={this.state.address} onChange={this.inputChange}/>
                    </div>
                    <div className='form-button'>
                        <input className='save' type="submit" value='保存' />
                        <input className='save-next' type="submit" value='保存|分配田地 >'/>
                    </div>
                </form>
            </div>
        </div>)
    }
}

export default AddFamers