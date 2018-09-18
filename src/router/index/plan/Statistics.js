import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table, Input } from 'antd'
import { updateTargetVo } from '_redux/actions/cropPlan'
import { toast } from 'react-toastify'
const columns = [{
  title: '',
  dataIndex: 'text',
  className: 'column'
}, {
  title: 'N',
  dataIndex: 'nitrogen',
  // render: text => <a href="javascript:;">{text}</a>,
}, {
  title: <span>P<sub>2</sub>O<sub>5</sub></span>,
  dataIndex: 'phosphorus',
}, {
  title: <span>K<sub>2</sub>O</span>,
  dataIndex: 'potassium',
}, {
  title: <span>S</span>,
  dataIndex: 'sulfur',
}, {
  title: <span>Zn</span>,
  dataIndex: 'zinc',
}, {
  title: <span>B</span>,
  dataIndex: 'boron',
}]

class Statistics extends Component {
  format = (value) => {
    if (typeof value === 'undefined') {
      return 0
    }
    const { cropPlan: { unit, prevUnit } } = this.props
    if (unit === 1) {
      return (Number(value) / 15).toFixed(2)
    } else if (unit === 0) {
      return Number(value).toFixed()
    } else if (unit === 2) {
      if (prevUnit === 0) {
        return Number(value).toFixed()
      } else if (prevUnit === 1) {
        return (Number(value) / 15).toFixed(2)
      }
    }
  }
  inputChange = (e) => {
    const {name, value } = e.target
    const { cropPlan: { unit, targetVo, prevUnit } } = this.props
    if (unit === 3) {
      toast.error('百分比情况下，不可输入，请切换到其他单位')
      return
    }
    this.props.updateTargetVo({
      ...targetVo,
      [name]: unit === 0 ? value :
        unit === 1 ? (Number(value) * 15).toFixed(2) : 
          prevUnit === 0 ? (Number(value)).toFixed() :
            prevUnit === 1 ? (Number(value) * 15).toFixed() : ''
    })
  }
  render() {
    const { cropPlan } = this.props
    const { contrastStats, originStats, targetVo } = cropPlan
    return <div className='statistics'>
      <Table
        columns={columns}
        dataSource={[
          {
            key: 1,
            text: '对照方案',
            nitrogen: this.format(contrastStats.nitrogen),
            phosphorus: this.format(contrastStats.phosphorus),
            potassium: this.format(contrastStats.potassium),
            sulfur: this.format(contrastStats.sulfur),
            zinc: this.format(contrastStats.zinc),
            boron: this.format(contrastStats.boron)
          }, {
            key: 2,
            text: '原始方案',
            nitrogen: this.format(originStats.nitrogen),
            phosphorus: this.format(originStats.phosphorus),
            potassium: this.format(originStats.potassium),
            sulfur: this.format(originStats.sulfur),
            zinc: this.format(originStats.zinc),
            boron: this.format(originStats.boron)
          }, {
            key: 3,
            text: '目标需求',
            nitrogen: <Input name='nitrogen' value={this.format(targetVo.nitrogen)} onChange={this.inputChange} />,
            phosphorus: <Input name='phosphorus' value={this.format(targetVo.phosphorus)} onChange={this.inputChange} />,
            potassium: <Input name='potassium' value={this.format(targetVo.potassium)} onChange={this.inputChange} />,
            sulfur: <Input name='sulfur' value={this.format(targetVo.sulfur)} onChange={this.inputChange} />,
            zinc: <Input name='zinc' value={this.format(targetVo.zinc)} onChange={this.inputChange} />,
            boron: <Input name='boron' value={this.format(targetVo.boron)} onChange={this.inputChange} />
          }
        ]}
        bordered
        size={'small'}
        // showHeader={false}
        title={undefined}
        footer={undefined}
        pagination={false}
      />
    </div>
  }

}
Statistics.propTypes = {
  cropPlan: PropTypes.object,
  updateTargetVo: PropTypes.func
}
export default connect(({ cropPlan }) => ({ cropPlan }), (dispatch) => ({
  updateTargetVo: (targetVo) => dispatch(updateTargetVo(targetVo))
}))(Statistics)