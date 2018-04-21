import React, { Component } from 'react'
import ol from 'openlayers'
import axios from 'axios'
import PropTypes from 'prop-types'
import Popup from './Popup'
import { getUserInfo } from 'utils/Api.js'
class UserFeature extends Component {
    constructor(props) {
        super(props)
        this.state = {
            features: []
        }
    }
    componentDidMount() {
        const map = this.props.map
        var vectorSource = new ol.source.Vector()
        var vector = new ol.layer.Vector({
            source: vectorSource,
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
        // then post the request and add the received features to a layer
        axios.get('http://192.168.1.23:8081/geoserver/ican/ows', {
            params: {
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                typeName: 'ican:tb_farmland',
                maxFeatures: 50,
                outputFormat: 'application/json'
            }
        }).then((response) => {
            return response.data
        }).then((data) => {
            console.log(data)
            var features = new ol.format.GeoJSON().readFeatures(data, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
            
            this.setState({
                features
            })
            vectorSource.addFeatures(features)       

            map.getView().fit(vectorSource.getExtent())
        })
        map.addLayer(vector)
    }
    getArea(feature) {
        var measurement = feature.getGeometry().getArea() / 1000
        return {
            acre: (measurement / 100).toFixed(2),
            hectare: (measurement / 10000).toFixed(2)
        }
    }
    render() {
        return <div>
            {
                this.state.features.map(feature =>
                    <Popup key={feature.getId()} {...feature.getProperties()} 
                        {...this.props} 
                        coord={ol.extent.getCenter(feature.getGeometry().getExtent())}
                        area={this.getArea(feature).acre + '亩'}
                        username={getUserInfo().username}/>)
            }
        </div>
    }
}
UserFeature.propTypes = {
    map: PropTypes.object
}
export default UserFeature