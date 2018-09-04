import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable'
class Crop extends Component {
  constructor() {
    super()
  }
  render() {
    const { isLoading, options, value, crop } = this.props
    return (<div className='warp crop'>
      <div className='warp-title'>
        作物
      </div>
      <div className='warp-content'>
       
        <div className='input-group'>
          <label htmlFor="">名称</label>
          <Select
            classNamePrefix='custom-select'
            className='custom-select'
            placeholder=''
            isDisabled={!this.props.edit}
            noResultsText='无'
            onChange={this.props.cropChange}
            value={crop}
            maxMenuHeight={'200'}
            noOptionsMessage={() => {return '无选项'}}
            options={
              this.props.crios.map(ciro => ({
                label: ciro.name,
                value: ciro.id
              }))
            
            }></Select>
        </div>
        <div className='input-group'>
          <label htmlFor="">品种</label>
          <CreatableSelect
            classNamePrefix='custom-select'
            className='custom-select'
            isClearable
            isDisabled={!this.props.edit}
            // isDisabled={isLoading}
            isLoading={isLoading}
            onChange={this.props.handleChange}
            onCreateOption={this.props.handleCreate}
            noOptionsMessage={() => {return '无选项'}}
            placeholder={'选择或创建品种'}
            formatCreateLabel={(value) => `创建'${value}'品种`}
            options={
              options.map(ciro => ({
                label: ciro.name,
                value: ciro.id
              }))
            }
            value={this.props.value}
          />
        </div>
        <div className='input-group'>
          <label htmlFor="">种植模式</label>
          <Select
            classNamePrefix='custom-select'
            className='custom-select'
            placeholder=''
            noResultsText='无'
            isDisabled={!this.props.edit}
            value={this.props.plantingType}
            onChange={this.props.plantingTypeChange}
            noOptionsMessage={() => {return '无选项'}}
            maxMenuHeight={'200'}
            options={
              this.props.croppingPattern.map(crop => ({
                label: crop.model,
                value: crop.id
              }))
            }></Select>
        </div>
        <div className='input-group'>
          <label htmlFor="">最高产量</label>
          <input 
            type="number" 
            min="0.0"
            disabled={!this.props.edit}
            name='maxProduction' 
            value={this.props.maxProduction} 
            onChange={this.props.inputChange}/>
          <span className='unit'>公斤/亩</span>
        </div>
        <div className='input-group'>
          <label htmlFor="">最低产量</label>
          <input
            type="number"
            min="0.0"
            // placeholder={'公斤/亩'}
            disabled={!this.props.edit}
            name='minProduction' 
            value={this.props.minProduction} 
            onChange={this.props.inputChange}/>
          <span className='unit'>公斤/亩</span>
        </div>
      </div>
    </div>
    )  
  }
}
Crop.propTypes = {
  edit: PropTypes.bool,
  crios: PropTypes.array,
  croppingPattern: PropTypes.array,
  isLoading: PropTypes.bool,
  cropChange: PropTypes.func,
  crop: PropTypes.object,
  options: PropTypes.array,
  handleChange: PropTypes.func,
  handleCreate: PropTypes.func,
  value: PropTypes.string,
  plantingType: PropTypes.object,
  plantingTypeChange: PropTypes.func,

  maxProduction: PropTypes.string,
  minProduction: PropTypes.string,
  inputChange: PropTypes.func
}
export default Crop