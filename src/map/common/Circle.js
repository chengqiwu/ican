import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ol from 'openlayers'

import { connect } from 'react-redux'
import DragDrop from 'router/index/common/RxDragDrop'
import { showList, updateLists } from '_redux/actions/picture.js'
import circle from 'images/circle/circle.png'
import red from 'images/circle/red.png'
import blue from 'images/circle/blue.png'
import green from 'images/circle/green.png'
import purple from 'images/circle/purple.png'
import orange from 'images/circle/orange.png'

function deepCompare(x, y) {
    var i, l, leftChain, rightChain

    function compare2Objects(x, y) {
        var p

        // remember that NaN === NaN returns false
        // and isNaN(undefined) returns true
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true
        }

        // Compare primitives and functions.     
        // Check if both arguments link to the same object.
        // Especially useful on the step where we compare prototypes
        if (x === y) {
            return true
        }

        // Works in case when functions are created in constructor.
        // Comparing dates is a common scenario. Another built-ins?
        // We can even handle functions passed across iframes
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString()
        }

        // At last checking prototypes as good as we can
        if (!(x instanceof Object && y instanceof Object)) {
            return false
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false
        }

        if (x.constructor !== y.constructor) {
            return false
        }

        if (x.prototype !== y.prototype) {
            return false
        }

        // Check for infinitive linking loops
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false
        }

        // Quick checking of one object being a subset of another.
        // todo: cache the structure of arguments[0] for performance
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false
            } else if (typeof y[p] !== typeof x[p]) {
                return false
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false
            } else if (typeof y[p] !== typeof x[p]) {
                return false
            }

            switch (typeof (x[p])) {
            case 'object':
            case 'function':

                leftChain.push(x)
                rightChain.push(y)

                if (!compare2Objects(x[p], y[p])) {
                    return false
                }

                leftChain.pop()
                rightChain.pop()
                break

            default:
                if (x[p] !== y[p]) {
                    return false
                }
                break
            }
        }

        return true
    }

    if (arguments.length < 1) {
        return true//Die silently? Don't know how to handle such case, please help...
        // throw "Need two or more arguments to compare";
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = [] //Todo: this can be cached
        rightChain = []

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false
        }
    }

    return true
}


const images = [red, blue, green, purple, orange]
const means = ['更多', '生长日志',  '田地信息', '种植计划', '天气']

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr]
    } else {
        return getComputedStyle(obj, false)[attr]
    }
}
// 获取Extent的中心
function getCenterOfExtent(Extent) {
    var X = Extent[0] + (Extent[2] - Extent[0]) / 2
    var Y = Extent[1] + (Extent[3] - Extent[1]) / 2
    return [X, Y]
}
// p1, p2的长度的一半
function radius(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1])) / 2
}
// 增加一个img
function drawImage(imageUrl) {
    const img = new Image()
    img.src = imageUrl
    return img
}
// 根据path得到Extent
function getBound(path) {
    let points = [...path[1]]
    let points2 = [...path[1]]

    path.map(point => {
        points[0] = (points[0] < point[0] ? points[0] : point[0])
        points[1] = (points[1] < point[1] ? points[1] : point[1])

        points2[0] = (points2[0] > point[0] ? points2[0] : point[0])
        points2[1] = (points2[1] > point[1] ? points2[1] : point[1])
    })
    return [points, points2]
}
// 画圆 
// 角度，半径，圆心点， 索引值， 比例
function arc(o, dir, point, index, bili, self) {
    const target = document.getElementById('target')
    let element = null
    Array.from(document.getElementsByClassName('ol-overlay-container')).forEach(ele => {
        if (ele.children[0].firstChild.id === 'target') {
            element = ele
        }
    })
    const points = [point[0] - Number.parseFloat(element.style.left), point[1] - Number.parseFloat(element.style.top)]
    const π = Math.PI
    const test = [(dir * 1.26) * Math.cos(o * π / 180).toFixed(2) + points[0], points[1] - (dir * 1.26) * Math.sin(o * π / 180).toFixed(2)]
    const div = document.createElement('DIV')
    div.style.left = (test[0] - 115 * bili / 2) + 'px'
    div.style.top = (test[1] - 115 * bili / 2 - 2 ) + 'px'
    const img = drawImage(images[index])
    img.style.width = 115 * bili + 'px'
    img.style.cursor = 'pointer'
    img.setAttribute('alt', means[index])
    img.setAttribute('index', index)
    div.style.height = 115 * bili + 'px'
    img.style.borderRadius = 115 * bili / 2 + 'px'
    div.style.borderRadius = 115 * bili / 2 + 'px'
    div.appendChild(img)
    const alt = document.createElement('div')
    alt.innerHTML = means[index]
    alt.className = 'alt hiden'
    if (index === 0) {
        alt.style.bottom = 130 * bili + 'px'
    } else if (index === 1 || index === 2){
        alt.style.right = 130 * bili + 'px'
    } else {
        alt.style.left = 130 * bili + 'px'
    } 
    if (index === 4) {
        alt.style.textAlign = 'left'
    }
    div.appendChild(alt)
    img.onclick = self.handler.bind(self, index)
    target.appendChild(div)
}

class Circle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feature: null,
            box: [],
        }
    }
    componentDidMount() {
        const { map } = this.props.map
        console.log(map)
        // circle
        this.circleOverlay = new ol.Overlay({
            element: this.circle,
            positioning: 'center-center',
            stopEvent: false
        })
        map.addOverlay(this.circleOverlay)


        map.on('click', (evt) => {
            const target = evt.originalEvent.target
            if (target.tagName === 'IMG' && target.getAttribute('index')) {    
                return
            }
            const feature = map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => layer && feature)
            if (feature && feature.getId()) {
               
                if (!deepCompare(feature, this.state.feature)){
                    this.setState({
                        feature
                    })
                  
                }
                this.circle && this.circle.setAttribute('class', 'circle')

                setTimeout(() => {
                    this.circle && this.circle.removeAttribute('class')
                }, 1000)
                this.drawCircle(feature)
            } else {
                console.log(evt)
                this.circleOverlay.setPosition(undefined)
            }
        })

        map.getView().on('change:resolution', () => {
            const { feature } = this.state
            if (!feature) {
                return
            }
            this.circleOverlay.getPosition() && this.drawCircle(feature)
            
        })

        this.circle.onclick = (e) => {
            this.drawCircle(this.state.feature)
        }
    }
    componentWillUnmount() {
        this.circleOverlay.setPosition(undefined)
    }
    drawCircle(feature) {
        const { map } = this.props.map
        var features = feature.getGeometry().getCoordinates()[0]
        if (features.length === 1) {
            features = features[0]
        }
        const paths = features.map(e =>{
            return map.getPixelFromCoordinate(e)
        })
        console.log(paths)
        const points = getBound(paths)
        const dir = radius(points[0], points[1])
        this.setState({
            feature
        })
        const bili = dir * 3 / 667
        this.img.style.width = dir * 3 + 'px'
        this.circleOverlay.setPosition(getCenterOfExtent(feature.getGeometry().getExtent()))
        const point = [(points[0][0] + points[1][0]) / 2, (points[0][1] + points[1][1]) / 2]
        // 数量
        const n = 5
        const o = 360 / n
        // 默认有一个始终从-90度开始
        const arr = [90]
        for (let i = 1; i < n; i++) {
            arr.push(arr[i - 1] + o)
        }

        // 
        const myNode = document.getElementById('target')
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild)
        }
        // 画div

        arr.map((o, index) => {
            arc(o, dir, point, index, bili, this)
        })
    }
    handler(index, e) {
        console.dir(e)
        e.preventDefault()
        e.stopPropagation()
        if (index === 1) {
            console.log(index)
            this.props.showList(true)
            return
        }
        const { box } = this.state
        const feature = this.state.feature
        const res = []
        box.forEach(b => {
            if(b.index !== index && b.key !== feature.getId() + index) {
                res.push(b)
            }
        })
        res.push({
            key: feature.getId() + index,
            index
        })
        // 假设为信息
        this.setState({
            box: res
        })
    }
    destory(key) {
        const { box } = this.state
        this.setState({
            box: box.filter(b => b.key !== key)
        })
    }
    render() {
        return (
            <div ref={mess => this.mess = mess}>
                <div className='circle' ref={circle => this.circle = circle}>
                    <div id='target'></div>
                    <img ref={img => this.img = img} src={circle} />

                </div>
                {
                    this.state.box.map(b => 
                        <DragDrop key={b.key}
                            name={this.props.feature.feature.get('name')}
                            feature={this.state.feature}
                            title={means[b.index]} 
                            destory={this.destory.bind(this, b.key)} 
                            index={b.index}></DragDrop>                  
                    ) 
                        
                }
            </div>
            
        )
    }
}
Circle.propTypes = {
    map: PropTypes.object,
    feature: PropTypes.object,
    showList: PropTypes.func
}
const mapStateToProps = (state) => {
    return {
        map: state.map,
        feature: state.feature
    }
}
const mapDispatchToProps = function (dispath) {
    return {
        showList: (show) => {
            dispath(showList(show))
        },
        updateLists: (update) => {
            dispath(updateLists(update))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Circle)