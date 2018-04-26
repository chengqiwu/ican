import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { farmLandSave, getPosition } from '../utils/Api.js'
import ol from 'openlayers'
import { connect } from 'react-redux'
import 'css/index/common/createFiled.scss'
import 'css/map/popup1.scss'

import { saveFeature, setFeature } from '_redux/actions/feature'
class CreateField extends Component {
    constructor() {
        super()
        this.state = {
            position: undefined
        }
        this.submitHandle = this.submitHandle.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.closeClick = this.closeClick.bind(this)
    }
    componentDidMount() {
        this.overlay = new ol.Overlay({
            element: this.popup,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            },
            stopEvent: true
        })
        this.props.map.map.addOverlay(this.overlay)
        this.load()
        this.closer.onclick = this.closeClick
        this.clear.onclick = this.clearHandler.bind(this)
        
        

        var geoc = new BMap.Geocoder()

        var pt = ol.proj.transform(this.props.coord, 'EPSG:3857', 'EPSG:4326')
        console.log(pt)
        geoc.getLocation(new BMap.Point(...pt), (rs) => {
            const { province = '', city = '', distract ='' } = rs.addressComponents
            this.position.value = `${province} ${city} ${distract}`
        })
        
    }
    clearHandler(e) {
        e.preventDefault()
        this.props.setDefault()
        this.props.sourceClear()
    }
    componentDidUpdate() {
        this.load()
        
    }
    componentWillUnmount() {
        this.overlay = null
        
    }
    load() {
        const { coord } = this.props
        this.overlay.setPosition(coord)
    }
    closeClick(e) {
        e.preventDefault()
        this.overlay.setPosition(undefined)
        this.closer.blur()
        this.props.setInitial()
    }
    changeInput(e) {
        e.preventDefault()
        this.setState({
            name: e.target.value
        })
    }
    submitHandle(e) {
        e.preventDefault()
        console.log(e.target)
        const id = this.props.feature.feature.get('id')
        // 圈地
        const geojson = new ol.format.GeoJSON()
        const farmLandInfo = {
            name: this.input.value,
            geom: geojson.writeGeometry(this.props.feature.feature.getGeometry(), {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            }),
            address: this.position.value
        }
        farmLandSave({
            farmLandInfo: JSON.stringify(farmLandInfo)
        }).then(res => res.data).then(data => {
            console.log(data)
            if (data.msg === '200') {
                this.props.setFeature({
                
                    name: this.input.value,
                    id: data.result,
                    growthStatus: 0
                    
                })
                this.props.feature.feature.set('address', this.position.value)
                this.props.feature.feature.set('area', this.props.area)
                this.props.feature.feature.set('status', '1')
                this.props.drawText()
                this.input.value = ''
                
            } else {
                data.msg === '209'
                alert(data.result+ ' ，请重绘。。。')
            }
        })
        this.props.setDefault()

    }
    render() {
        const area = this.props.area 
        return (
            <div ref={popup => this.popup = popup} className="ol-popup">
                <a href="#" id='close' className="ol-popup-closer"
                    ref={closer => this.closer = closer}></a>
                <div className="popup-content">
                    <form onSubmit={this.submitHandle}>
                        <input required type="text" className='ppfix post email' name='name' ref={input => this.input = input} />
                        <div>
                            <label>位置：</label><input type="text" style={{ border: 'none' }} disabled ref={position => this.position = position} />
                        </div>
                        <div>面积：{area.acre} 亩 / {area.hectare} 公顷</div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <button className='button blue'>保存</button>                     
                            <a href='#' className='button blue' ref={clear => this.clear = clear} >清除</a>
                        </div>
                    </form>
                </div>
            </div>
            
        )
    }
  
}

CreateField.propTypes = {
    area: PropTypes.object,
    setFeature: PropTypes.func,
    geom: PropTypes.string,
    map: PropTypes.object,
    coord: PropTypes.array,
    drawText: PropTypes.func,
    feature: PropTypes.object,
    setDefault: PropTypes.func,
    setInitial: PropTypes.func,
    sourceClear: PropTypes.func
}
const mapStateToProps = (state) => {
    return {
        map: state.map,
        feature: state.feature
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        setFeature: (feature) => {
            dispatch(setFeature(feature))
        }
    }
}
export default connect(mapStateToProps, mapDispathToProps)(CreateField)