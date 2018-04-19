import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getUserInfo } from 'utils/Api.js'
import ol from 'openlayers'
import { connect } from 'react-redux'
import { saveFeature, setFeature } from '_redux/actions/feature'
import 'css/map/polygon.scss'
import CreateField from './CreateField'
import Rx from 'rxjs/Rx'
import Popup from './Popup'
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
            feature: null,
            popupText: []
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

       
       

        this.draw = new ol.interaction.Draw({
            source: polyonSource,
            type: 'Polygon'
        })
        map.addInteraction(this.draw)
        this.draw.setActive(false)

        // this.polygonModify = new ol.interaction.Modify({
        //     source: polyonSource
        // })
        // map.addInteraction(this.polygonModify)
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
        
        // this.polygonModify.on('modifyend', (evt) => {
        //     // this.drawText(evt.features.a[0])
        //     var feature = evt.features.a[0]
        //     this.props.saveFeature(evt.feature)
        //     var payload = geoJson.writeFeature(feature, {
        //         featureProjection: map.getView().getProjection()
        //     })
        //     var center = ol.extent.getCenter(feature.getGeometry().getExtent())
        // })  
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
            if (!id) {
                this.setState({
                    feature,
                    initial: true,
                    coord: evt.coordinate,
                    area: this.getArea(feature)
                })
            } else {
                map.un('click', this.clickListener)
            }
        }
    }
    drawText() {        
        const {feature} = this.props.feature
        let extent = feature.getGeometry().getExtent()
        const { name, id, isNew } = this.props.feature
        
        this.state.feature.set('id', id)
        this.state.feature.set('isNew', isNew)
        const { area, popupText } = this.state
        
        popupText.push({
            id,
            name,
            status: '闲',
            username: getUserInfo().username,
            area: `${area.acre}亩`,
            coord: getCenterOfExtent(extent),
            map: this.props.map.map
        })
        this.setState({
            popupText
        })
        Array.from(document.getElementsByClassName('test')).forEach((e) => {
            Array.from(e.children).forEach(e => {
                e.style.fontSize = getStyle(e, 'font-size')
            })
        })
    }
    componentWillUnmount() {
        console.log('unmount')
        const { map } = this.props.map
        this.polyonLayer && map.removeLayer(this.polyonLayer)
        this.draw && this.draw.setActive(false)
    }

   
    getArea(polygonFeature) {
        var measurement = polygonFeature.getGeometry().getArea() / 1000
        // var measurementFormatted = measurement > 100 ? (measurement / 1000).toFixed(2) + 'km' : measurement.toFixed(2) + 'm'
        return {
            acre: (measurement / 100).toFixed(2),
            hectare: (measurement / 10000 ).toFixed(2)
        }
    }
    setInitial() {
        this.setState({
            coord: undefined
        })
    }
    render() {
        if(this.draw) {
            this.draw.setActive(this.props.draw)
        }
        console.log(this.state)
        return (
            <div className='polygon'>
                {
                    this.state.initial && <CreateField coord={this.state.coord} setDefault={this.setInitial.bind(this)} drawText={this.drawText.bind(this)} area={this.state.area}/>
                }
                {this.state.popupText.map(p => <Popup key={p.id} {...p} />)}
                
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