import React, { Component } from 'react'
import ol from 'openlayers'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import open from 'images/index/eyes/open.png'
import close from 'images/index/eyes/close.png'

import { removeFeature, addFeature } from '_redux/actions/userFeature'
import { setFarmLandShow} from 'utils/Api'

class Eyes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flag: props.isShow // （0:显示;1:隐藏）
    }
  }
  isShow = (id, event) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    this.vector = this.props.map.map.getLayers().getArray().filter(lyr => lyr.get('id') === 'vector')[0]
    const { source } = this.props.cluster
    if (this.state.flag === '0') {
      const fd = new FormData()
      fd.append('id', id)
      fd.append('isShow', '1')
      setFarmLandShow(fd)
        .then(e => e.data)
        .then(data => {
          if (data.msg === '200') {
            this.vector.getSource().getFeatures().forEach((feature) => {
              feature.getId().replace('tb_farmland.', '') === id && this.vector.getSource().removeFeature(feature)
            })
            source.getFeatures().forEach((feature) => {
              feature.getId().replace('tb_farmland.', '') === id && source.removeFeature(feature)
              
            })
            source.refresh()
            this.setState({
              flag: '1'
            })
            
          }
        })
      
    } else {
      const fd = new FormData()
      fd.append('id', id)
      fd.append('isShow', '0')
      setFarmLandShow(fd)
        .then(e => e.data)
        .then(data => {
          console.log(data)
          if (data.msg === '200') {
            console.log(this.props.userFeature)
            const feature = this.props.userFeature.fields.filter(feature => feature.id.replace('tb_farmland.', '') === id)[0]
            const f = new ol.format.GeoJSON().readFeature(feature, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
            this.vector.getSource().addFeature(f)
            // this.vector.getSource().refresh()
            const featureCluster = new ol.Feature(new ol.geom.Point(ol.extent.getCenter(f.getGeometry().getExtent())))
            featureCluster.setId(f.getId())
            source.addFeature(featureCluster)
            source.refresh()
            
            this.setState({
              flag: '0'
            })

          }
        })
    }  
  }
  render() {
    const {flag} = this.state
    return (
      <img src={flag ==='0' ? open: close} alt="" flag={1} onClick={this.isShow.bind(this, this.props.id)} />
    )
  }
}
Eyes.propTypes = {
  map: PropTypes.object,
  removeFeature: PropTypes.func,
  addFeature: PropTypes.func,
  id: PropTypes.string,
  userFeature: PropTypes.object,
  isShow: PropTypes.string,
  cluster: PropTypes.object
}
const mapStateToProps = function (state) {
  return {
    userFeature: state.userFeature,
    map: state.map,
    cluster: state.cluster
  }
}
const mapDispatchToProps = function(dispatch) {
  return {
    removeFeature: function(item) {
      dispatch(removeFeature(item))
    },
    addFeature: function (item) {
      dispatch(addFeature(item))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Eyes)