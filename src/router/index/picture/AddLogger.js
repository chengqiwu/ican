import React, { Component } from 'react'
import Scrollbar from 'smooth-scrollbar'
import Dropzone from 'react-dropzone'

import picture from 'images/circle/blue.png'
import add from 'images/index/picture/+.png'
class AddLogger extends Component {
    constructor() {
        super()
        this.state = {
            files: []
        }
    }
    componentDidMount() {
        Scrollbar.init(this.logger)
    }
    submit = (e) => {
        e.preventDefault()
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
        console.log(this.state.files)
        this.lists = [
            { id: 1, url: picture },
            { id: 2, url: picture },
            { id: 3, url: picture },
            { id: 4, url: picture },
            { id: 5, url: picture },
            { id: 6, url: picture },
            { id: 7, url: picture },
            { id: 8, url: picture },
            { id: 9, url: picture },
            { id: 10, url: picture },
            { id: 11, url: picture },
            { id: 12, url: picture },
            { id: 13, url: picture },
            { id: 14, url: picture },
            { id: 15, url: picture },
            { id: 16, url: picture },
            { id: 17, url: picture },
            { id: 18, url: picture },
            { id: 19, url: picture },
            { id: 20, url: picture },
            { id: 21, url: picture },
            { id: 22, url: picture },
            { id: 23, url: picture },
            { id: 24, url: picture },
            { id: 25, url: picture },
            { id: 26, url: picture },
            { id: 27, url: picture },
            { id: 28, url: picture },
            { id: 29, url: picture },
            { id: 30, url: picture },
            { id: 31, url: picture },
            { id: 32, url: picture },
        ]
        return <div className='add-logger'>
            <form onSubmit={this.submit}>
                <div className='input-group'>
                    <label htmlFor="date">日期：</label>
                    <input type="date" name='data' id='date' />
                </div>
                <div className='input-group'>
                    <label htmlFor="logger"> 日志内容：</label>
                    <textarea name="logger" id="logger" cols="30" rows="10"></textarea>
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
                    <Dropzone className='drop-zone' onDrop={this.onDrop}>
                        <img src={add} alt="" />
                        <label>添加照片</label>
                    </Dropzone>
                </div>
            </div>
        </div>
    }
}

export default AddLogger