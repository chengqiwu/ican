import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { showList, updateLists } from '_redux/actions/picture.js'

import 'css/index/picture/picture.scss'

import PictureLists from './PictureList.jsx'
// import AddLogger from './AddLogger'
import RxDragDrop from './RxDragDrop'

import add from 'images/index/picture/add.png'

class JobLogging extends Component {
  constructor() {
    super()
    this.state = {
      imgs: [],
      logger: false,
      log: {}
    }
  }
  componentDidMount() {  
        
    // 
    //用firefox变量表示火狐代理
    // var firefox = navigator.userAgent.indexOf('Firefox') != -1
    // function MouseWheel(e) {//阻止事件冒泡和默认行为的完整兼容性代码
    //     console.log(e)
    //     e = e || window.event
    //     if (e.stopPropagation) {//这是取消冒泡
    //         e.stopPropagation()
    //     } else {
    //         e.cancelBubble = true
    //     };
    //     if (e.preventDefault) {//这是取消默认行为，要弄清楚取消默认行为和冒泡不是一回事
    //         e.preventDefault()
    //     } else {
    //         e.returnValue = false
    //     };
    // }
    // // var con = document.getElementById('content')//要在content内部滚动，而页面不受影响，所以这里获取要滚动的对象
    // //如果是ff就绑定DOMMouseScroll事件，其他浏览器就用onmousewheel事件触发
    // firefox ? this.pictureLists.addEventListener('DOMMouseScroll', MouseWheel, false) : (this.pictureLists.onmousewheel = MouseWheel)
  }
  componentDidUpdate() {
    this.jobLogging && this.jobLogging.scrollIntoView(true)
      
  }
  shouldComponentUpdate(nextProps) {
    const { feature } = nextProps.feature
    if (!feature.getId()) {
      return false
    }
    return true
  }
    close = (e) => {
      e.preventDefault()
      this.closeLogger()
      this.props.showList(false)
        
    }
    closeLogger = () => {
      this.setState({
        logger: false
      })
    }
    handleLogger = (e) => {
      e.preventDefault()
       
      this.setState({
        logger: true,
           
      })
       
    }
    modifyLogger = (log) => {
      this.setState({
        log: JSON.parse(log),
        logger: true
      })
    }
    render() {
      const {show} = this.props.picture
      return (
        show ? <div className='pictureLists' ref={jobLogging => this.jobLogging = jobLogging}>
          <div className='title'>
            <h3>{this.props.feature.feature.get('name')}：作业日志</h3>
            <div className='tools'>
              {/* <label htmlFor="addLogger" onClick={this.handleLogger}>添加日志</label> */}
              <img src={add} id='addLogger' onClick={this.handleLogger} alt="" />
              <a href="#" className='closer' onClick={this.close}></a>
            </div>

          </div>

          <div className='content'>
            <PictureLists {...this.props} modifyLogger={this.modifyLogger}/>
            {this.state.logger && <RxDragDrop  {...this.props} title='新建日志' close={this.closeLogger} log={this.state.log}/>}
          </div>
        </div> : null
      )
    }
}


JobLogging.propTypes = {
  picture: PropTypes.object,
  showList: PropTypes.func,
  feature: PropTypes.object,
  updateLists: PropTypes.func
}

const mapStateToProps = function (state) {
  return {
    picture: state.picture,
    feature: state.feature
  }
}
const mapDispatchToProps = function (dispath) {
  return {
    showList: (show) => {
      dispath(showList(show))
    },
    updateLists: (list) => {
      dispath(updateLists(list))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(JobLogging)