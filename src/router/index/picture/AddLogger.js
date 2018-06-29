import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scrollbar from 'smooth-scrollbar'
import Dropzone from 'react-dropzone'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { farmLandLogSave } from 'utils/Api'
import FarmlandLogVo from './class/FarmlandLogVo'
import add from 'images/index/picture/+.png'

class AddLogger extends Component {
    constructor() {
        super()
        this.state = {
            files: [],
            startDate: moment(),
            content: '',
        }
    }
    componentDidMount() {
        Scrollbar.init(this.logger)
    }
    handleChange = (date) => {
        this.setState({
            startDate: date
        })
    }
    contentChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    upload = (file) => {
        const { feature } = this.props.feature
        const id = feature.getId().replace('tb_farmland.', '')
        const quarterCropsId = feature.get('quarterCropsId')
        console.log(id, quarterCropsId)
        const fd = new FormData()

        fd.append('farmlandLogStr', JSON.stringify({
            quarterCropsId,
            landId: id,
            date: this.state.startDate.format('YYYY-MM-DD'),
            content: this.state.content
        }))

        fd.append('images', file)
        return farmLandLogSave(fd)
    }
    submit = (e) => {
        e.preventDefault()
        // this.upload(this.state.files)
        const promise = this.state.files.map(file => this.upload(file))
        // Axios.all(promise).then(e => e.data)
        // fd.append('farmlandLogStr', farmlandLogVo.toString())
        // 
        // console.log(file)
        // fd.append('images', file)
        // farmLandLogSave(fd)
        //     .then(e=>e.data)
        //     .then(data => {
        //         if (data.msg === '200') {
        //             this.successCallback()
        //         }
        //     })
    }
    successCallback() {
        confirmAlert({
            // title: 'Confirm to submit',
            message: '一条新的作业日志创建成功，要继续添加下一条日志吗？',
            buttons: [
                {
                    label: '继续添加日志',
                    onClick: () => alert('Click Yes')
                },
                {
                    label: '取消',
                    onClick: () => alert('Click No')
                }
            ]
        })
    }
    onDrop = (files, rejectFiles) => {
        if (rejectFiles.length > 1) {
            alert('上传文件错误，请重新上传')
            return
        }
        this.setState({
            files: [
                ...this.state.files,
                files[0]
            ]
        })
    }
    componentWillUpdate() {
        Scrollbar.destroy(this.logger)
    }
    componentDidUpdate() {
        Scrollbar.init(this.logger)
        // Scrollbar.init(this.logger)
        // Scrollbar.init()
    }
    render() {
        return (
            <div className='add-logger'>
                <form onSubmit={this.submit}>
                    <div className='input-group'>
                        <label htmlFor="date">日期：</label>
                        <DatePicker
                            dateFormat="YYYY-MM-DD"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="logger"> 日志内容：</label>
                        <textarea name="logger" id="logger" cols="30" rows="10" 
                            value={this.state.content}
                            onChange={this.contentChange}/>
                    </div>
                    <div className='submit'>
                        <input type="submit" value='保存' />
                    </div>
                </form>
                <div className='logger-img' ref={logger => this.logger = logger}>
                    {
                        this.state.files.map((file, i) =>
                            <div key={i} className='logger-box'>
                                <img src={file.preview} alt="" />
                            </div>)
                    }
                    <div className='logger-box'>
                        <Dropzone className='drop-zone' onDrop={this.onDrop} multiple={false}>
                            <img src={add} alt="" />
                            <label>添加照片</label>
                        </Dropzone>
                    </div>
                </div>
            </div>)
    }
}
AddLogger.propTypes = {
    feature: PropTypes.object
}
export default AddLogger