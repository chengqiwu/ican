import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'

import { updateIcon } from 'utils/Api'

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1])
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length)
    var ia = new Uint8Array(ab)
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], {type: mimeString})
}

class HeadPortrait extends Component {
    constructor() {
        super()
        this.state = {
            imgURL: undefined,
            scale: 1,
            canvas: undefined
            // radius: 0
        }
    }
    preview = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
            const dataURL = reader.result
            this.setState({
                imgURL: dataURL
            })
        }
        reader.readAsDataURL(file)
    }
    upload = () => {
        this.file.click()
    }
    changeInput = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    imageChange = () => {
        const canvas = this.editor.getImage().toDataURL()
        this.setState({
            canvas
        })
    }
    submit = (e) => {
        e.preventDefault()
        var fd = new FormData()
        var blob = dataURItoBlob(this.state.canvas)
        fd.append('ican', blob)
        updateIcon(fd).then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    alert('保存成功')
                }
            })
    }
    render() {
        return <div className='head-portrait'>
            <form className='preview' onSubmit={this.submit}>
                <img src={this.state.canvas} alt=""/>
                <div>
                    <input type="button" value='上传' onClick={this.upload}/>
                    <input type="submit" value='保存' />
                </div>
                
            </form>

            <div className='imgUpload'>
                {
                    !this.state.imgURL ? 
                        <div className='tips' onClick={this.upload}>
                            上传新头像
                        </div> :
                        <div>
                            <Dropzone
                                onDrop={this.handleDrop}
                                disableClick
                                style={{ width: '350px', height: '150px' }}
                            >
                                <AvatarEditor
                                    ref={editor=>this.editor=editor}
                                    width={310}
                                    height={100}
                                    image={this.state.imgURL}
                                    scale={Number(this.state.scale)}
                                    borderRadius={this.state.radius}
                                />
                            </Dropzone >
                            <div className='avatarTools'>
                                缩放：<input type="range" step="0.01" min="1" max="2" name="scale"
                                    value={this.state.scale}
                                    onChange={this.changeInput} />
                            </div>
                            <div className='preview' onClick={this.imageChange}>预览</div>
                            {/* <input type="range" step="1" min="1" max="50" name="radius"
                                value={this.state.radius}
                                onChange={this.changeInput} /> */}
                        </div>
                      
                }
                <input type="file" className='file' ref={file => this.file = file} onChange={this.preview}/>
            </div>
            
        </div>
    }
}
export default HeadPortrait


