import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scrollbar from 'smooth-scrollbar'
import Dropzone from 'react-dropzone'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { farmLandLogSave, findLogPhotoList, findLogPhotoById } from 'utils/Api'

// import FarmlandLogVo from './class/FarmlandLogVo'
import add from 'images/index/picture/+.png'

import { connect } from 'react-redux'
import { updateLists } from '_redux/actions/picture.js'

class AddLogger extends Component {
    constructor() {
        super()
        this.state = {
            files: [],
            startDate: moment(),
            content: '',
            submiting: false,
            
        }
    }
    componentDidMount() {
        const {id} = this.props
        if (id) {
            const fd = new FormData()
            fd.append('pageNo', '1')
            fd.append('pageSize', '-1')
            fd.append('logId', id)
            findLogPhotoById(fd).then(e => e.data)
                .then(data => console.log(data))
        }
        Scrollbar.init(this.logger)
    }
    compon
    handleChange = (date) => {
        console.log(date)
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
            .then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    return true
                }
            })
    }
    simple = () => {
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
        return farmLandLogSave(fd)
            .then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    return true
                }
            })
    }
    submit = (e) => {
        e.preventDefault()
        // this.upload(this.state.files)
        this.setState({
            submiting: true
        })
        const promise = this.state.files.map(file => this.upload(file))
        if (promise.length === 0) {
            promise.push(this.simple())
        }
        Promise.all(promise).then(e => {
            
            const res = e.reduce((a, b) => a && b) 
            if (res) {
                this.successCallback()



                const { feature } = this.props.feature
                const id = feature.getId().replace('tb_farmland.', '')
                const quarterCropsId = feature.get('quarterCropsId')
                const fd = new FormData()
                fd.append('pageNo', 1)
                fd.append('pageSize', 14)
                fd.append('landId', id)
                fd.append('quarterCropsId', quarterCropsId)
                findLogPhotoList(fd)
                    .then(e => e.data)
                    .then(data => {
                        if (data.msg === '200') {

                            const { list } = data.result
                            const { pageNo, cont, pageSize } = data.result

                            if (list) {
                                this.props.updateLists(list)
                                // this.setState({
                                //     list
                                // })
                            }
                            

                        }
                    })
                    
            }
            this.setState({
                submiting: false
            })
        })
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
                    // onClick: () => alert('Click Yes')
                },
                {
                    label: '取消',
                    onClick: () => this.props.close()
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
    deleteFileByIndex = (e) => {
        e.preventDefault()
        const index = e.target.getAttribute('data-index')
        this.setState({
            files: [
                ...this.state.files.splice(0, index),
                ...this.state.files.splice(index+1)
            ]
        })
    }
    render() {
        console.log(this.state.files)
        return (
            <div className='add-logger'>
                <form onSubmit={this.submit}>
                    <div className='input-group'>
                        <label htmlFor="date">日期：</label>
                        <DatePicker
                            dateFormat="YYYY-MM-DD"
                            selected={this.state.startDate}
                            onSelect={this.handleChange}
                        />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="logger"> 日志内容：</label>
                        <textarea name="logger" id="logger"  
                            value={this.state.content}
                            onChange={this.contentChange}/>
                    </div>
                    <div className='submit'>
                        <input type="submit" value={this.state.submiting?'保存中...':'保存'} disabled={this.state.submiting} />
                    </div>
                </form>
                <div className='logger-img' ref={logger => this.logger = logger}>
                    {
                        this.state.files.map((file, i) =>
                            <div key={i} className='logger-box preview' style={{ backgroundImage: `url(${file.preview})`}}>
                                {/* <img src={file.preview} alt="" /> */}
                                <a href="#" data-index={i} onClick={this.deleteFileByIndex}></a>
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
    feature: PropTypes.object,
    close: PropTypes.func,
    updateLists: PropTypes.func,
    id: PropTypes.string
}
const mapStateToProps = function (state) {
    return {
        picture: state.picture,
        feature: state.feature
    }
}
const mapDispatchToProps = function (dispath) {
    return {
        updateLists: (show) => {
            dispath(updateLists(show))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddLogger)