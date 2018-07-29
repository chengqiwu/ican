import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Item extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      content: ''
    }
  }
  componentDidMount() {
    console.log(this.props.file)
    this.setState({
      name: this.props.file.name,
      content: this.props.file.describe || ''
    })  
    this.props.describe({
      name: this.props.file.name,
      content: ''
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
        
      const {file, url} = this.props
      return (
        <div>
          <div className='logger-box preview' style={{ backgroundImage: `url(${url})` }}>
            {/* <img src={file.preview} alt="" /> */}
            <a href="#" data-index={this.props.id} onClick={this.props.delete}></a>
          </div>
          <input type="text" 
            ref={input => this.input = input}
            placeholder='图片描述' 
            onBlur={this.handBlur}
            value={this.state.content}
            onChange={this.handleChange}/>
        </div>
      )
    }
}
Item.propTypes = {
  url: PropTypes.string,
  file: PropTypes.object,
  delete: PropTypes.func,
  id: PropTypes.string,
  describe: PropTypes.func
}
export default Item