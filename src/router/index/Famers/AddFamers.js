import React, { Component } from 'react'
import 'css/index/famers/addFamers.scss'
import PropTypes from 'prop-types'

import { addFarmers, updateFarmers } from 'utils/Api'
import Popup from '../Popup'
class AddFamers extends Component {
    constructor(props) {
        super(props)
        const list = props.list
        console.log(list)
        this.state = {
            loginName: list ? list.loginName : '',
            password: list ? list.password : '',
            repassword: '',
            name: list ? list.name : '',
            phone: list ? list.phone : '',
            address: list ? list.address : '',
            title: list ? '更新种植户' : '添加种植户'
        }
        this.inputChange = this.inputChange.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
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
        !this.props.list && addFarmers(formData)
        this.props.list && updateFarmers(formData)
    }
    render() {
        return (
            <Popup title={this.state.title} hiden={this.props.hiden} fadeHiden={this.props.fadeHiden}>
                <form className='from' onSubmit={this.formSubmit} encType="multipart/form-data">
            
                    <div className='icon'>
                        <label htmlFor="icon">上传头像</label>
                        <input type="file" name="icon" id='icon' ref={icon => this.icon = icon}/>
                    </div>
                    <div className='inputGroup'>
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
                            <input className='save-next' type="submit" value='保存 | 分配田地 >'/>
                        </div>
                    </div>
                </form>
            </Popup>
        )
    }
}
AddFamers.propTypes = {
    hiden: PropTypes.bool,
    fadeHiden: PropTypes.func,
    list: PropTypes.object
}
export default AddFamers