import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classnames from 'classnames'
import camera from 'images/index/picture/camera.png'
import edit from 'images/index/picture/edit.png'
import delete1 from 'images/index/picture/trash.png'

function getCss(curEle, attr){
  var val = null, reg = null
  if ('getComputedStyle' in window) {
    val = window.getComputedStyle(curEle, null)[attr]
  } else {   //ie6~8不支持上面属性  
    //不兼容  
    if (attr === 'opacity') {
      val = curEle.currentStyle['filter']   //'alpha(opacity=12,345)'  
      reg = /^alphaopacity=(\d+(?:\.\d+)?)opacity=(\d+(?:\.\d+)?)$/i
      val = reg.test(val) ? reg.exec(val)[1] / 100 : 1
    } else {
      val = curEle.currentStyle[attr]
    }
  }
  reg = /^(-?\d+(\.\d)?)(px|pt|em|rem)?$/i
  return reg.test(val) ? parseFloat(val) : val
}
class List extends Component {
  constructor() {
    super()
    this.state = {
      after: false
    }
  }
  componentDidMount() {
    this.updateAfter()    
  }
  componentDidUpdate() {
    this.updateAfter()
  }
  updateAfter() {
    const after = getCss(this.content, 'height') === 40
    if (after === this.state.after) {
      return
    }
    this.setState({
      after
    })
  }
  // deleteLandLog = (e) => {
  //   e.preventDefault()
  //   this.props.delete(this.props.list.id)
  // }
  render() {
    const {list} = this.props
    return (
      <div className='listItems'>
        <div className='item'>
          <div>
            <div className='date'>
              {moment(new Date(list.date)).format('YYYY年MM月DD日')}  
              <img src={edit} alt="" onClick={this.props.showList.bind(this, list)}/></div>
            <div className={classnames({
              'log-content': true,
              'after': this.state.after
            })} ref={content => this.content = content}>{list.content}</div>
          </div>
          {
            list.imageCount !== '0' &&  <div className='imgs' onClick={e => this.props.show(list)}>
              <span>{list.imageCount}</span>
              <img src={camera} alt="" />
            </div>
          }
                   
        </div>
        {/* <div className='delete'>
          <a href='#' onClick={this.deleteLandLog}></a>
        </div> */}
      </div>
    )
  }
}
List.propTypes = {
  list: PropTypes.object,
  showList: PropTypes.func,
  show: PropTypes.func,
  delete: PropTypes.func
}
export default List