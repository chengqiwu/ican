import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Select from 'react-select'
import { findCroppingPatternList, plantingSeasonCropsSave } from 'utils/Api'
import CreatableSelect from 'react-select/lib/Creatable'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import zh from 'moment/locale/zh-cn'
moment.locale('zh')
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
      update: false,
      edit: false,
      store: null,
      sowingDate: moment()
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
    const { crops, criosAndVarieties } = this.props
    
    this.setState({
      crios: criosAndVarieties,
      options: criosAndVarieties[0].list || []
    })
    if (crops.id.toString().length === 32) {
      const crop = criosAndVarieties.filter(c => c.id === crops.cropsId)[0]
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
          const store = {
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
          }
          this.setState({
            store,
            ...store,
            update: true
          })
        })
    } else {
      this.setState({
        collapsed: true,
        edit: true
      })
    }
  }
  restore = () => {
    this.setState({
      edit: false,
      ...this.state.store
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
    info.sowingDate = this.state.sowingDate
    !!this.state.status.value && (info.status = this.state.status.value)
    !!this.state.soilPreparation.value && (info.soilPreparation = this.state.soilPreparation.value)
    !!this.state.density && (info.density = this.state.density)
    !!this.state.plantingType.value && (info.plantingType = this.state.plantingType.value)
    !!this.state.maxProduction && (info.maxProduction = this.state.maxProduction)
    !!this.state.minProduction && (info.minProduction = this.state.minProduction)
    // info.composites = this.state.composites
    // info.singles = this.state.singles

    const {backFile,frontFile,tableData, model} = this.fertilizers.state

    !!tableData.length && ( info.fertilizers = tableData.map(t => {
      if (model === 0) {
        return {
          ...t,
          magnesium: undefined,
          copper: undefined,
          iron: undefined,
          manganese: undefined,
          type: t.type.value,
          category: t.category.value
        }
      } else {
        return {
          ...t,
          type: t.type.value,
          category: t.category.value
        }
      }
    }))

    const fd = new FormData()
    fd.append('info', (JSON.stringify(info)))
    Object.keys(backFile).map(f => fd.append(f, backFile[f]))
    Object.keys(frontFile).map(f => fd.append(f, frontFile[f]))
    this.setState({
      saving: true
    })
    plantingSeasonCropsSave(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          this.props.update()
            .then(criosAndVarieties => {
              this.setState({
                crios: criosAndVarieties,
                options: criosAndVarieties[0].list || []
              })
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
                fertilizers = [],
                sowingDate
              } = data.result
              const crop = criosAndVarieties.filter(c => c.id === cropsId)[0]
              if (!crop.list) {
                crop.list = []
              }
              const varieties = crop.list.filter(v => v.id === varietiesId)[0] || ''
              const type = this.state.croppingPattern.filter(c => c.id === plantingType)[0] || ''
              const store = {
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
                sowingDate: moment(new Date(sowingDate)),
                fertilizers,
                update: true,
                maxProduction,
                minProduction,
              }
              this.setState({
                store,
                ...store,
                saving: false,
                edit: false
              })
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
  delete = () => {
    this.props.deleteCropById()
  }
  activeEdit = () => {
    this.setState({
      edit: true
    })
  }
  dateChange = (date) => {
    this.setState({
      sowingDate: date
    })
  }
  render() {
    const { isLoading, options, value, crop } = this.state
    return (
      <div className='add-crop'>
        <div
          className={
            classnames({
              collapse: true,
              borderRadius: this.state.collapsed
            })
          }
          onClick={this.collapsed}>{!!crop ? `${crop.label} - ` : ''}{!this.state.collapsed ? '展开列表' : '折叠列表'}</div>
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
                isDisabled={!this.state.edit}
                noResultsText='无'
                onChange={this.cropChange}
                value={this.state.crop}
                maxMenuHeight={'200'}
                noOptionsMessage={() => {return '无选项'}}
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
                isDisabled={!this.state.edit}
                // isDisabled={isLoading}
                isLoading={isLoading}
                onChange={this.handleChange}
                onCreateOption={this.handleCreate}
                noOptionsMessage={() => {return '无选项'}}
                placeholder={'选择或创建品种'}
                formatCreateLabel={(value) => `创建'${value}'品种`}
                options={
                  options.map(ciro => ({
                    label: ciro.name,
                    value: ciro.id
                  }))
                }
                value={value}
              />
            </div>
            <div className='input-group' style={{marginLeft: '5px'}}>
              <label htmlFor="">当前状态</label>
              <Select
                classNamePrefix='react-select'
                placeholder=''
                noResultsText='无'
                isDisabled={!this.state.edit}
                value={this.state.status}
                onChange={this.statusChange}
                noOptionsMessage={() => {return '无选项'}}
                maxMenuHeight={'200'}
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
                isDisabled={!this.state.edit}
                onChange={this.preparationChange}
                value={this.state.soilPreparation}
                noOptionsMessage={() => {return '无选项'}}
                maxMenuHeight={'200'}
                options={
                  // (0：免耕;1：浅耕;2：深耕)
                  soilPreArr
                }></Select>
            </div>
            <div className='input-group'>
              <label htmlFor="">播种日期</label>
              <DatePicker
                dateFormat="YYYY-MM-DD"
                selected={this.state.sowingDate}
                onChange={this.dateChange}
                disabled={!this.state.edit}
              />
            </div>
            
            <div className='input-group'>
              <label htmlFor="">播种密度</label>
              <input 
                type="number" 
                name='density'
                disabled={!this.state.edit}
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
                isDisabled={!this.state.edit}
                value={this.state.plantingType}
                onChange={this.plantingTypeChange}
                noOptionsMessage={() => {return '无选项'}}
                maxMenuHeight={'200'}
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
                type="number" 
                disabled={!this.state.edit}
                name='maxProduction' 
                value={this.state.maxProduction} 
                onChange={this.inputChange}/>
            </div>
            <div className='input-group'>
              <label htmlFor="">历史最低产量</label>
              <input
                type="number"
                disabled={!this.state.edit}
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
              disabled={!this.state.edit}
              updateFertilizers={this.updateFertilizers} 
              ref={fertilizers => this.fertilizers = fertilizers}/>
          </div>
          {
            this.state.edit ? <div className='action'>
              <input type="submit" className='button' value={this.state.saving ? '保存中' : '保存'} disabled={this.state.saving}/>
              {this.state.id && <button type='button' className='button no-save' onClick={this.restore}>放弃</button>}
            </div> : <div className='action'>
              <button type='button' className='button' onClick={this.activeEdit}>编辑</button>
              <button type='button' className='button' onClick={this.delete}>删除</button>
            </div>
          }
          
        </form>
      </div>
    )
  }
}
AddCrop.propTypes = {
  crops: PropTypes.object,
  deleteCropById: PropTypes.func,
  update: PropTypes.func,
  criosAndVarieties: PropTypes.array
}
export default AddCrop