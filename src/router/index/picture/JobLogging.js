import React, { Component } from 'react'

import 'css/index/picture/picture.scss'

import PictureLists from './PictureLists'
import AddLogger from './AddLogger'


import add from 'images/index/picture/add.png'

class JobLogging extends Component {
    constructor() {
        super()
        this.state = {
            imgs: []
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

    close = (e) => {
        e.preventDefault()
    }
    render() {

        return (
            <div className='pictureLists'>
                <div className='title'>
                    <h3>山南良田11-23：作业日志</h3>
                    <div className='tools'>
                        <label htmlFor="addLogger">添加日志</label>
                        <img src={add} id='addLogger' alt=""/>
                        <a href="#" className='closer' onClick={this.close}></a>
                    </div>
                    
                </div>
                
                <div className='content'>
                    <PictureLists/>
                    <AddLogger/>
                </div>
            </div>
        )
    }
}

export default JobLogging