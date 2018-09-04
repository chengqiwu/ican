import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Select from 'react-select'
import DatePicker from 'react-datepicker'

class Planting extends Component {
 
  render() {
    return (<div className='warp planting'>
      <div className='warp-title'>
        种植
      </div>
      <div className='warp-content'>
        <div className='input-group'>
          <label htmlFor="">整地方式</label>
          <Select
            classNamePrefix='custom-select'
            className='custom-select'
            placeholder=''
            noResultsText='无'
            isDisabled={!this.props.edit}
            onChange={this.props.preparationChange}
            value={this.props.soilPreparation}
            noOptionsMessage={() => {return '无选项'}}
            maxMenuHeight={'200'}
            options={
              // (0：免耕;1：浅耕;2：深耕)
              this.props.soilPreArr
            }></Select>
        </div>
        <div className='input-group'>
          <label htmlFor="">播种日期</label>
          <DatePicker
            dateFormat="YYYY-MM-DD"
            selected={this.props.sowingDate}
            onChange={this.props.dateChange}
            disabled={!this.props.edit}
          />
        </div>
        <div className='input-group'>
          <label htmlFor="">播种密度</label>
          <input 
            type="number" 
            min="0.0"
            name='density'
            disabled={!this.props.edit}
            value={this.props.density} 
            // placeholder={'株/亩'}
            onChange={this.props.inputChange}/>
          <span className='unit'>株/亩</span>
        </div>
        <div className='input-group'>
          <label htmlFor="">种植状态</label>
          <Select
            classNamePrefix='custom-select'
            className='custom-select'
            placeholder=''
            noResultsText='无'
            isDisabled={!this.props.edit}
            value={this.props.status}
            onChange={this.props.statusChange}
            noOptionsMessage={() => {return '无选项'}}
            maxMenuHeight={'200'}
            options={
              // （0:未种植;1:种植中;2:已收割;3:已放弃）
              this.props.statusArr
            }></Select>
        </div>
      </div>
    </div>
    )  
  }
}
Planting.propTypes = {
  edit: PropTypes.bool,
  status: PropTypes.object,
  statusChange: PropTypes.func,
  sowingDate: PropTypes.object,
  dateChange: PropTypes.func,
  density: PropTypes.string,
  inputChange: PropTypes.func,
  preparationChange: PropTypes.func,
  soilPreparation: PropTypes.object,
  statusArr: PropTypes.array,
  soilPreArr: PropTypes.array
}
export default Planting