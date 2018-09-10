import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import ol from 'openlayers'
import {styleFunction} from './MapStyle'
class KML extends Component {
  submitHandler = (e) => {
    e.preventDefault()
    
  }
  componentDidMount() {
    this.dropzone.open()
  }
  preview = (files) => {
    const {map} = this.props
    map.getLayers().getArray().forEach(lyr => {
      if (lyr.get('_id') === 'kml') {
        map.removeLayer(lyr)
      }
    })
    var vectorSource = new ol.source.Vector({  
      //1.通过GeoServer生成的KML文件，保存到此网页文件所在的目录  
      //2.也可以直接使用生成这个文件的链接，动态生成数据文件  
      url : files[0].preview,
      format : new ol.format.KML({
        extractStyles: false
      })  
    })
    var vectorLayer = new ol.layer.Vector({  
      source : vectorSource
    })
    
    vectorLayer.set('_id', 'kml')
    map.addLayer(vectorLayer)
    this.props.removeKML()
    function listerner() {
      if (vectorLayer.getSource().getState() === 'ready') {    // 判定是否加载完成
        const feature = vectorLayer.getSource().getFeatures()[0]
        map.getView().fit(vectorLayer.getSource().getExtent(), {
          duration: 1000, callback: function () {
            // feature.setStyle(styleFunction)
            vectorSource.removeFeature(feature)
            console.log(feature.getGeometry())
            const feature2 = new ol.Feature({
              geometry: feature.getGeometry(),
            })
            feature2.setStyle(styleFunction)
            vectorSource.addFeature(feature2)
            const modify = new ol.interaction.Modify({ source: vectorSource })
            map.addInteraction(modify)
            // 注销监听器
          }
        })
        vectorLayer.getSource().un('change', listerner)

      }
    }
    vectorLayer.getSource().on('change', listerner )
  }
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <Dropzone
          className='drop-zone'
          ref={dropzone => this.dropzone = dropzone}
          onDrop={this.preview}
        />
      </form>
    )
  }
}
KML.propTypes = {
  map: PropTypes.object,
  removeKML: PropTypes.func
}
export default KML