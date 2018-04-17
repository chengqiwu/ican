import React, { Component } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import tools from 'images/common/tools.png'
import 'css/index/common/tools.scss'
import ol from 'openlayers'

import zoomin from 'images/tools/zoomin.png'
import zoomout from 'images/tools/zoomout.png'
import position from 'images/tools/position.png'
import search from 'images/tools/search.png'
import play from 'images/tools/play.png'
import arrow from 'images/tools/arrow.png'

import lyrs from '_redux/init/lyrs'

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
            map.removeLayer(lyr)
        })
        console.log(lyr, lyrs)
        lyrs.forEach(lyr => {
            lyr.active && lyr.lyrs.forEach(ly => map.addLayer(ly))
        })
    }
    zoomIn() {
        const { map } = this.props.map
        const view = map.getView()
        const zoom = view.getZoom()
        view.setZoom(zoom + 1)
    }
    zoomOut() {
        const { map } = this.props.map
        const view = map.getView()
        const zoom = view.getZoom()
        view.setZoom(zoom - 1)
    }
    getPosition() {
        const { map } = this.props.map
        const view = map.getView()
        const zoom = view.getZoom()
        view.setZoom(zoom + 1)
    }
    serach(e) {
        e.preventDefault()
        const {map} = this.props.map
        const view = map.getView()
        const value = this.serachInput.value
        // ol.proj.fromLonLat([-0.12755, 51.507222])
        const pos = this.parseLonLat(value)
        if(pos.length === 0) {
            alert('输入经纬度不正确，请重新输入经纬度')
        }
        view.animate({
            center: ol.proj.transform(pos, 'EPSG:4326', 'EPSG:3857'),
            duration: 2000,
            zoom: 10
        })

    }
    parseLonLat(value) {
        var reg_lngLat = /^[\-\+]?(((\d|([1-9]\d)|(1[0-7]\d))(\.\d*)?)|(180))[,][\-\+]?(((\d|([1-8]\d))(\.\d*)?)|(90))$/
        var reg_latLng = /^[\-\+]?(((\d|([1-8]\d))(\.\d*)?)|(90))[,][\-\+]?(((\d|([1-9]\d)|(1[0-7]\d))(\.\d*)?)|(180))$/

        if (value.match(reg_lngLat)) {
            let result = value.split(' ')
            if (result.length === 2) {
                return ([
                    Number.parseFloat(result[0]),
                    Number.parseFloat(result[1])
                ])
            } else {
                result = value.split(',')
                console.log(result)
                if (result.length == 2) {
                    return ([
                        Number.parseFloat(result[0]),
                        Number.parseFloat(result[1])
                    ])
                }
            }

        }
        if (value.match(reg_latLng)) {
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
                        <input type="text" className='ppfix post'  
                            ref={serachInput => this.serachInput = serachInput} placeholder='请输入坐标(以逗号隔开)或地名'/>
                        <button style={{border: 'none'}}>
                            <img src={search} alt="" style={{ cursor: 'pointer' }}/>
                        </button>
                        
                    </form>
                    <div className='tools-map'>
                        <div onClick={this.zoomOut} style={{cursor: 'pointer'}}>
                            <img src={zoomout} alt=""/>
                        </div>
                        <div onClick={this.zoomIn} style={{ cursor: 'pointer' }}>
                            <img src={zoomin} alt=""/>
                        </div>
                        <div>
                            <img src={position} alt="" onClick={this.getPosition}/>
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
                    <img src={play}  alt="" onClick={this.showTools}/>
                </div>
               
                <img src={tools} className={classnames({
                    hiden: this.state.tools
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