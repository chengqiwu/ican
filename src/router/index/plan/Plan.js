import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Table, Button, Input, Select } from 'antd'
import { updateContrast, updateOrigin } from '_redux/actions/cropPlan'
// import PlanSummary from './PlanSummary'
import delete2 from 'images/index/crop/delete.png'
import { DebounceInput } from 'react-debounce-input'
import { toast } from 'react-toastify'
const Option = Select.Option


class OriginPlan extends Component {
  constructor() {
    super()
    this.state = {
      unit: 0
    }
  }
  columns = [{
    title: '肥料',
    dataIndex: 'category',
    className: 'noBottomBorder noRightBorder noLeftBorder',
    render: (value, row, index) => {
      if (row.key === -1) {
        return '' 
      }
      return <Select defaultValue="0" value={value} name='category' size={'small'} onChange={this.categoryChange.bind(this, row.key)}>
        <Option value="0">尿素</Option>
        <Option value="1">一铵</Option>
        <Option value="2">二铵</Option>
        <Option value="3">硫酸钾</Option>
        <Option value="4">硫酸锌</Option>
        <Option value="5">硼肥</Option>
        <Option value="6">磷酸二氢钾</Option>
        <Option value="7">芸苔素</Option>
        <Option value="8">氯化钾</Option>
        <Option value="9">菌肥</Option>
        <Option value="10">有机肥</Option>
        <Option value="12">掺混肥</Option>
        <Option value="13">复合肥</Option>
        <Option value="11">其他</Option>
      </Select>
    }
  }, {
    title: '用量',
    dataIndex: 'dosage',
    className: 'noBottomBorder',
    render: (value, row, index) => {
      if (row.key === -1) {
        return ''
      }
      return <DebounceInput
        minLength={0}
        debounceTimeout={0} name='dosage' value={this.format2(value)} onChange={this.inputChange2.bind(this, row.key)} />
    }
  }, {
    title: '施肥类型',
    dataIndex: 'type',
    render: (value, row, index) => {
      if (row.key === -1) {
        return '合计'
      }
      return <Select defaultValue="0" value={value} name='type' size={'small'} onChange={this.typeChange.bind(this, row.key)}>
        <Option value="0">底肥</Option>
        <Option value="1">种肥</Option>
        <Option value="2">追肥</Option>
        <Option value="3">叶喷</Option>
        <Option value="4">水肥一体</Option>
      </Select>
    }
  }, {
    title: 'N',
    dataIndex: 'nitrogen',
    render: (value, row, index) => {
      if (row.key === -1) {
        return this.format3(value)
      }
      return <DebounceInput
        minLength={0}
        debounceTimeout={800} name='nitrogen' value={this.format(value, row)} onChange={this.inputChange.bind(this, row.key)} />
    }
  }, {
    title: <span>P<sub>2</sub>O<sub>5</sub></span>,
    dataIndex: 'phosphorus',
    render: (value, row, index) => {
      if (row.key === -1) {
        return this.format3(value)
      }
      return <DebounceInput
        minLength={0}
        debounceTimeout={800} name='phosphorus' value={this.format(value, row)} onChange={this.inputChange.bind(this, row.key)} />
    }
  }, {
    title: <span>K<sub>2</sub>O</span>,
    dataIndex: 'potassium',
    render: (value, row, index) => {
      if (row.key === -1) {
        return this.format3(value)
      }
      return <DebounceInput
        minLength={0}
        debounceTimeout={800} name='potassium' value={this.format(value, row)} onChange={this.inputChange.bind(this, row.key)} />
    }
  }, {
    title: <span>S</span>,
    dataIndex: 'sulfur',
    render: (value, row, index) => {
      if (row.key === -1) {
        return this.format3(value)
      }
      return <DebounceInput
        minLength={0}
        debounceTimeout={800} name='sulfur' value={this.format(value, row)} onChange={this.inputChange.bind(this, row.key)} />
    }
  }, {
    title: <span>Z<sub>n</sub></span>,
    dataIndex: 'zinc',
    render: (value, row, index) => {
      if (row.key === -1) {
        return this.format3(value)
      }
      return <DebounceInput
        minLength={0}
        debounceTimeout={800} name='zinc' value={this.format(value, row)} onChange={this.inputChange.bind(this, row.key)} />
    }
  }, {
    title: <span>B</span>,
    dataIndex: 'boron',
    render: (value, row, index) => {
      if (row.key === -1) {
        return this.format3(value)
      }
      return <DebounceInput
        minLength={0}
        debounceTimeout={800} name='boron' value={this.format(value, row)} onChange={this.inputChange.bind(this, row.key)} />
    }
  }, {
    title: '操作',
    key: 'operation',
    className: 'operation-hover',
    render: (text, row, index) => {
      if (row.key === -1) {
        return ''
      }
      return <div>
        <img src={delete2} title='删除' alt="" onClick={this.deleteById.bind(this, row.key)} />
      </div>
    }
  }]
  categoryChange = (key, value) => {
   
    const { type } = this.props
    const { cropPlan } = this.props
    const contrast = cropPlan[type]
    console.log(value)
    for (let con of contrast) {
      if (con.key === key) {
        con.category = value
      }
    }
    if (type === 'contrast') {
      this.props.updateContrast(contrast)
    } else if (type === 'origin') {
      this.props.updateOrigin(contrast)
    }
  }
  typeChange = (key, value) => {
    const { type } = this.props
    const { cropPlan } = this.props
    const contrast = cropPlan[type]
    for (let con of contrast) {
      if (con.key === key) {
        con.type = value
      }
    }
    if (type === 'contrast') {
      this.props.updateContrast(contrast)
    } else if (type === 'origin') {
      this.props.updateOrigin(contrast)
    }
  }
  inputChange2 = (key, e) => {
    const { name, value } = e.target
    const { type } = this.props
    const { cropPlan } = this.props
    const contrast = cropPlan[type]
    const { unit } = cropPlan
    if (unit === 2) {
      toast.error('百分比情况下，不可输入，请切换到其他单位')
      if (type === 'contrast') {
        this.props.updateContrast(contrast)
      } else if (type === 'origin') {
        this.props.updateOrigin(contrast)
      }
      return
    }
    for (let con of contrast) {
      if (con.key === key) {
        if (unit !== 2) {
          con[name] = unit === 0 ? Number(value) :
            unit === 1 ? Number(value) / 15 : ''
        }
      }
    }
    if (type === 'contrast') {
      this.props.updateContrast(contrast)
    } else if (type === 'origin') {
      this.props.updateOrigin(contrast)
    }
  }
  inputChange = (key, e) => {
    const { unit } = this.state
    const { name, value } = e.target
    const { type } = this.props
    const { cropPlan } = this.props
    const contrast = cropPlan[type]
    // const { unit } = cropPlan
    if (unit === 1) {
      if (type === 'contrast') {
        this.props.updateContrast(contrast)
      } else if (type === 'origin') {
        this.props.updateOrigin(contrast)
      }
      toast.error('只能在百分比情况下输入和修改')
      return
    }
    for (let con of contrast) {
      if (con.key === key) {
        con[name] = value
      }
    }
    if (type === 'contrast') {
      this.props.updateContrast(contrast)
    } else if (type === 'origin') {
      this.props.updateOrigin(contrast)
    }
  }
  filter = (arr, type, start) => {
    return arr.map(a => (a[type])).reduce((a, b) => Number(a) + Number(b), start)
  }
  format3 = (value, row)  => {
    if (typeof value === 'undefined' || isNaN(value)) {
      return '0'
    }
    const { cropPlan: { unit, prevUnit } } = this.props
    if (unit === 1) {
      return Number((Number(value) * 15).toFixed(2))
    } else if (unit === 0) {
      return Number(Number(value).toFixed(2))
    } else {
      if (prevUnit === 0) {
        return Number(Number(value).toFixed(2))
      } else if (prevUnit === 1) {
        return Number((Number(value) * 15).toFixed(2))
      }
    }
  }
  format = (value, row) => {
    if (typeof value === 'undefined' || isNaN(value)) {
      return '0'
    }
    const { unit: inUnits } = this.state
    const { cropPlan: { unit, prevUnit } } = this.props
    if (inUnits === 0) {
      return Number(Number(value).toFixed(2)).toString()
    } else if (inUnits === 1) {
      if (unit === 1) {
        return Number((Number(value) * Number(row.dosage) * 15).toFixed(2)).toString()
      } else if (unit === 0) {
        return Number((Number(value) * Number(row.dosage)).toFixed(2)).toString()
      } else if (unit === 2) {
        if (prevUnit === 0) {
          return Number((Number(value) * Number(row.dosage)).toFixed(2)).toString()
        } else if (prevUnit === 1) {
          return Number((Number(value) * Number(row.dosage) * 15).toFixed(2)).toString()
        }
      }
    }
  }
  format2 = (value) => {
    if (typeof value === 'undefined' || isNaN(value)) {
      return 0
    }
    const { cropPlan: { unit, prevUnit } } = this.props
    if (unit === 1) {
      return Number((Number(value) * 15).toFixed(2)).toString()
    } else if (unit === 0) {
      return Number((Number(value)).toFixed(2)).toString()
    } else if (unit === 2) {
      if (prevUnit === 0) {
        return Number((Number(value)).toFixed(2)).toString()
      } else if (prevUnit === 1) {
        return Number((Number(value) * 15).toFixed(2)).toString()
      }
    }
  }
  deleteById = (key) => {

    const { type } = this.props
    const { cropPlan } = this.props
    const contrast = cropPlan[type]
    if (type === 'contrast') {
      this.props.updateContrast(contrast.filter(d => d.key !== key))
    } else if (type === 'origin') {
      this.props.updateOrigin(contrast.filter(d => d.key !== key))
    }
    // 删除
  }
  addCrop = () => {
    const { type } = this.props
    const { cropPlan } = this.props
    const contrast = cropPlan[type]
    const count = contrast.length
    contrast.push({
      key: count,
      category: '0',
      dosage: '0',
      type: undefined,
      nitrogen: '0',
      phosphorus: '0',
      potassium: '0',
      sulfur: '0',
      zinc: '0',
      boron: '0',
    })
    if (type === 'contrast') {
      this.props.updateContrast(contrast)
    } else if (type === 'origin') {
      this.props.updateOrigin(contrast)
    }
  }
  updateUnits = (index) => {
    this.setState({
      unit: index
    })
  }
  render() {
    const { type, cropPlan } = this.props
    const contrast = cropPlan[type]
    const contrastStats = cropPlan[`${type}Stats`]
    return (<div className='plan'>
      <Table
        rowClassName='planRow'
        columns={this.columns}
        dataSource={[...contrast, {
          key: -1,
          nitrogen: contrastStats.nitrogen,
          phosphorus: contrastStats.phosphorus,
          potassium: contrastStats.potassium,
          sulfur: contrastStats.sulfur,
          zinc: contrastStats.zinc,
          boron: contrastStats.boron,
        }]}
        bordered
        size={'small'}
        locale={{ emptyText: '无数据' }}
        title={() => this.props.type === 'origin' ? '原始方案' : '对照方案'}
        footer={undefined}
        pagination={false}
      />
      <div className='in-units'>
        <ul>
          <li onClick={this.updateUnits.bind(this, 0)} className={classNames({
            active: this.state.unit === 0
          // })}>百分比（%）</li>
          })}>百分比</li>
          <span>/</span>
          <li onClick={this.updateUnits.bind(this, 1)} className={classNames({
            active: this.state.unit === 1
          })}>实际值</li>
        </ul>
      </div>
      <div className='addAction'>
        <Button onClick={this.addCrop} className='button'>添加肥料</Button>
      </div>
      <div className='planSummary'>
        {/* <PlanSummary type={this.props.type} /> */}
      </div>
    </div>)

  }
}
OriginPlan.propTypes = {
  cropPlan: PropTypes.object,
  updateContrast: PropTypes.func,
  updateOrigin: PropTypes.func,
  type: PropTypes.string
}
export default connect(({ cropPlan }) => ({ cropPlan }), (dispatch) => ({
  updateContrast: (contrast) => dispatch(updateContrast(contrast)),
  updateOrigin: (contrast) => dispatch(updateOrigin(contrast))
}))(OriginPlan)