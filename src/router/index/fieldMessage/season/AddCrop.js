import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Select from 'react-select'
import { findCriosAndVarietiesList, findCroppingPatternList, plantingSeasonCropsSave } from 'utils/Api'
import CreatableSelect from 'react-select/lib/Creatable'
// import AddComFer from './AddComFer'
import AddSingFer from './AddSingFer'

const statusArr = [{
  label: '未种植',
  value: '0'
},{
  value: '1',
  label: '种植中'
},{
  value: '2',
  label: '已收割'
},{
  value: '3',
  label: '已放弃'
}]
const soilPreArr =  [{
  value: '0',
  label: '免耕'
},{
  value: '1',
  label: '浅耕'
},{
  value: '2',
  label: '深耕'
}]
class AddCrop extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      isLoading: false,
      collapsed: false,
      options: [],
      value: '',
      crios: [],
      varieties: [],
      croppingPattern: [],
      crop: '',
      variety: '',
      status: '',
      soilPreparation: '',
      density: '',
      plantingType: '',
      maxProduction: '',
      minProduction: '',
      fertilizers: [],
      saving: false,
      update: false
    }
  }
  updateFertilizers = (fertilizers) => {
    this.setState({
      fertilizers
    })
  }
  handleChange = (newValue, actionMeta) => {
    this.setState({ value: newValue })
  };
  handleCreate = (inputValue, actionMeta) => {
    this.setState({
      value: {
        label: inputValue,
        value: ''
      },
    })
  }
  componentDidMount() {
    const { crops } = this.props
   
    findCriosAndVarietiesList()
      .then(e => e.data)
      .then(data => {
        if(data.msg === '200') {
          this.setState({
            crios: data.result,
            options: data.result[0].list || []
          })
        }
      }).then(() => {
        if (crops.id.toString().length === 32) {
          return crops 
        } else {
          return undefined
        }
      }).then(crops => {
        if (!crops) {
          return
        }
        const crop = this.state.crios.filter(c => c.id === crops.cropsId)[0]
        const fd = new FormData()
        fd.append('cropsId', crop.id)
        findCroppingPatternList(fd)
          .then(e => e.data)
          .then(data => {
            if (data.msg === '200') {
              crops.crop = crop
              crops.croppingPattern = data.result || []
              return crops
            }
          }).then(crops => {
            const {
              id,
              crop,
              varietiesId = '',
              croppingPattern = [],
              status = '',
              soilPreparation = '',
              density = '',
              plantingType = '',
              maxProduction = '',
              minProduction = '',
              fertilizers = []
            } = crops
            if (!crop.list) {
              crop.list = []
            }
            const varieties = crop.list.filter(v => v.id === varietiesId)[0] || ''
            const type = croppingPattern.filter(c => c.id === plantingType)[0] || ''
            this.setState({
              id,
              crop: {
                label: crop.name,
                value: crop.id
              },
              value: varieties.name ? {
                label: varieties.name,
                value: varieties.id
              } : varieties,
              croppingPattern,
              options: crop.list,
              status: statusArr.filter(s => s.value === status)[0] || '',
              soilPreparation: soilPreArr.filter(s => s.value === soilPreparation)[0] || '',
              plantingType:type ? {
                label: type.model,
                value: type.id
              } : '',
              density,
              maxProduction,
              minProduction,
              fertilizers,
              update: true
            })
          })
      })
  }
  submitHandler = (e) => {
    e.preventDefault()
    const info = {}
    if (this.state.id.toString().length === 32) {
      info.id = this.state.id
      
    }
    if (!this.state.crop) {
      alert('请选择作物')
      return
    }
    info.plantingSeasonId = this.props.crops.plantingSeasonId
    console.log(this.state.crop)
    info.cropsId = this.state.crop.value
    info.cropsName = this.state.crop.label
    if (!!this.state.value) {
      if (!this.state.value.value) {
        info.varietiesName = this.state.value.label
      } else {
        info.varietiesId = this.state.value.value
        info.varietiesName = this.state.value.label
      }
    }
    !!this.state.status.value && (info.status = this.state.status.value)
    !!this.state.soilPreparation.value && (info.soilPreparation = this.state.soilPreparation.value)
    !!this.state.density && (info.density = this.state.density)
    !!this.state.plantingType.value && (info.plantingType = this.state.plantingType.value)
    !!this.state.maxProduction && (info.maxProduction = this.state.maxProduction)
    !!this.state.minProduction && (info.minProduction = this.state.minProduction)
    // info.composites = this.state.composites
    // info.singles = this.state.singles

    const {backFile,frontFile,tableData} = this.fertilizers.state

    !!tableData.length && ( info.fertilizers = tableData.map(t => ({
      ...t,
      type: t.type.value
    })))
    console.log(backFile,frontFile,tableData)
    const fd = new FormData()
    fd.append('info', encodeURI(JSON.stringify(info)))
    Object.keys(backFile).map(f => fd.append(f, backFile[f]))
    Object.keys(frontFile).map(f => fd.append(f, frontFile[f]))
    this.setState({
      saving: true
    })
    plantingSeasonCropsSave(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          const {
            id,
            cropsId,
            varietiesId = '',
            status = '',
            soilPreparation = '',
            density = '',
            plantingType = '',
            maxProduction = '',
            minProduction = '',
            fertilizers = []
          } = data.result
          const crop = this.state.crios.filter(c => c.id === cropsId)[0]
          if (!crop.list) {
            crop.list = []
          }
          const varieties = crop.list.filter(v => v.id === varietiesId)[0] || ''
          const type = this.state.croppingPattern.filter(c => c.id === plantingType)[0] || ''
          this.setState({
            id,
            crop: {
              label: crop.name,
              value: crop.id
            },
            value: varieties.name ? {
              label: varieties.name,
              value: varieties.id
            } : varieties,
            options: crop.list,
            status: statusArr.filter(s => s.value === status)[0] || '',
            soilPreparation: soilPreArr.filter(s => s.value === soilPreparation)[0] || '',
            plantingType: type ? {
              label: type.model,
              value: type.id
            } : '',
            density,
            fertilizers,
            update: true,
            maxProduction,
            minProduction,
            saving: false,
            
          })
        }
      })
  }
  cropChange = (value) => {
    if (value.value === this.state.crop.value) {
      return
    }
    const { crios } = this.state
    const options = crios.filter(crio => crio.id === value.value)[0]
    const fd = new FormData()
    fd.append('cropsId', value.value)
    findCroppingPatternList(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          this.setState({
            croppingPattern: data.result || [],
            plantingType: '',
            crop: value,
            value: '',
            options: options.list || []
          })
        } else {
          this.setState({
            crop: value,
            value: '',
            options: options.list || []
          })
        }
      })
  }
  statusChange = (value) => {
    this.setState({
      status: value
    })
  }
  preparationChange = (value) => {
    this.setState({
      soilPreparation: value
    })
  }
  plantingTypeChange = (value) => {
    this.setState({
      plantingType: value
    })
  }
  inputChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }
  collapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  updateNo = () => {
    this.setState({
      update: false
    })
  }
  render() {
    console.log(this.state.fertilizers)
    const { isLoading, options, value } = this.state
    return (
      <div className='add-crop'>
        <div
          className={
            classnames({
              collapse: true,
              borderRadius: this.state.collapsed
            })
          }
          onClick={this.collapsed}>{!this.state.collapsed ? '展开列表' : '折叠列表'}</div>
        <form onSubmit={this.submitHandler} className={
          classnames({
            panelBody: true,
            hide: !this.state.collapsed
          })
        }>
          <div className='warp'>
            <div className='input-group'>
              <label htmlFor="">作物</label>
              <Select
                classNamePrefix='react-select'
                placeholder=''
                noResultsText='无'
                onChange={this.cropChange}
                value={this.state.crop}
                options={
                  this.state.crios.map(ciro => ({
                    label: ciro.name,
                    value: ciro.id
                  }))
                
                }></Select>
            </div>
            <div className='input-group'>
              <label htmlFor="">品种</label>
              <CreatableSelect
                className='react-select1'
                classNamePrefix='react-select'
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={this.handleChange}
                onCreateOption={this.handleCreate}
                options={
                  options.map(ciro => ({
                    label: ciro.name,
                    value: ciro.id
                  }))
                }
                value={value}
              />
            </div>
            <div className='input-group'>
              <label htmlFor="">当前状态</label>
              <Select
                classNamePrefix='react-select'
                placeholder=''
                noResultsText='无'
                value={this.state.status}
                onChange={this.statusChange}
                options={
                  // （0:未种植;1:种植中;2:已收割;3:已放弃）
                  statusArr
                }></Select>
            </div>
            <div className='input-group'>
              <label htmlFor="">整地类型</label>
              <Select
                classNamePrefix='react-select'
                placeholder=''
                noResultsText='无'
                onChange={this.preparationChange}
                value={this.state.soilPreparation}
                options={
                  // (0：免耕;1：浅耕;2：深耕)
                  soilPreArr
                }></Select>
            </div>
            <div className='input-group'>
              <label htmlFor="">播种密度</label>
              <input 
                type="text" 
                name='density' 
                value={this.state.density} 
                onChange={this.inputChange}/>
              <span>（株/亩）</span>
            </div>
            <div className='input-group'>
              <label htmlFor="">种植模式</label>
              <Select
                classNamePrefix='react-select'
                placeholder=''
                noResultsText='无'
                value={this.state.plantingType}
                onChange={this.plantingTypeChange}
                options={
                  this.state.croppingPattern.map(crop => ({
                    label: crop.model,
                    value: crop.id
                  }))
                }></Select>
            </div>
            <div className='input-group'>
              <label htmlFor="">历史最高产量</label>
              <input 
                type="text" 
                name='maxProduction' 
                value={this.state.maxProduction} 
                onChange={this.inputChange}/>
            </div>
            <div className='input-group'>
              <label htmlFor="">历史最低产量</label>
              <input
                type="text" 
                name='minProduction' 
                value={this.state.minProduction} 
                onChange={this.inputChange}/>
              <span>（公斤/亩）</span>
            </div>
          </div>
          <div className='fer'>
            <div className='fer-title'>用肥情况</div>
            {/* <AddComFer ref={comFer => this.comFer = comFer}/> */}
            <AddSingFer 
              update={this.state.update}
              updateNo={this.updateNo}
              fertilizers={this.state.fertilizers} 
              updateFertilizers={this.updateFertilizers} 
              ref={fertilizers => this.fertilizers = fertilizers}/>
          </div>
          
          <div className='action'>
            <input type="submit" className='button' value={this.state.saving ? '保存中' : '保存'} disabled={this.state.saving}/>
            <button type='button' className='button'>删除</button>
          </div>
        </form>
      </div>
    )
  }
}
AddCrop.propTypes = {
  crops: PropTypes.object
}
export default AddCrop