import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { farmLandSave } from 'utils/Api.js'
import ol from 'openlayers'
import { connect } from 'react-redux'
import { saveFeature, setFeature } from '_redux/actions/feature'
import 'css/map/polygon.scss'
import CreateField from './CreateField'
import Rx from 'rxjs/Rx'
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr]
    } else {
        return getComputedStyle(obj, false)[attr]
    }
}
function getCenterOfExtent(Extent) {
    var X = Extent[0] + (Extent[2] - Extent[0]) / 2
    var Y = Extent[1] + (Extent[3] - Extent[1]) / 2
    return [X, Y]
}
class Polygon extends Component {
    constructor() {
        super()
        this.state = {
            initial: false,
            coord: [],
            area: null,    // 选中feature的面积
            feature: null
        }
    }
    componentDidMount() {
        this.load(this.props)
        Rx.Observable.fromEvent(document, 'keydown')
            .filter(e => e.keyCode === 27)
            .map(e => true)
            .subscribe(flag => {
                if (flag && this.draw.getActive()) {
                    this.props.removeDraw()
                    this.draw.setActive(false)
                }
            })
    }
    componentDidUpdate(prevProps, prveState) {
        prevProps.draw && this.draw.setActive(true)
    }
    load(props) {
        const { map } = props.map
        if (!map) {
            return 
        }
        const polyonSource = new ol.source.Vector({
        })
        this.polyonLayer = new ol.layer.Vector({
            source: polyonSource,
            zIndex: 13,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: [117, 172, 71, 0.7]
                }),
                stroke: new ol.style.Stroke({
                    lineCap: 'butt',
                    lineJoin: 'miter',
                    color: [107, 98, 0, 1.0],
                    width: 3
                })
            })
        })
        map.addLayer(this.polyonLayer)

        // text 
        this.textOverlay = new ol.Overlay({
            element: this.popup,
            positioning: 'center-center',
            stopEvent: false
        })
        map.addOverlay(this.textOverlay)
       

        this.draw = new ol.interaction.Draw({
            source: polyonSource,
            type: 'Polygon'
        })
        map.addInteraction(this.draw)
        this.draw.setActive(false)

        this.polygonModify = new ol.interaction.Modify({
            source: polyonSource
        })
        map.addInteraction(this.polygonModify)
        //  备用
        // this.translate = new ol.interaction.Translate({
        //     layers: [this.polyonLayer]
        // })
        // this.translate.on('translateend', function (evt) {
        //     var feature = evt.features.a[0]
        //     var payload = geoJson.writeFeature(feature, {
        //         featureProjection: map.getView().getProjection()
        //     })
        //     var center = ol.extent.getCenter(feature.getGeometry().getExtent())
        // })
        //  备用end
        var geoJson = new ol.format.GeoJSON()
        this.draw.on('drawend', (evt) => {
            var feature = evt.feature
            this.props.removeDraw()
            // new Promise((resolve, reject) => {
            //     if (Number.parseFloat(this.getArea(feature)) > 2000) {
            //         alert('您圈选的田地面积不符合实际情况，请重新圈选')
            //         resolve('')
            //     } else {
            //         reject(this.props.removeDraw)
            //     }
            // }).then(() => {
            //     polyonSource.clear()
            // }).catch(fn => fn())
           
            // this.setState({
            //     area: this.getArea(feature),
            //     feature
            // })
            // text 开始作妖
            // this.drawText(evt.feature)
            this.props.saveFeature(evt.feature)
        })
        
        this.polygonModify.on('modifyend', (evt) => {
            // this.drawText(evt.features.a[0])
            var feature = evt.features.a[0]
            this.props.saveFeature(evt.feature)
            var payload = geoJson.writeFeature(feature, {
                featureProjection: map.getView().getProjection()
            })
            var center = ol.extent.getCenter(feature.getGeometry().getExtent())
        })  
        map.on('click', (evt) => this.clickListener(evt))
    }
    clickListener(evt) {
        const { map } = this.props.map
        const feature = map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => layer && feature)
        if (feature) {
            this.props.saveFeature(feature)

            const id = feature.get('id')
            const name = feature.get('name')
            const isNew = feature.get('isNew')
            console.log(id)
            if (!id) {
                this.setState({
                    feature,
                    initial: true,
                    coord: evt.coordinate,
                    area: this.getArea(feature)
                })
            } else {
                this.setState({
                    coord: undefined
                })
                map.un('click', this.clickListener)
            }
        }
    }
    drawText() {
       
        const {feature} = this.props.feature
        let extent = (feature.getGeometry().getExtent())
        const { name, id, isNew } = this.props.feature
        
        this.state.feature.set('id', id)
        this.state.feature.set('isNew', isNew)
        const { area } = this.state
        this.popup.innerHTML = `
                <div class='test'>
                    <h3>${name}</h3>
                </div>
                <div class='test title'>
                    <span>${area.acre} 亩 / ${area.hectare} 公顷</span>
                </div>
            `
        Array.from(document.getElementsByClassName('test')).forEach((e) => {
            Array.from(e.children).forEach(e => {
                e.style.fontSize = getStyle(e, 'font-size')
            })
        })
        this.textOverlay.setPosition(getCenterOfExtent(extent))
    }
    componentWillUnmount() {
        console.log('unmount')
        const { map } = this.props.map
        this.polyonLayer && map.removeLayer(this.polyonLayer)
        this.draw && this.draw.setActive(false)
    }

   
    getArea(polygonFeature) {
        var sphere = new ol.Sphere(6378137)
        var lonLatPolygon = polygonFeature.getGeometry().transform('EPSG:3857', 'EPSG:3857')
        var area = Math.abs(sphere.geodesicArea(lonLatPolygon.getCoordinates()[0]))
        // return area
        // if (area > 1000000) {
        //     area = area / 1000000
        //     unit = '亩'
        // } else {
        //     // unit = 'm²'
        // }
        return {
            acre: (area / 100).toFixed(2),
            hectare: ( area / 10000 ).toFixed(2)
        }
    }

    render() {
        if(this.draw) {
            this.draw.setActive(this.props.draw)
        }
        return (
            <div className='polygon'>
                <div ref={popup => this.popup = popup}>
                </div>
                {
                    this.state.initial && <CreateField coord={this.state.coord} drawText={this.drawText.bind(this)} area={this.state.area}/>
                }
            </div>
        )
    }
}
Polygon.propTypes = {
    map: PropTypes.object,
    draw: PropTypes.bool,
    removeDraw: PropTypes.func,
    feature: PropTypes.object,
    saveFeature: PropTypes.func,
    setFeature: PropTypes.func
}
const mapStateToProps = (state) => {
    return {
        map: state.map,
        feature: state.feature
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        saveFeature: (feature) => {
            dispatch(saveFeature(feature))
        },
        setFeature: (config) => {
            dispatch(setFeature(config))
        }
    }
}
export default connect(mapStateToProps, mapDispathToProps)(Polygon)