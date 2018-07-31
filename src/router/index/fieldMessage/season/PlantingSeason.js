import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import 'css/index/field/plantingSeason.scss'
import { findPlantingSeasonList, setInSeason, deleteSeason } from 'utils/Api'
import { updateSeason } from '_redux/actions/season'
import { showSeason, updatePSeason, destorySeason} from '_redux/actions/plaintingSeason'

class PlantingSeason extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    const { feature: {feature}} = this.props
    const id = feature.getId().replace(/tb_farmland./g, '')
    const fd = new FormData()
    fd.append('landId', id)

    findPlantingSeasonList(fd)
      .then(e => e.data)
      .then(data => {
        if(data.msg === '200') {
          this.props.updateSeason(data.result || [])
        }
      })
  }
  addSeason = (e) => {
    e.preventDefault()
    if (this.props.plaintingSeason.show) {
      return 
    }
    this.props.updatePSeason({
      id: Date.now()
    })
  }
  hidenDragDrop = () => {
    this.props.destorySeason()
  }
  setInSeason = (e) => {
    const id = e.target.getAttribute('land-id')
    const seasonId = e.target.getAttribute('season-id')
    const fd = new FormData()

    fd.append('id', id)
    fd.append('seasonId', seasonId)
    setInSeason(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          console.log(data)
          const fd = new FormData()
          fd.append('landId', id)

          findPlantingSeasonList(fd)
            .then(e => e.data)
            .then(data => {
              if (data.msg === '200') {
                this.props.updateSeason(data.result || [])
              }
            })
        }
      })
  }
  deleteSeason = (e) => {
    const id = e.target.getAttribute('id')
    const landid = e.target.getAttribute('land-id')
    const fd = new FormData()

    fd.append('id', id)
    deleteSeason(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          const fd = new FormData()
          fd.append('landId', landid)

          findPlantingSeasonList(fd)
            .then(e => e.data)
            .then(data => {
              if (data.msg === '200') {
                this.props.updateSeason(data.result || [])
              }
            })
        }
      })
  }
  getSeasonCrops = (item, e) => {
    e.preventDefault()
    this.props.updatePSeason(item)
  }
  render() {
    return (
      <div className='plaintingSeason'>
        <div className='season-div'>
          <div className='relative'>
            <div className='title'>种植季</div>
          </div>
          <div className='content'>
            <table>
              <tbody>
                {this.props.season.map(item => (
                  <tr key={item.id}>
                    <td className='timer'>
                      <a href="#" onClick={this.getSeasonCrops.bind(this, item)}>{item.name}</a>
                    </td>
                    {
                      item.inSeason === '1' ?
                        <td>
                          <button className='button current' >当季</button>
                        </td> :
                        <td>
                          <button className='button set-current'
                            season-id={item.seasonId}
                            land-id={item.landId}
                            onClick={this.setInSeason}>设为当季</button>
                          <button className='button delete'
                            id={item.id}
                            land-id={item.landId}
                            onClick={this.deleteSeason}>删除</button>
                        </td>
                    }
                  </tr>
                ))}
              </tbody>
            </table>
            <button className='button add' onClick={this.addSeason}>
              +添加种植季
            </button>
          </div>
        </div>
      </div>
    )
  }
}
PlantingSeason.propTypes = {
  feature: PropTypes.object,
  season: PropTypes.array,
  updateSeason: PropTypes.func,
  updatePSeason: PropTypes.func,
  destorySeason: PropTypes.func,
  plaintingSeason: PropTypes.object
}
const mapStateToProps = (state) => {
  return {
    feature: state.feature,
    season: state.season,
    plaintingSeason: state.plaintingSeason
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    updateSeason: (season) => {
      dispatch(updateSeason(season))
    },
    showSeason: () => {
      dispatch(showSeason())
    },
    updatePSeason: (plantingSeason) => {
      dispatch(updatePSeason(plantingSeason))
    }
  }
}
// updateSeason
export default connect(mapStateToProps, mapDispathToProps)(PlantingSeason)
