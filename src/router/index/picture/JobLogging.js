import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { showList } from '_redux/actions/picture.js'

import 'css/index/picture/picture.scss'

import PictureLists from './PictureLists'
import AddLogger from './AddLogger'


import add from 'images/index/picture/add.png'

class JobLogging extends Component {
    constructor() {
        super()
        console.log(123)
        this.state = {
            imgs: [],
            logger: false,
            id: undefined
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
    
    close = (e) => {
        e.preventDefault()
        this.props.showList(false)
        this.closeLogger()
    }
    closeLogger = () => {
        this.setState({
            logger: false
        })
    }
    handleLogger = (e) => {
        e.preventDefault()
        if (!this.state.logger) {
            this.setState({
                logger: true
            })
        }
       
    }
    modifyLogger = (id) => {
        this.setState({
            id,
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
                        <label htmlFor="addLogger" onClick={this.handleLogger}>添加日志</label>
                        <img src={add} id='addLogger' onClick={this.handleLogger} alt="" />
                        <a href="#" className='closer' onClick={this.close}></a>
                    </div>

                </div>

                <div className='content'>
                    <PictureLists {...this.props} modifyLogger={this.modifyLogger}/>
                    {this.state.logger && <AddLogger {...this.props} close={this.closeLogger} id={this.state.id}/>}
                </div>
            </div> : null
        )
    }
}


JobLogging.propTypes = {
    picture: PropTypes.object,
    showList: PropTypes.func,
    feature: PropTypes.object
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(JobLogging)