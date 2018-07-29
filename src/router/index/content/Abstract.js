import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'css/index/common/abstract.scss'
import { connect } from 'react-redux'
import { setFieldMessage, showFieldMessage } from '_redux/actions/fieldMessage'
import { fromFeature } from '_redux/actions/feature'
const getArea = (feature) => {
  var measurement = feature.getGeometry().getArea() / 1000
  return {
    acre: (measurement / 100).toFixed(2),
    hectare: (measurement / 10000).toFixed(2)
  }
}

const arr = ['无', '滴灌', '喷灌', '漫灌（ 随时）', '漫灌（何时有水不定）']
class Abstract extends Component {
  constructor(props) {
    super(props)
    this.showDetails = this.showDetails.bind(this)
  }
  showDetails() {
    this.props.showFieldMessage(true)        
    this.props.fromFeature(true)
  }

  render() {
    const { fieldMessage, message} = this.props
    let crop = undefined
    let variety = undefined
    message.criosAndVarietiesList.map(cav => {
      if (fieldMessage.cropsId === cav.id) {
        crop = cav.name
        cav.list.map(v => {
          if (v === fieldMessage.varietiesId) {
            variety = v.name
          }
        })
      }
            
    })
    const feature = this.props.feature
    const area = getArea(feature)
    console.log(feature.getId())
    return (
      <div className='abstract'>
        <table  >
          <tbody>
            <tr>
              <td>位置：</td>
              <td>{feature.get('address')}</td>
            </tr>
            <tr>
              <td>面积：</td>
              <td> {area.acre} 亩 / {area.hectare} 公顷</td>
            </tr>
            <tr>
              <td>种植季：</td>
              <td>{fieldMessage.plantingSeason}</td>
            </tr>
            <tr>
              <td>当前品种：</td>
              <td>{crop}</td>
            </tr>
            <tr>
              <td>土壤类型：</td>
              <td>{variety}</td>
            </tr>
            <tr>
              <td>土壤酸碱度：</td>
              <td>{fieldMessage.soilPh}</td>
            </tr>
            <tr>
              <td>土壤有机质范围：</td>
              <td>{fieldMessage.organicMatter}</td>
            </tr>
            <tr>
              <td>灌溉条件：</td>
              <td>{arr[fieldMessage.irrigation]}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <button className='button blue' onClick={this.showDetails}>详情</button>
        </div>
      </div>
          
    )
  }
}
Abstract.propTypes = {
  fieldMessage: PropTypes.object,
  showFieldMessage: PropTypes.func,
  fromFeature: PropTypes.func,
  feature: PropTypes.object,
  message: PropTypes.object,
}
const mapStateToProps = (state) => {
  return {
    message: state.message,
    // feature: state.feature
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    showFieldMessage: (flag) => {
      dispatch(showFieldMessage(flag))
    },
    fromFeature: (flag) => {
      dispatch(fromFeature(flag))
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Abstract)