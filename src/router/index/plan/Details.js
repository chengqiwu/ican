import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import zh from 'moment/locale/zh-cn'
moment.locale('zh')
import { connect } from 'react-redux'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import { Input, DatePicker } from 'antd'
import { updateDetail, updateSchedule } from '_redux/actions/cropPlan'
class Details extends Component {
  constructor(props) {
    super(props)
  }
  onDateChange = (date, dateString) => {
    const { cropPlan: { details, schedule} } = this.props
    this.props.updateDetail({
      ...details,
      sowingDate: date.format('YYYY-MM-DD')
    })
    
    this.props.updateSchedule(schedule.map(s => ({
      ...s,
      executionDate: date.add(s.afterSwoDays, 'days').format('YYYY-MM-DD')
    })))
  }
  inputChange = (e) => {
    const {name, value} = e.target
    const { cropPlan: { details } } = this.props
    this.props.updateDetail({
      ...details,
      [name]: value
    })
  }
  render() {
    const { cropPlan: { details : vo } } = this.props
    return(
      <div className='details'>
        <div className='input-group'>
          <label htmlFor="">品种：</label>
          <span>{vo.varietiesName}</span>
        </div>
        <div className='input-group'>
          <label htmlFor="">播种日期：</label>
          <DatePicker
            allowClear={false}
            locale={locale}
            value={vo.sowingDate ? moment(vo.sowingDate, 'YYYY-MM-DD') : undefined}
            onChange={this.onDateChange}
            autoFocus={true}
            placeholder={'选择日期'}
            size={'small'}
            showToday={true}
            format={'DD/MM/YYYY'}
          /> 
        </div>
        <div className='input-group'>
          <label htmlFor="">有机质：</label>
          <Input 
            name='organicMatter'
            value={vo.organicMatter}
            onChange={this.inputChange}
          />
        </div>
        <div className='input-group'>
          <label htmlFor="">pH：</label>
          <Input
            name='ph'
            value={vo.ph}
            onChange={this.inputChange}
          />
        </div>
        <div className='input-group'>
          <label htmlFor="">播种密度：</label>
          <span>{vo.density}</span>
        </div>
        <div className='input-group'>
          <label htmlFor="">覆膜：</label>
          <span>{vo.laminating === '0' ? '无' : '有'}</span>
        </div>
      </div>
    )
  }
}

Details.propTypes = {
  cropPlan: PropTypes.object,
  updateDetail: PropTypes.func,
  updateSchedule: PropTypes.func,
}

export default connect(({ cropPlan }) => ({ cropPlan }), (dispatch) => ({
  updateDetail: (details) => dispatch(updateDetail(details)),
  updateSchedule: (schedule) => dispatch(updateSchedule(schedule))
}))(Details)