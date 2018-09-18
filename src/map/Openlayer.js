import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ol from 'openlayers'
import { connect } from 'react-redux'
import { getUserToken } from 'utils/Api' 
import Circle from './common/Circle'
import 'openlayers/css/ol.css'
import 'css/map/map.scss'
import history from 'router/history'
import UserFeature from './userFeature'
import {getUserInfo} from '_redux/actions/user'
import { saveFeature, setFeature } from '_redux/actions/feature'
import { showFieldMessage, startFieldMessage } from '_redux/actions/fieldMessage'
import { showList } from '_redux/actions/picture'
class Openlayer extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    const map = this.props.map.map
    map.setTarget(this.map)
    map.updateSize()
    const token = getUserToken()
    this.props.getUserInfo()
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
    // map.on('click', (evt) => this.clickListener(evt))
       
  }
  // clickListener(evt) {
  //   console.log('cick')
  //   const { target } = evt.originalEvent
  //   if (target.tagName === 'IMG' && target.getAttribute('index')) {
  //     return
  //   }
  //   const { map } = this.props.map
  //   const feature = map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
  //     console.log(layer && layer.get('id'))
  //     return layer && feature
  //   })
  //   if (feature) {
  //     this.props.saveFeature(feature)
  //     this.props.startFieldMessage(false)
  //     this.props.showFieldMessage(false)
  //     this.props.showList(false)
  //   }
  // }
  render() {
    return (
      <div id='map' className='map' ref={map => this.map = map}>
        <Circle/>
        <UserFeature map={this.props.map.map}/>
      </div>
    )
  }
}
Openlayer.propTypes = {
  children: PropTypes.object,
  setTarget: PropTypes.func,
  map: PropTypes.object,
  getUserInfo: PropTypes.func,
  saveFeature: PropTypes.func,
  startFieldMessage: PropTypes.func,
  showFieldMessage: PropTypes.func,
  showList: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    map: state.map
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTarget: (target) => dispatch({ type: 'changeTarget', target}),
    getUserInfo: () => dispatch(getUserInfo()),
    saveFeature: (feature) => {
      dispatch(saveFeature(feature))
    },
    startFieldMessage: (start) => {
      dispatch(startFieldMessage(start))
    },
    showFieldMessage: (show) => {
      dispatch(showFieldMessage(show))
    },
    showList: (show) => {
      dispatch(showList(show))
    }
  }
}
Openlayer = connect(mapStateToProps, mapDispatchToProps)(Openlayer)
export default Openlayer

