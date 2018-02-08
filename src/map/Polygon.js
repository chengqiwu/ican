import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ol from 'openlayers'
import { connect } from 'react-redux'
import 'css/map/polygon.scss'
class Polygon extends Component {
    constructor() {
        super()
        this.state = {
            area: null,    // 选中feature的面积
        }
    }
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
        const geojson = new ol.format.GeoJSON()

        var geom = geojson.readGeometry('{"type":"Polygon","coordinates":[[[19.2041015625,17.224758206624628],[10.0634765625,4.565473550710294],[20.2587890625,3.9519408561576057],[28.959960937499993,13.239945499286307],[19.2041015625,17.224758206624628]]]}', { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
        
        polyonSource.addFeature(new ol.Feature({
            geometry: geom
        }))
        this.polygonModify = new ol.interaction.Modify({
            source: polyonSource
        })
        map.addInteraction(this.polygonModify)
        
        this.translate = new ol.interaction.Translate({
            layers: [this.polyonLayer]
        })
        var geoJson = new ol.format.GeoJSON()
        this.draw.on('drawend', (evt) => {
            var feature = evt.feature
            this.props.removeDraw()
            this.setState({
                area: this.getArea(feature)
            })
        })
        this.polygonModify.on('modifyend', (evt) => {
            console.log(evt)

            var feature = evt.features.a[0]
            this.setState({
                area: this.getArea(feature)
            })
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
    getArea(polygonFeature) {
        var sphere = new ol.Sphere(6378137)
        var lonLatPolygon = polygonFeature.getGeometry().transform('EPSG:3857', 'EPSG:3857')
        var area = Math.abs(sphere.geodesicArea(lonLatPolygon.getCoordinates()[0]))
        // return area
        var unit
        if (area > 1000000) {
            area = area / 1000000
            unit = 'km²'
        } else {
            unit = 'm²'
        }
        return area + unit
    }

    render() {
        if(this.draw) {
            this.draw.setActive(this.props.draw)
        }
        var childrenWithProps = React.Children.map(this.props.children, child =>
            React.cloneElement(child, { area: this.state.area }))
        return (
            <div className='polygon'>
                {childrenWithProps}
            </div>
        )
    }
}
Polygon.propTypes = {
    map: PropTypes.object,
    draw: PropTypes.bool,
    removeDraw: PropTypes.func,
    children: PropTypes.node
}
const mapStateToProps = (state) => {
    return {
        map: state.map
    }
}
export default connect(mapStateToProps)(Polygon)