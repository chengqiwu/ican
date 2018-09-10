import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {toast} from 'react-toastify'
import ol from 'openlayers'
import {styleFunction} from './MapStyle'
class Input extends Component {
  constructor() {
    super()
    this.state= {
      textarea: ''
    }
  }
  componentDidMount() {
    this.source = new ol.source.Vector({
    })
    const modify = new ol.interaction.Modify({ source: this.source })
    this.layer = new ol.layer.Vector({
      source: this.source,
      style: styleFunction
    })
    this.layer.set('id', 'input')
    this.props.map.addLayer(this.layer)
    this.props.map.addInteraction(modify)
  }
  componentWillUnmount() {
    // this.props.map.removeLayer(this.layer)
  }
  onChange = (e) => {
    this.setState({
      textarea: e.target.value
    })
  }
  submitHandler = (e) => {
    e.preventDefault()
    const value = this.state.textarea.replace(/[ ]/g, '').replace(/，/g,',').trim()
    const latlon = value.split(/[\s\n]/)
    if (latlon[0] !== latlon[latlon.length-1]) {
      latlon.push(latlon[0])
    }
    const lonlat = [] 
    for (let i = 0; i< latlon.length; i++) {
      const s = latlon[i].split(',')
      if (s.length === 1) {
        toast.error('输入经纬度格式不正确')
        return
      }
      lonlat.push([Number(s[1]), Number(s[0])])
    }

    // 116.39188528060915，39.929601969223285，116.39184474525031，39.9291618749852，116.39172954484819，39.92791112352347，116.39317374676465，39.929146384710634，116.39339586719869，39.92990239109875，116.39188528060915，39.929601969223285
    const feature = (new ol.format.GeoJSON()).readFeature({
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [lonlat]
      }
    }, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
    this.source.clear()
    this.source.addFeature(feature)
    this.props.map.getView().fit(feature.getGeometry(), { duration: 1000 })
   
  }
  render() {
    return (
      <form onSubmit={this.submitHandler} className='latlon'>
        <textarea name="" id="" cols="30" rows="10" 
          value={this.state.textarea} 
          onChange={this.onChange}
          placeholder={'样例：\r\n纬度1,经度1 \r\n纬度2,经度2\r\n...'}
        ></textarea>
        <input type="submit" value="确认" />
      </form>
    )
  }
}
Input.propTypes = {
  map: PropTypes.object
}
export default Input