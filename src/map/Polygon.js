import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ol from 'openlayers'
import { connect } from 'react-redux'
import 'css/map/polygon.scss'

import Popup from 'map/Popup1'
class Polygon extends Component {
    componentDidMount() {
        this.load(this.props)
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
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
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
       
        this.polygonModify = new ol.interaction.Modify({
            source: polyonSource
        })
        map.addInteraction(this.polygonModify)
        
        this.translate = new ol.interaction.Translate({
            layers: [this.polyonLayer]
        })
        var geoJson = new ol.format.GeoJSON()
        this.draw.on('drawend', (evt) => {
            this.props.removeDraw()
        })
        this.polygonModify.on('modifyend', (evt) => {
            var feature = evt.features.a[0]
            var payload = geoJson.writeFeature(feature, {
                featureProjection: map.getView().getProjection()
            })
            var center = ol.extent.getCenter(feature.getGeometry().getExtent())
            map.removeInteraction(this.draw)
        })
        this.translate.on('translateend', function(evt) {
            var feature = evt.features.a[0]
            var payload = geoJson.writeFeature(feature, {
                featureProjection: map.getView().getProjection()
            })
            var center = ol.extent.getCenter(feature.getGeometry().getExtent())
        })

    }
    componentWillUnmount() {
        console.log('unmount')
        const { map } = this.props.map
        this.polyonLayer && map.removeLayer(this.polyonLayer)
        this.draw && this.draw.setActive(false)
    }
    render() {
        if(this.draw) {
            this.draw.setActive(this.props.draw)
        }
        // this.draw && console.log(this.draw.getActive())
        return (
            <div className='polygon'>
                <Popup map={this.props.map}/>
            </div>
        )
    }
}
Polygon.propTypes = {
    map: PropTypes.object,
    draw: PropTypes.bool,
    removeDraw: PropTypes.func
}
const mapStateToProps = (state) => {
    return {
        map: state.map
    }
}
export default connect(mapStateToProps)(Polygon)