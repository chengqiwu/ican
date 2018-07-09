import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'css/index/picture/top.scss'
import { findLogPhotoById } from 'utils/Api'
class Top extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            activeList: {}
        }
    }
    componentDidMount() {
        this.getInfo(this.props.logger)
        this.index = 0

    }
    componentDidUpdate() {
        console.log('componentDidUpdate')
        if (this.state.list.length > 0) {
            const self = this
            function G(s) {
                return document.getElementById(s)
            }

            function getStyle(obj, attr) {
                if (obj.currentStyle) {
                    return obj.currentStyle[attr]
                } else {
                    return getComputedStyle(obj, false)[attr]
                }
            }

            function Animate(obj, json) {
                if (obj.timer) {
                    clearInterval(obj.timer)
                }
                obj.timer = setInterval(function () {
                    for (var attr in json) {
                        var iCur = parseInt(getStyle(obj, attr))
                        iCur = iCur ? iCur : 0
                        var iSpeed = (json[attr] - iCur) / 5
                        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
                        obj.style[attr] = iCur + iSpeed + 'px'
                        if (iCur == json[attr]) {
                            clearInterval(obj.timer)
                        }
                    }
                }, 30)
            }

            var oPic = G('picBox')
            var oList = G('listBox')
            
            var oPrev = G('prev')
            var oNext = G('next')
            var oPrevTop = G('prevTop')
            var oNextTop = G('nextTop')

            var oPicLi = oPic.getElementsByTagName('li')
            console.dir(oPic.clientWidth)
            const arr = [].slice.call(oPicLi)
            arr.forEach(li => {
                li.style.width = oPic.clientWidth + 'px'
            })
            
            var oListLi = oList.getElementsByTagName('li')
            var len1 = oPicLi.length
            var len2 = oListLi.length

            var oPicUl = oPic.getElementsByTagName('ul')[0]
            var oListUl = oList.getElementsByTagName('ul')[0]
            var w1 = oPicLi[0].offsetWidth
            var w2 = oListLi[0].offsetWidth

            oPicUl.style.width = w1 * len1 + 'px'
            // oListUl.style.width = w2 * len2 + 'px'
            oList.style.width = this.state.list.length * 220 + 20 + 'px'
            var index = 0

            var num = 5
            var num2 = Math.ceil(num / 2)

            function Change() {
                Animate(oPicUl, { left: - index * w1 })

                if (index < num2) {
                    Animate(oListUl, { left: 0 })
                } else if (index + num2 <= len2) {
                    Animate(oListUl, { left: - (index - num2 + 1) * w2 })
                } else {
                    Animate(oListUl, { left: - (len2 - num) * w2 })
                }

                for (var i = 0; i < len2; i++) {
                    oListLi[i].className = ''
                    if (i == index) {
                        oListLi[i].className = 'on'
                        self.describe.innerHTML =  self.state.list[index].describe

                    }
                }
            }

            oNextTop.onclick = oNext.onclick = function () {

                index++
                
                index = index == len2 ? 0 : index
                console.log(index)
                Change()
            }
            oPrevTop.onclick = oPrev.onclick = function () {

                index--
                index = index == -1 ? len2 - 1 : index
                Change()
            }
            for (var i = 0; i < len2; i++) {
                oListLi[i].index = i
                oListLi[i].onclick = function () {
                    index = this.index
                    Change()
                }
            }
        }
    }
    getInfo = (logger) => {
        const fd = new FormData()
        fd.append('pageNo', '1')
        fd.append('pageSize', '-1')
        fd.append('logId', logger.id)
        findLogPhotoById(fd).then(e => e.data)
            .then(data => {
                if (data.msg === '200') {
                    const { list } = data.result
                    if (list) {
                        this.setState({
                            list,
                            activeList: list[0]
                        })
                    }

                }

            })
    }
    render() {
        const { logger} = this.props
        return (
            <div className='modal'>
                <span className="close" onClick={e => this.props.closer()}>×</span>
                <div className='caption'>
                    [{moment(new Date(logger.date)).format('YYYY年MM月DD日')}] {logger.content}
                    <div className='describe' ref={describe => this.describe = describe}>
                        {this.state.activeList.describe}
                    </div>
                    
                </div>
                <div className="mod18">
                    
                    <span id="prevTop" className="btn prev"></span>
                    <span id="nextTop" className="btn next"></span>
                    <div id="picBox" className="picBox">
                        <ul className="cf">
                            {this.state.list.map(list => <li key={list.id}>
                                <img src={list.largeThumbnailPath} alt={list.describe} />
                            </li>)}
                        </ul>
                    </div>
                    <div id="listBox" className="listBox">
                        <span id="prev" className="btn prev"></span>
                        
                        <ul className="cf">
                            {this.state.list.map((list, i) => <li key={list.id} className={i === 0 ? 'on' : ''}>
                                <i className="arr2" ></i>
                                <img src={list.smallThumbnailPath} alt={list.describe} />
                            </li>)}
                            {/* <li className="on">
                                <i className="arr2"></i>
                                <img src={undefined} alt="" />
                            </li> */}
                        </ul>
                        <span id="next" className="btn next"></span>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>)
    }
}
Top.propTypes = {
    closer: PropTypes.func,
    logger: PropTypes.object
}
export default Top