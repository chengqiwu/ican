import React, { Component } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import tools from 'images/common/tools.png'
import 'css/index/common/tools.scss'
import ol from 'openlayers'

import zoomin from 'images/tools/zoomins.png'
import zoomout from 'images/tools/zoomouts.png'
import position from 'images/tools/position.png'
import search from 'images/tools/search.png'
import play from 'images/tools/play.png'
import arrow from 'images/tools/arrow.png'

import lyrs from '_redux/init/lyrs'

function flyTo(view, location, done) {
    var duration = 3000
    var zoom = view.getZoom()
    var parts = 2
    var called = false
    function callback(complete) {
        --parts
        if (called) {
            return
        }
        if (parts === 0 || !complete) {
            called = true
            done(complete)
        }
    }
    view.animate({
        center: location,
        duration: duration
    }, callback)
    view.animate({
        zoom: zoom - 1,
        duration: duration / 2
    }, {
        zoom: 15,
        duration: duration / 2
    }, callback)
}

class Tools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tools: false,
            mapLists: false,
            currentMap: null
            // maps: maps
        }
        this.showTools    = this.showTools.bind(this)
        this.showMapLists = this.showMapLists.bind(this)
        this.zoomOut = this.zoomOut.bind(this)
        this.zoomIn = this.zoomIn.bind(this)
        this.getPosition = this.getPosition.bind(this)
        this.serach = this.serach.bind(this)
    }
    componentDidMount() {
        lyrs.forEach(lyr => {
            lyr.active && this.setState({
                currentMap: lyr.url
            })
        })
    }
    showTools() {
        this.setState({
            tools: !this.state.tools
        })
    }
    showMapLists() {
        this.setState({
            mapLists: !this.state.mapLists
        })
    }
    changeLayer(lyr) {
        console.log(lyr)

        const { map } = this.props.map
        lyrs.forEach(lyr => lyr.active = false)
        lyr.active = true
        this.setState({
            currentMap: lyr.url,
            mapLists: false
        })
        map.getLayers().getArray().forEach(lyr => {
            lyr.getPreload && map.removeLayer(lyr)
        })
        lyrs.forEach(lyr => {
            lyr.active && lyr.lyrs.forEach(ly =>  {
                map.addLayer(ly)
                ly.setZIndex(-1)
            })
        })
    }
    zoomIn() {
        const { map } = this.props.map
        const view = map.getView()
        const zoom = view.getZoom()
        view.animate({
            zoom: zoom + 1,
            duration: 1000
        })
    }
    zoomOut() {
        const { map } = this.props.map
        const view = map.getView()
        const zoom = view.getZoom()
        view.animate({
            zoom: zoom-1,
            duration: 1000
        })
    }
    getPosition() {
        const self = this
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function(r){
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                console.log([r.point.lng, r.point.lat])
                self.props.map.map.getView().animate({
                    center: ol.proj.transform([r.point.lng, r.point.lat], 'EPSG:4326', 'EPSG:3857'),
                    duration: 2000,
                    zoom: 14
                })
            }
            else {
                alert('failed' + this.getStatus())
            }
        }, { enableHighAccuracy: true })
    }
    serach(e) {
        e.preventDefault()
        const {map} = this.props.map
        const view = map.getView()
        const value = this.serachInput.value
        // ol.proj.fromLonLat([-0.12755, 51.507222])
        if (value.match(/[\u4E00-\u9FA5]+/g)) {
            console.log(value)
            var myGeo = new BMap.Geocoder()
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(value, function (pos) {
                if (pos) {
                    console.log([pos.lng, pos.lat])
                    flyTo(view, ol.proj.transform([pos.lng, pos.lat], 'EPSG:4326', 'EPSG:3857'), function () { })

                } else {
                    // alert()
                }
            })
        } else {
            const pos = this.parseLonLat(value)
            if (pos.length === 0) {
                alert('输入经纬度不正确，请重新输入经纬度或输入地名')
            } else {
                flyTo(view, ol.proj.transform(pos, 'EPSG:4326', 'EPSG:3857'), function () { })
            } 
        }
        
       

    }
    parseLonLat(value) {
        var reg_lngLat = /^[\-\+]?(((\d|([1-9]\d)|(1[0-7]\d))(\.\d*)?)|(180))[, ，]\s*[\-\+]?(((\d|([1-8]\d))(\.\d*)?)|(90))$/
        var reg_latLng = /^[\-\+]?(((\d|([1-8]\d))(\.\d*)?)|(90))[, ，]\s*[\-\+]?(((\d|([1-9]\d)|(1[0-7]\d))(\.\d*)?)|(180))$/

        if (value.match(reg_lngLat)) {
            value = value.replace(/\s+/g, ' ')
            let result = value.split(' ')
            console.log(result)
            if (result.length === 2) {
                return ([
                    Number.parseFloat(result[0]),
                    Number.parseFloat(result[1])
                ])
            } else {
                result = value.split(',')
                if (result.length == 2) {
                    return ([
                        Number.parseFloat(result[0]),
                        Number.parseFloat(result[1])
                    ])
                } else {
                    result = value.split('，')
                    if (result.length == 2) {
                        return ([
                            Number.parseFloat(result[0]),
                            Number.parseFloat(result[1])
                        ])
                    }
                }
            }

        }
        if (value.match(reg_latLng)) {
            value = value.replace(/\s+/g, ' ')
            let result = value.split(' ')
            if (result.length === 2) {
                return ([
                    Number.parseFloat(result[1]),
                    Number.parseFloat(result[0])
                ])
            } else {
                result = value.split(',')
                if (result.length == 2) {
                    return ([
                        Number.parseFloat(result[1]),
                        Number.parseFloat(result[0])
                    ])
                } else {
                    result = value.split('，')
                    if (result.length == 2) {
                        return ([
                            Number.parseFloat(result[0]),
                            Number.parseFloat(result[1])
                        ])
                    }
                }
            }

        }
        return []
    }
    render() {
        return (
            <div className='showTools'>
                <div className={classnames({
                   
                    tools: true,
                    hiden: !this.state.tools,
                })}>
                    <form className='search' onSubmit={this.serach}>
                        <input type="text" className='ppfix post' name='serachInput'
                            ref={serachInput => this.serachInput = serachInput} placeholder='请输入坐标(以逗号隔开)或地名'/>
                        <button style={{border: 'none'}}>
                            <img src={search} alt="" className='btnHover'/>
                        </button>
                        
                    </form>
                    <div className='tools-map'>
                        <div onClick={this.zoomOut} className='btnHover'>
                            <img src={zoomout} alt=""/>
                        </div>
                        <div onClick={this.zoomIn} className='btnHover'>
                            <img src={zoomin} alt=""/>
                        </div>
                        <div className='btnHover'>
                            <img src={position} alt=""  onClick={this.getPosition}/>
                        </div>
                    </div>
                    <div className='changeLayer'>
                        <img className='arrow' src={arrow} alt=""  onClick={this.showMapLists}/>
                        
                        <img className='currentMap' style={{ width: '50px'}}  ref={currentMap => this.currentMap = currentMap} src={this.state.currentMap}/>
                        
                        <ul className={classnames({
                            'map-lists': true,
                            'hiden': !this.state.mapLists
                        })}>
                            {
                                lyrs.map((lyr, i) => !lyr.active && (
                                    <li key={lyr.id}>
                                        <img style={{width: '50px'}} src={lyr.url} alt={lyr.id}  onClick={this.changeLayer.bind(this, lyr)}/>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <img src={play} alt="" onClick={this.showTools} className='btnHover'/>
                </div>
               
                <img src={tools} className={classnames({
                    hiden: this.state.tools,
                    'btnHover': true
                })} alt="" onClick={this.showTools}/>
            </div>
        )
    }
}
Tools.propTypes = {
    map: PropType.object
}
const mapStateToProps = (state) => {
    return {
        map: state.map
    }
}
export default connect(mapStateToProps)(Tools)