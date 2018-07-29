import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import AddCrop from './AddCrop'
import { connect } from 'react-redux'
import { findSeasonLists, plantingSeasonSave, findPlantingSeasonList, findPlantingSeasonCrops } from 'utils/Api'
import { updateSeason } from '_redux/actions/plaintingSeason'

class AddSeason extends Component {
  constructor() {
    super()
    this.state = {
      saved: false,
      value: '',
      seasons: [],
      plantingSeasonCrops: []
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
          fd.append('landId', id)
          findPlantingSeasonList(fd)
            .then(e => e.data)
            .then(data => {
              if (data.msg === '200') {
                this.props.updateSeason(data.result || [])
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
    const { plantingSeason } = this.props
    console.log(this.props)
    if (plantingSeason.id.toString().length === 32) {
      const fd = new FormData()
      fd.append('plantingSeasonId', plantingSeason.id)
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
  }
  componentDidUpdate(prevProps) {
    const { plantingSeason } = this.props
    const { plantingSeason: prevPlantingSeason } = prevProps
    if (plantingSeason.id.toString().length === 32) {
      if (plantingSeason.id !== prevPlantingSeason.id) {
        const fd = new FormData()
        fd.append('plantingSeasonId', plantingSeason.id)
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
  addSeasonCrop = () => {
    // this.setState({
    const { plantingSeasonCrops} = this.state
    const {plantingSeason} = this.props
    plantingSeasonCrops.push({
      id: Date.now(),
      plantingSeasonId: plantingSeason.id
    })
    this.setState({
      plantingSeasonCrops
    })
    // })
  }
  render() {
    const { plantingSeason } = this.props
    const {plantingSeasonCrops} = this.state
    return (
      <div className='add-season'>
        {
          plantingSeason.id.toString().length===32 &&  <div className='relative'>
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
            {plantingSeason.id.toString().length !== 32 ? <Select
              classNamePrefix='react-select'
              placeholder=''
              noResultsText='无'
              onChange={this.seasonChange}
              options={
                this.state.plantingSeasons
              }
              value={this.state.value}
            ></Select> : <div>{plantingSeason.name}</div>}
            {!this.state.saved && <input type="submit" className='button save' value='保存' />}
          </div>
          
        </form>
        {
          this.state.plantingSeasonCrops.map((crop) => <AddCrop key={crop.id} crops={crop} />)
        }
        <button className='button add' onClick={this.addSeasonCrop}>
          +增加一种作物
        </button>
      </div>
    )
  }
}
AddSeason.propTypes = {
  feature: PropTypes.object,
  updateSeason: PropTypes.func,
  plantingSeason: PropTypes.object
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
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(AddSeason)