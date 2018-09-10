import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import AvatarEditor from 'react-avatar-editor'
import user from 'images/common/userDefault.png'
import { updateIcon, getUserIcon, dataUrlToBlob } from 'utils/Api'
import { connect } from 'react-redux'
import { getUserInfo } from '_redux/actions/user'
function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1])
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: mimeString })
}

class HeadPortrait extends Component {
  constructor() {
    super()
    console.log(getUserIcon())
    this.state = {
      imgURL: getUserIcon(),
      scale: 1,
      canvas: undefined,
      loaded: false
    }
  }
  preview = (files, reject) => {
    if (reject.length >= 1) {
      toast.error('上传文件格式有错，请重新上传', {
        position: toast.POSITION.BOTTOM_CENTER,
        pauseOnHover: false,
        hideProgressBar: true,
      })
      return
    }
    const file = files[0]
    this.filename = file.name
    this.type = file.type
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
    const canvas = this.editor.getImage().toDataURL(this.type)
    this.setState({
      canvas
    })
  }
  loadSuccess = () => {
    const canvas = this.editor.getImage().toDataURL()
    this.setState({
      canvas,
      loaded: true
    })
  }
  loadFailture = (e) => {
    console.log(e)
    this.setState({
      imgURL: user
    })
  }
  submit = (e) => {
    e.preventDefault()
    var fd = new FormData()
    var blob = dataURItoBlob(this.state.canvas)
    fd.append('ican', blob, this.filename)
    updateIcon(fd).then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          toast.success('保存成功', {
            autoClose: 2000,
          })
          this.props.getUserInfo()
        }
      })
  }
  render() {
    console.log('HeadPortrait render')
    return <div className='head-portrait'>
      <form className='preview' onSubmit={this.submit}>
        {this.state.loaded ?
          <img src={this.state.canvas} alt="" /> :
          <div style={{ justifyContent: 'center' }}>加载中...</div>
        }
        <div>
          <input type="button" value='更改' onClick={this.upload} />
          <input type="submit" value='保存' />
        </div>
      </form>

      <div className='imgUpload'>
        <div>
          <Dropzone
            className='drop-zone'
            ref={dropzone => this.dropzone = dropzone}
            onDrop={this.preview}
            disableClick={!!this.state.imgURL ? true : false}
            accept="image/jpeg,image/jpg,image/png"
            style={{ width: '380px', height: '250px' }}
          >
            <AvatarEditor
              ref={editor => this.editor = editor}
              width={200}
              height={200}
              image={this.state.imgURL}
              crossOrigin={'anonymous'}
              className={!this.state.loaded ? 'hiden' : ''}
              onImageReady={e => console.log(e)}
              onLoadSuccess={this.loadSuccess}
              onLoadFailure={this.loadFailture}
              // onImageReady={this}
              // onImageChange={this.imageChange}
              scale={Number(this.state.scale)}
              border={[90, 20]}
            />
            <div className={this.state.loaded ? 'hiden' : ''}>加载中...</div>
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
HeadPortrait.propTypes = {
  getUserInfo: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    getUserInfo: function () {
      dispatch(getUserInfo())
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(HeadPortrait)


