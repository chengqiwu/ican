import React, { Component } from 'react'
import ol from 'openlayers'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateFeature } from '_redux/actions/userFeature'
import Popup from './Popup'
import { getArea } from 'utils/tools'
import { geoserverUrl } from '../url'
import { getUserInfo } from 'utils/Api.js'
class UserFeature extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feature: undefined
    }
  }
  componentDidMount() {
    const map = this.props.map
    const vectorSource = new ol.source.Vector()
    const { source } = this.props.cluster
    const clusterSource = new ol.source.Cluster({
      distance: 40,
      source
    })
    const cluster = new ol.layer.Vector({
      source: clusterSource,
      style: function (feature) {
        return setClusterStyle(feature)
      },
      zIndex: 99
    })
    cluster.set('id', 'cluster')
    this.props.setCluster(cluster)
    function setClusterStyle(feature) {
      var features = feature.get('features')
      var size = features.length
      var style = new ol.style.Style({
        image: new ol.style.Circle({
          radius: 18,
          // stroke: new ol.style.Stroke({
          //   color: '#fff'
          // }),
          fill: new ol.style.Fill({
            color: [51, 133, 255, 0.75]
          })
        }),
        text: new ol.style.Text({
          font: '15px sans-serif',
          text: size.toString(),
          fill: new ol.style.Fill({
            color: '#fff'
          })
        })
      })
      return style
    }
    this.vector = new ol.layer.Vector({
      source: vectorSource,
      style: function (feature) {
        const growth_status = feature.get('growth_status')
        let color = [117, 172, 71, 0.7]
        // ['优', '良', '差', '闲', '弃', '不选择']
        switch (growth_status) {
        case '0':
          color = [117, 172, 71, 0.7]
          break
        case '1':
          color = [254, 198, 28, 0.7]
          break
        case '2':
          color = [255,25,25, 0.7]
          break
        case '3':
          color = [122, 122, 122, 0.7]
          break
        case '4':
          color = [196, 196, 196, 0.7]
          break
        case '5':
          color = [17, 102, 0, 0.7]
          break
        default:
          break
        }
        return new ol.style.Style({
          fill: new ol.style.Fill({
            color
          }),
          stroke: new ol.style.Stroke({
            lineCap: 'butt',
            lineJoin: 'miter',
            color: [255, 200, 0, 1.0],
            width: 1
          })
        })
      }
    })
    this.vector.set('id', 'vector')
    // console.log(getUserInfo().id)
    // then post the request and add the received features to a layer
    axios.get(geoserverUrl, {
      params: {
        service: 'WFS',
        version: '1.0.0',
        request: 'GetFeature',
        typeName: 'ican:tb_farmland',
        maxFeatures: 500,
        outputFormat: 'application/json',
        CQL_FILTER: `master_id=='${getUserInfo().id}'`,
      }
    }).then((response) => {
      return response.data
    }).then((data) => {
      this.props.update(data.features)
      if (data.totalFeatures === 0) {
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            map.getView().animate({
              center: ol.proj.transform([r.point.lng, r.point.lat], 'EPSG:4326', 'EPSG:3857'),
              duration: 2000,
              zoom: 14
            })
          }
          else {
            alert('failed' + this.getStatus())
          }
        }, { enableHighAccuracy: true })

        return
      }
      var features = new ol.format.GeoJSON().readFeatures(data, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })

      features.map(f => {
        if (f.get('is_show') === '0') {
          const feature = new ol.Feature(new ol.geom.Point(ol.extent.getCenter(f.getGeometry().getExtent())))
          feature.setId(f.getId())
          source.addFeature(feature)
        }
        
      })
      vectorSource.addFeatures(features.filter(feature => feature.get('is_show') === '0'))
      if(vectorSource.getFeatures().length === 0) {
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            map.getView().animate({
              center: ol.proj.transform([r.point.lng, r.point.lat], 'EPSG:4326', 'EPSG:3857'),
              duration: 2000,
              zoom: 14
            })
          }
          else {
            alert('failed' + this.getStatus())
          }
        }, { enableHighAccuracy: true })
      } else {
        map.getView().fit(vectorSource.getExtent())
      }
    })
    map.addLayer(this.vector)
    map.addLayer(cluster)
    map.on('pointermove', (evt) => {
      if (evt.dragging) {
        return
      }
      if (map.getView().getZoom() > 8) {
        this.displayFeatureInfo(map.getEventPixel(evt.originalEvent))
      }
    })
    map.getView().on('change:resolution',() => {
      const clusters = this.props.cluster.cluster
      const zoom = map.getView().getZoom()
      if(zoom >12) {
        clusters && clusters.getVisible() && clusters.setVisible(false)
      } else {
        clusters && !clusters.getVisible() && clusters.setVisible(true)
      }
    })
  }
  componentDidUpdate() {
    // const map = this.props.map
    // map.get
  }
  displayFeatureInfo = (pixel) => {
    const map = this.props.map
    var feature = map.forEachFeatureAtPixel(pixel, (feature, layer) => {
      if (layer === this.vector) {
        return feature
      }
    })
    if (feature && map.getView().getZoom() > 12) {
      this.setState({
        feature
      })
      this.child.setPosition(ol.extent.getCenter(feature.getGeometry().getExtent()))
    } else {
      this.child && this.child.setPosition(undefined)
    }

  }
  render() {
    const { feature } = this.state
    return <div>
      {feature && <Popup {...feature.getProperties()} ref={child => this.child = child}
        {...this.props}
        growthStatus={feature.get('growth_status')}
        coord={ol.extent.getCenter(feature.getGeometry().getExtent())}
        area={getArea(feature).acre + '亩'}
        username={getUserInfo().username} />}
    </div>
  }
}
UserFeature.propTypes = {
  map: PropTypes.object,
  update: PropTypes.func,
  cluster: PropTypes.object,
  setCluster: PropTypes.func,
}
const mapStateToProps = function ({ cluster}) {
  return {
    cluster
  }
}
const mapDispatchToProps = function (dispatch) {
  return {
    setCluster: (cluster) => {
      dispatch({ type: 'cluster', cluster})
    },
    update: (features) => {
      dispatch(updateFeature(features))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserFeature)