import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ol from 'openlayers'

import { connect } from 'react-redux'
import DragDrop from 'router/index/common/RxDragDrop'

import circle from 'images/circle/circle.png'
import red from 'images/circle/red.png'
import blue from 'images/circle/blue.png'
import green from 'images/circle/green.png'
import purple from 'images/circle/purple.png'
import orange from 'images/circle/orange.png'



const images = [red, blue, green, purple, orange]
const means = ['更多', '田地照片',  '田地信息', '种植计划', '天气']

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
    div.style.height = 115 * bili + 'px'
    div.style.borderRadius = 115 * bili / 2 + 'px'
    div.appendChild(img)
    const alt = document.createElement('div')
    alt.innerHTML = means[index]
    alt.className = 'alt'
    if (index === 0) {
        alt.style.bottom = 120 * bili + 'px'
    } else if (index === 1 || index === 2){
        alt.style.right = 120 * bili + 'px'
    } else {
        alt.style.left = 120 * bili + 'px'
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
            box: []
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
            const feature = map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => layer && feature)
            if (feature && feature.get('id')) {
                this.setState({
                    feature
                })

                this.drawCircle(feature)
            }
        })
        map.getView().on('change:resolution', () => {

            const { feature } = this.state
            if (!feature) {
                return
            }
            this.drawCircle(feature)
        })
    }
    drawCircle(feature) {
        const { map } = this.props.map
        const paths = (feature.getGeometry().getCoordinates()[0]).map(e => map.getPixelFromCoordinate(e))
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
    handler(key) {
        const { box } = this.state
        box.push(key)
        // 假设为信息
        this.setState({
            box
        })
    }
    destory(index) {
        console.log(index)
        this.setState({
            box: [
                ...this.state.box.slice(0, index),
                ...this.state.box.slice(index + 1)
            ]
        })
    }
    render() {
        console.log(this.state.box)
        return (
            <div ref={mess => this.mess = mess}>
                <div ref={circle => this.circle = circle}>
                    <div id='target'></div>
                    <img ref={img => this.img = img} src={circle} />

                </div>
                {
                    this.state.box.map((index, i) => 
                        <DragDrop key={i} title={means[index]} destory={this.destory.bind(this, i)} index={index}>
                            
                        </DragDrop>  )
                }
            </div>
            
        )
    }
}
Circle.propTypes = {
    map: PropTypes.object
}
const mapStateToProps = (state) => {
    return {
        map: state.map
    }
}
export default connect(mapStateToProps)(Circle)