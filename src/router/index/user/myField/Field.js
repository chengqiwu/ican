import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { farmLandLists, farmLandUpdateList } from 'utils/Api'
import { getMyField } from '_redux/actions/myField'
import fly from 'images/feature/fly.png'
import Dragula from 'react-dragula'
import { connect } from 'react-redux'
import ol from 'openlayers'
import 'react-dragula/dist/dragula.min.css'
import Eyes from './Eyes'

class Field extends Component {
  constructor() {
    super()
    this.state = {
      fields: [],
      filter: ''
    }
  }
  componentDidMount() {
    // farmLandLists()
    //   .then(e => e.data)
    //   .then(data => {
    //     this.setState({
    //       fields: data.result || []
    //     })
    //   })
    this.props.getMyField()
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

        const targetIndex = this.props.fields.findIndex(v => v.id === el.getAttribute('v-id'))
        const endSiblingIndex = this.props.fields.findIndex(v => sibling && v.id === sibling.getAttribute('v-id'))
        // start, end+1
        let fields = []
        console.log(this.props.fields)
        if (targetIndex < endSiblingIndex) {
          fields = [
            ...this.props.fields.slice(0, targetIndex),
            ...this.props.fields.slice(targetIndex + 1, endSiblingIndex),
            this.props.fields[targetIndex],
            ...this.props.fields.slice(endSiblingIndex)
          ]
        // this.setState({
        //   fields
        // })

          
        } else if (endSiblingIndex === -1) {
          fields = [
            ...this.props.fields.slice(0, targetIndex),
            ...this.props.fields.slice(targetIndex + 1),
            this.props.fields[targetIndex]
          ]
          // this.setState({
          //   fields
          // })
        } else if (targetIndex > endSiblingIndex) {
          fields = [
            ...this.props.fields.slice(0, endSiblingIndex),
            this.props.fields[targetIndex],
            ...this.props.fields.slice(endSiblingIndex, targetIndex),
            ...this.props.fields.slice(targetIndex + 1)
          ]
          // this.setState({
          //   fields
          // })
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
              this.props.getMyField()
            }
          })
      })
    }
  }
  filter = (e) => {
    this.setState({
      filter: e.target.value
    })
  }
  render() {
    return (
      <div>
        <div className='filter' >
          <input placeholder={'筛选过滤'} type="text" onChange={this.filter} />
        </div>
        <ul ref={this.dragulaDecorator}>
          {
            this.props.fields.filter(field => {
              console.log(this.state.filter, field.name.indexOf(this.state.filter) >= 0)
              return field.name.indexOf(this.state.filter) >= 0
            }).map(field =>
              <li className='featureLi' v-id={field.id} key={field.id}
                onClick={this.flyTo.bind(this, field)}>
                <div className='drag'>
                  <Eyes id={field.id} isShow={field.isShow} />
                  <span>{field.name}</span>
                </div>
                <img src={fly} title='定位' />
              </li>)
          }
        </ul>
      </div>
    )
  }
}
Field.propTypes = {
  map: PropTypes.object,
  fields: PropTypes.array,
  getMyField: PropTypes.func,
}
const mapStateToProps = function (state) {
  return {
    map: state.map,
    fields: state.fields
  }
}
const mapDispatchToProps = function (dispatch) {
  return {
    getMyField: function() {
      dispatch(getMyField())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Field)