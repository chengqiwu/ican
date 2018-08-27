import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { farmLandLists, farmLandUpdateList } from 'utils/Api'
import fly from 'images/feature/fly.png'
import drag from 'images/feature/dragula.png'
import Dragula from 'react-dragula'
import { connect } from 'react-redux'
import ol from 'openlayers'
import 'react-dragula/dist/dragula.min.css'

class Field extends Component {
  constructor() {
    super()
    this.state = {
      fields: []
    }
  }
  componentDidMount() {
    farmLandLists()
      .then(e => e.data)
      .then(data => {
        this.setState({
          fields: data.result || []
        })
      }).catch(error => {
        
      })
  }
  flyTo = (field) => {
    const geomStr = field.geom.replace('MULTIPOLYGON(((', '').replace(')))', '')
    const coordinates = geomStr.split(',').map(g => {
      return [Number.parseFloat(g.split(' ')[0]), Number.parseFloat(g.split(' ')[1])]
    })
    const polygon_feature = {
      geometry: {
        type: 'MultiPolygon',
        coordinates: [[coordinates]]
      },
      type: 'Feature'
    }
    const feature1 = new ol.format.GeoJSON().readFeature(polygon_feature, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
    this.props.map.map.getView().fit(feature1.getGeometry(), { duration: 1000 })
  }
  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {}
      this.drake = Dragula([componentBackingInstance], options)
      this.drake.on('drop', (el, target, source, sibling) => {

        const targetIndex = this.state.fields.findIndex(v => v.id === el.getAttribute('v-id'))
        const endSiblingIndex = this.state.fields.findIndex(v => sibling && v.id === sibling.getAttribute('v-id'))
        console.log(targetIndex, endSiblingIndex)
        // start, end+1
        let fields = []
        if (targetIndex < endSiblingIndex) {
          fields = [
            ...this.state.fields.slice(0, targetIndex),
            ...this.state.fields.slice(targetIndex + 1, endSiblingIndex),
            this.state.fields[targetIndex],
            ...this.state.fields.slice(endSiblingIndex)
          ]
          this.setState({
            fields
          })

        } else if (endSiblingIndex === -1) {
          fields = [
            ...this.state.fields.slice(0, targetIndex),
            ...this.state.fields.slice(targetIndex + 1),
            this.state.fields[targetIndex]
          ]
          this.setState({
            fields
          })
        } else if (targetIndex > endSiblingIndex) {
          fields = [
            ...this.state.fields.slice(0, endSiblingIndex),
            this.state.fields[targetIndex],
            ...this.state.fields.slice(endSiblingIndex, targetIndex),
            ...this.state.fields.slice(targetIndex + 1)
          ]
          this.setState({
            fields
          })
        }
        const fd = new FormData()
        fd.append('content', JSON.stringify(fields.map(f => ({
          id: f.id,
          sort: f.sort
        }))))
        farmLandUpdateList(fd)
          .then(e => e.data)
          .then(data => {
            if (data.msg === '200') {
              // this.setState({
              //   fields: data.result
              // })
            }
          })
      })
    }
  }
  render() {
    console.log(this.state.fields)
    return <ul ref={this.dragulaDecorator}>
      {
        this.state.fields.map(field =>
          <li className='featureLi' v-id={field.id} key={field.id}
            onClick={this.flyTo.bind(this, field)}>
            <div className='drag'>
              <img src={drag} alt="" />
              <span>{field.name}</span>
            </div>
            <img src={fly} alt='定位' />
          </li>)
      }
    </ul>
  }
}
Field.propTypes = {
  map: PropTypes.object
}
const mapStateToProps = function (state) {
  return {
    map: state.map
  }
}
export default connect(mapStateToProps)(Field)