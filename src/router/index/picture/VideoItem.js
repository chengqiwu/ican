import React, { Component } from 'react'
import trash from 'images/index/picture/trash.png'
import PropTypes from 'prop-types'
import { Player } from 'video-react'

class VideoItem extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      content: '',
      id: '',
      idDescribe: false
    }
  }
  componentDidMount() {
    this.setState({
      id: this.props.id,
      name: this.props.video.name,
      content: this.props.video.describe || '',
      idDescribe: !(this.props.video instanceof File)
    })
    this.props.describe({
      id: this.props.id,
      name: this.props.video.name,
      content: this.props.video.describe || '',
      idDescribe: !(this.props.video instanceof File)
    })
  }
  handBlur = () => {
    this.props.describe(this.state)
  }
  handleChange = (e) => {
    this.setState({
      content: e.target.value
    })
  }
  render() {
    const {url} = this.props
    return ( 
      <div>
        <div className='logger-box preview'>
          <Player
            // fluid={false}
            // width={875}
            // height={}
            src={url} />
          <div className='trash'>
            <img src={trash} alt="" data-index={this.props.id} onClick={this.props.delete} />
          </div>
        </div>
        <input type="text"
          ref={input => this.input = input}
          placeholder='视频描述'
          onBlur={this.handBlur}
          value={this.state.content}
          onChange={this.handleChange} />
      </div>
    )
  }
}
VideoItem.propTypes = {
  url: PropTypes.string,
  video: PropTypes.object,
  delete: PropTypes.func,
  id: PropTypes.string,
  describe: PropTypes.func
}
export default VideoItem