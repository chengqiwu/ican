import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import add from 'images/index/picture/+.png'
import { updateUserInfo, getUserBasicInfo, getUserInfo2 } from 'utils/Api'
class BasicInfo extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            address: '',
            companyName: '',
            companyLogo: undefined,
            file: undefined
        }
    }
    componentDidMount() {

        getUserInfo2()
            .then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    const {result} = data
                    this.setState({
                        name: result.name,
                        address: result.address,
                        companyName: result.companyName,
                        companyLogo: result.companyLogo
                    })
                } else {
                    alert('获取用户信息失误')
                }
            })
    }
    submit = (e) => {
        e.preventDefault()

        const userVo = {}
        userVo['name'] = this.state.name
        userVo['address'] = this.state.address
        userVo['companyName'] = this.state.companyName
        var fd = new FormData()

        fd.append('userVo', JSON.stringify(userVo))
        console.log(this.logo.files)
        this.logo.files && fd.append('companyLogo', this.state.file)
        updateUserInfo(fd)
            .then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    alert('保存成功')
                }
            })
    }
    onDrop = (files) => {
        this.setState({
            file: files[0],
            companyLogo: files[0].preview
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
                    <input type="text" disabled id='username' value={getUserBasicInfo().username}/>
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
                    <input type="text" id='companyName' name='companyName' value={this.state.companyName} onChange={this.changeValue}/>
                </div>
                <div className='input-group'>
                    <label htmlFor="companyLogo">单位LOGO：</label>
                    <img src={this.state.companyLogo} alt=""/>
                    <div className='logger-box'>
                        <Dropzone className='drop-zone' onDrop={this.onDrop} multiple={false}>
                            <img src={add} alt="" />
                            <label>添加公司logo</label>
                        </Dropzone>
                    </div>
                   
                </div>
                <div className='submit'>
                    <input type="submit" value='保存'/>
                </div>
            </form>
        </div>
    }
}
export default BasicInfo