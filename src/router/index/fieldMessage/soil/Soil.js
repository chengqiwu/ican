import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import 'css/index/field/soil.scss'
import { findSoilList, findsoilLandList } from 'utils/Api'
import AddSoil from './AddSoil'
class Soil extends Component {
  constructor() {
    super()
    this.state = {
      soilType: [
        {
          label: '沙土',
          value: '0'
        },
        {
          label: '壤土',
          value: '1'
        },
        {
          label: '粘土',
          value: '2'
        }
      ],
      soilLands: []
    }
  }
  componentDidMount() {
    const { feature: {feature} } = this.props
    const landId = feature.getId().replace(/tb_farmland./g, '')
    const fd = new FormData()
    fd.append('landId', landId)
    findsoilLandList(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          if (!data.result) {
            this.addSoilLand()
            return
          }
          this.setState({
            soilLands: data.result
          })
        }
      })
  }
  addSoilLand = (e) => {
    const { soilLands } = this.state
    soilLands.push({
      id: Date.now(),
      landId: undefined,
      soilId: undefined,
      ph: '',
      organicMatter: '',
      profilePaths: [],
      detectionReports: []
    })
    this.setState({
      soilLands
    })
  }
  updateSoilLands = (soilLands) => {
    this.setState({
      soilLands
    })
  }
  render() {
    return <div className='soil'>
      <div className='relative'>
        <div className='title'>土壤</div>
      </div>
      <div className='content'>
        {
          this.state.soilLands.map(soil => <AddSoil 
            soilLands={this.state.soilLands} 
            key={soil.id} 
            soilType={this.state.soilType} 
            soilLand={soil}
            updateSoilLands={this.updateSoilLands}
            collapsed={soil.id.toString().length === 13}/>)
        }
        <button className='button add' onClick={this.addSoilLand}>
          +增加一种土壤
        </button>
      </div>
    </div>
  }
}
Soil.propTypes = {
  feature: PropTypes.object,
}
const mapStateToProps = (state) => {
  return {
    feature: state.feature
  }
}
export default connect(mapStateToProps)(Soil)