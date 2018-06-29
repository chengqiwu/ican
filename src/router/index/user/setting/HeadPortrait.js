import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import user from 'images/common/userDefault.png'
import { updateIcon, getUserInfo2 } from 'utils/Api'

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
            imgURL: user,
            scale: 1,
            canvas: undefined
            // radius: 0
        }
    }
    componentDidMount() {
        getUserInfo2()
            .then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    const {result} = data
                    this.setState({
                        imgURL: result.icon
                    })
                } else {
                    alert('获取用户信息失误')
                }
            })
    }
    preview = (files, reject) => {
        if (reject.length > 1) {
            alert('上传文件格式有错，请重新上传')
            return
        }
        const file = files[0]
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
        this.dropzone.open()
    }
    changeInput = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    imageChange = () => {
        if (!this.state.imgURL) {
            return
        }
        const canvas = this.editor.getImage().toDataURL()
        this.setState({
            canvas
        })
    }
    submit = (e) => {
        e.preventDefault()
        var fd = new FormData()
        // console.log(this.state.canvas.toDataURL())
        var blob = dataURItoBlob(this.state.canvas)
        fd.append('ican', blob, 'image.png')
        updateIcon(fd).then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    alert('保存成功')
                }
            })
    }
    render() {
        console.log('HeadPortrait render')
        return <div className='head-portrait'>
            <form className='preview' onSubmit={this.submit}>
                <img src={this.state.canvas} alt=""/>
                <div>
                    <input type="button" value='上传' onClick={this.upload}/>
                    <input type="submit" value='保存' />
                </div>
                
            </form>

            <div className='imgUpload'>
                
                <div>
                    <Dropzone ref={dropzone => this.dropzone = dropzone}
                        onDrop={this.preview}
                        disableClick={!!this.state.imgURL ? true : false}
                        accept="image/jpeg,image/jpg,image/png"
                        style={{ width: '380px', height: '250px' }}
                    >
                        <AvatarEditor
                            ref={editor=>this.editor=editor}
                            width={200}
                            height={200}
                            image={this.state.imgURL}
                            onLoadSuccess={this.imageChange}
                            // onImageReady={this}
                            scale={Number(this.state.scale)}
                            border={[90, 20]}
                        />
                    </Dropzone >
                    <div className='avatarTools'>
                        <div>
                            <label htmlFor="scale">缩放：</label>
                            <input type="range" step="0.01" min="1" max="2" name="scale"
                                value={this.state.scale}
                                onChange={this.changeInput} />
                        </div>
                        {/* <input type="range" step="1" min="1" max="50" name="radius"
                            value={this.state.radius}
                            onChange={this.changeInput} /> */}
                        <div className='preview' onClick={this.imageChange}>刷新预览</div>
                    </div>

                </div>
               
            </div>
            
        </div>
    }
}
export default HeadPortrait


