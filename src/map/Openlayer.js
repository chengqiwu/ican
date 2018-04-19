import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ol from 'openlayers'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserId } from 'utils/Api' 
import Circle from './common/Circle'
import 'openlayers/css/ol.css'
import 'css/map/map.scss'
import history from 'router/history'

class Openlayer extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        const map = this.props.map.map
        map.setTarget(this.map)

        const token = getUserId()
        if (!token) {
            history.push('/')
            return 
        }
        // const lyr= new ol.layer.Image({
        //     source: new ol.source.ImageWMS({
        //         ratio: 1,
        //         url: 'http://192.168.1.23:8081/geoserver/ican/wms',
        //         params: {
        //             'FORMAT': 'image/png',
        //             'VERSION': '1.1.0',
        //             STYLES: '',
        //             CQL_FILTER: `master_id==\'${token}\'`,
        //             LAYERS: 'ican:tb_farmland',
        //             SRS: 'EPSG:4326'
        //             // SLD_BODY: sld_body
        //         }
        //     }),

        // })
        // var viewRsolution = map.getView().getResolution()
        // var url = lyr.getGetFeatureInfoUrl(
        //     Coordinates, viewRsolution, 'EPSG:3857',
        //     {
        //         'INFO_FORMAT': 'application/json',
        //         'FEATURE_COUNT': 50
        //     }
        // )
        // axios.get(url).then(e => console.log(e))
        // map.getView().fit(lyr.getSource().getExtent(), { duration: 1000 })
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
        }).then(function (response) {
            return response.data
        }).then(function (data) {
            console.log(data)
            var features = new ol.format.GeoJSON().readFeatures(data, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
            console.log(features)
            vectorSource.addFeatures(features)
            console.log(new ol.format.GeoJSON().writeFeatures(vectorSource.getFeatures(), {
                dataProjection: 'EPSG:3857',
                featureProjection: 'EPSG:4326' }))
            map.getView().fit(vectorSource.getExtent())
        })

        map.addLayer(vector)
    }
    render() {
        return (
            <div id='map' className='map' ref={map => this.map = map}>
                <Circle/>
            </div>
        )
    }
}
Openlayer.propTypes = {
    children: PropTypes.object,
    setTarget: PropTypes.func,
    map: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        map: state.map
    }
}
const mapDispatchToProps = (dispath) => {
    return {
        setTarget: (target) => dispath({ type: 'changeTarget', target})
    }
}
Openlayer = connect(mapStateToProps, mapDispatchToProps)(Openlayer)
export default Openlayer

