import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import AddCrop from './AddCrop'
import { connect } from 'react-redux'
import { findCriosAndVarietiesList, findSeasonLists, plantingSeasonSave, findPlantingSeasonList, findPlantingSeasonCrops, plantingSeasonCropsDelete } from 'utils/Api'
import { updateSeason } from '_redux/actions/season'
import { updatePSeason} from '_redux/actions/plaintingSeason'
import 'css/index/field/addSeason.scss'

class AddSeason extends Component {
  constructor() {
    super()
    this.state = {
      saved: false,
      value: '',
      seasons: [],             // 季节列表
      plantingSeasonCrops: [],  // 种植季作物,
      criosAndVarieties: []
    }
  }
  submitHandler = (e) => {
    e.preventDefault()
    const fd = new FormData()
    const { feature: { feature } } = this.props
    const id = feature.getId().replace(/tb_farmland./g, '')
    if (!this.state.value) {
      alert('请先选择季节！')
      return
    }
    const info = {
      landId: id,
      seasonId: this.state.value.value
    }
    fd.append('info', JSON.stringify(info))
    plantingSeasonSave(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          const res= data.result
          fd.append('landId', id)
          findPlantingSeasonList(fd)
            .then(e => e.data)
            .then(data => {
              if (data.msg === '200') {
                this.props.updateSeason(data.result || [])
                this.props.updatePSeason({
                  id: res,
                  name: this.state.value.label,
                  inSeason: '0'
                })
              }
            })
          this.setState({
            saved: true
          })
        } else {
          alert(data.result)
        }
      })
  }
  seasonChange = (value) => {
    this.setState({
      value: value
    })
  }
  componentDidMount() {
    findCriosAndVarietiesList()
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          this.setState({
            criosAndVarieties: data.result
          })
        }
      }).then(e => {
        const { plantingSeason: { plaintSeason } } = this.props
        if (plaintSeason.id.toString().length === 32) {
          const fd = new FormData()
          fd.append('plantingSeasonId', plaintSeason.id)
          findPlantingSeasonCrops(fd)
            .then(e => e.data)
            .then(data => {
              if (data.msg === '200') {
                this.setState({
                  saved: true,
                  plantingSeasonCrops: data.result || []
                })
              }
            })
        } else {
          findSeasonLists()
            .then(e => e.data)
            .then(data => {
              if (data.msg === '200') {
                data.result = data.result || []
                this.setState({
                  seasons: data.result.map((res) => ({
                    label: res.name,
                    value: res.id
                  }))
                })
              }
            })
        }
      })
    
    
  }
  componentDidUpdate(prevProps) {
    const { plantingSeason: { plaintSeason} } = this.props
    const { plantingSeason: { plaintSeason: prevPlantingSeason } } = prevProps
    if (plaintSeason.id.toString().length === 32) {
      if (plaintSeason.id !== prevPlantingSeason.id) {
        const fd = new FormData()
        fd.append('plantingSeasonId', plaintSeason.id)
        findPlantingSeasonCrops(fd)
          .then(e => e.data)
          .then(data => {
            if (data.msg === '200') {
              this.setState({
                saved: true,
                plantingSeasonCrops: data.result || []
              })
            }
          })
      }
    }
  }
  update = () => {
    // const { plantingSeason: { plaintSeason} } = this.props
    // const fd = new FormData()
    // fd.append('plantingSeasonId', plaintSeason.id)
    // findPlantingSeasonCrops(fd)
    //   .then(e => e.data)
    //   .then(data => {
    //     if (data.msg === '200') {
    //       this.setState({
    //         saved: true,
    //         plantingSeasonCrops: data.result || []
    //       })
    //     }
    //   })
    return findCriosAndVarietiesList()
      .then(e => e.data)
      .then(data => {
        if(data.msg === '200') {
          this.setState({
            criosAndVarieties: data.result
          })
          return data.result
        }
      })
  }
  addSeasonCrop = () => {
    // this.setState({
    const { plantingSeasonCrops} = this.state
    const { plantingSeason: { plaintSeason}} = this.props
    plantingSeasonCrops.push({
      id: Date.now(),
      plantingSeasonId: plaintSeason.id
    })
    this.setState({
      plantingSeasonCrops
    })
    // })
  }
  deleteCropById = (id) => {
    const { plantingSeasonCrops} = this.state
    if (id.toString().length === 13) {
      this.setState({
        plantingSeasonCrops: plantingSeasonCrops.filter(p => p.id !== id)
      })
      return
    }
    const fd = new FormData()
    fd.append('id', id)
    plantingSeasonCropsDelete(fd)
      .then(e => e.data)
      .then(data => {
        console.log(data)
        if(data.msg === '200') {
          this.setState({
            plantingSeasonCrops: plantingSeasonCrops.filter(p => p.id !== id)
          })
          return
        }
      })
    
  }
  render() {
    const { plantingSeason: { plaintSeason} } = this.props
    const {plantingSeasonCrops} = this.state
    return (
      <div className='add-season' style={{width: (this.state.plantingSeasonCrops.length === 0 ? '700px' : '1280px')}}>
        {
          plaintSeason.id.toString().length===32 &&  <div className='relative'>
            <div className='absolute'>
              <div className='all'>
                本田地、本种植季共播种{plantingSeasonCrops.length}种作物
              </div>
              <div className='detail'>
                未种植：{plantingSeasonCrops.filter(p => p.status === '0').length}；
                种植中：{plantingSeasonCrops.filter(p => p.status === '1').length}；
                已收割：{plantingSeasonCrops.filter(p => p.status === '2').length}；
                已放弃：{plantingSeasonCrops.filter(p => p.status === '3').length}
              </div>
            </div>
          </div>
        }
        <form onSubmit={this.submitHandler}>
          <div className='input-group'>

            <label htmlFor="">种植季</label>
            {plaintSeason.id.toString().length !== 32 ? <Select
              classNamePrefix='react-select'
              placeholder=''
              noResultsText='无'
              onChange={this.seasonChange}
              options={
                this.state.seasons
              }
              value={this.state.value}
            ></Select> : <div>{plaintSeason.name}</div>}
            {!this.state.saved && <input type="submit" className='button save' value='保存' />}
          </div>
          
        </form>
        {
          this.state.plantingSeasonCrops.map((crop) => 
            <AddCrop
              key={crop.id} 
              crops={crop}
              update={this.update}
              criosAndVarieties={this.state.criosAndVarieties}
              deleteCropById={this.deleteCropById.bind(this,crop.id)}/>)
        }
        {this.state.saved && <button className='button add' onClick={this.addSeasonCrop}>
          +增加一种作物
        </button>}
      </div>
    )
  }
}
AddSeason.propTypes = {
  feature: PropTypes.object,
  updateSeason: PropTypes.func,
  plantingSeason: PropTypes.object,
  updateWidth: PropTypes.func,
  updatePSeason: PropTypes.func,
}
const mapStateToProps = (state) => {
  return {
    feature: state.feature
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    updateSeason: (season) => {
      dispatch(updateSeason(season))
    },
    updatePSeason: (plaintingSeason) => {
      dispatch(updatePSeason(plaintingSeason))
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(AddSeason)