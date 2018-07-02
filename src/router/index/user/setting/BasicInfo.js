import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import add from 'images/index/picture/+.png'
import { updateUserInfo, getUserBasicInfo, getUserInfo2 } from 'utils/Api'
class BasicInfo extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            username: '',
            address: '',
            companyName: '',
            companyLogo: undefined,
            file: undefined
        }
    }
    componentDidMount() {
        console.log(this.props)
        const {user} = this.props
        this.setState({
            username: user.username,
            name: user.name,
            address: user.address,
            companyName: user.companyName,
            companyLogo: user.companyLogo
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
        fd.append('companyLogo', this.state.file)
        updateUserInfo(fd)
            .then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    alert('保存成功')
                }
            })
    }
    onDrop = (files) => {
        const file = files[0]
        // console.log(file.size)
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
                    <input type="text" disabled id='username' value={this.state.username}/>
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
                    <div className='company-logo'>
                        <img src={this.state.companyLogo} alt="" />
                    </div>
                    
                    <div>
                        <div className='logger-box'>
                            <Dropzone className='drop-zone' onDrop={this.onDrop} multiple={false}>
                                <img src={add} alt="" />
                                <label>添加公司logo</label>
                            </Dropzone>
                        </div>
                        <div className='tip'>1、png或jpg格式</div>
                        <div className='tip'>2、文件大小不超过300KB</div>
                        <div className='tip'>3、建议尺寸：256像素×128像素</div>
                    </div>
                </div>
                <div className='submit'>
                    <input type="submit" value='保存'/>
                </div>
            </form>
        </div>
    }
}

BasicInfo.propTypes = {
    user: PropTypes.object
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispathToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispathToProps)(BasicInfo)