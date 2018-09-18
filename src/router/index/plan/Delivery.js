import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import zh from 'moment/locale/zh-cn'
import classNames from 'classnames'
moment.locale('zh')
import delete2 from 'images/index/crop/delete.png'
import { Table, Button, DatePicker, Select, Input } from 'antd'
import { connect } from 'react-redux'
import { updateSchedule, delSchedule } from '_redux/actions/cropPlan'
const Option = Select.Option

function clacDosage(contrast, type) {
  return contrast.filter(c => c.category === type)
    .map(c => c.dosage).reduce((a, b) => Number(a) + Number(b), 0)
}

function isShow(contrast, type) {
  return contrast.filter(c => c.category === type).length === 0
}
const filter = function (arr, type, start) {
  return arr.map(a => a[type]).reduce((a, b) => Number(a) + Number(b), start)
}
class Delivery extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      total: []
    }
  }
  workTypeChange = (key, value) => {
    const { cropPlan: { schedule } } = this.props
    for (let con of schedule) {
      if (con.key === key) {
        con.workType = value
      }
    }
    this.props.updateSchedule(schedule)
  }
  change = (key, e) => {
    const { name, value } = e.target
    const { cropPlan: { schedule } } = this.props
    console.log(key)
    for (let con of schedule) {
      if (con.key === key) {
        con[name] = value
      }
    }
    this.props.updateSchedule(schedule)
  }
  dateChange = (key, e) => {
    const { cropPlan: { schedule, details: { sowingDate } } } = this.props
    const { name, value } = e.target
    for (let con of schedule) {
      if (con.key === key) {
        con[name] = value
        con.executionDate = moment(sowingDate).add(value, 'days').format('YYYY-MM-DD')
      }
    }
    this.props.updateSchedule(schedule)
  }
  addSchedule = () => {
    const { cropPlan: { schedule } } = this.props
    schedule.push({
      key: schedule.length,
      executionDate: undefined,
      workType: undefined,
      urea: 0,
      ammonium: 0,
      diammonium: 0,
      kso4: 0,
      znso4: 0,
      boron: 0,
      h2kp: 0,
      canola: 0,
      kcl: 0,
      nacterial: 0,
      organic: 0,
      other: 0,
      maxed: 0,
      compound: 0,
      afterSwoDays: undefined,
      dripIrrigationTime: undefined,
      dripIrrigationQuantity: undefined,
      describe: ''
    })
    this.props.updateSchedule(schedule)
  }
  deleteById = (key) => {
    console.log(key)
    const { cropPlan: { schedule } } = this.props
    if (key.toString().length === 32) {
      this.props.delSchedule(key)
    }
    this.props.updateSchedule(schedule.filter(d => d.key !== key))
    // 删除
  }
  render() {
    const { cropPlan: { schedule, contrast } } = this.props
    return (
      <div className='delivery'>
        <Table
          columns={[{
            title: '顺序',
            dataIndex: 'order',
            className: 'noBottomBorder noRightBorder noLeftBorder',
            render: (value, row, index) => {
              if (row.key === -1) {
                return ''
              }
              return index + 1
            }
          }, {
            title: '执行日期',
            dataIndex: 'executionDate',
            className: 'noBottomBorder',
            render: (value, row, index) => {
              if (row.key === -1) {
                return ''
              }
              if (!value) {
                return ''
              }
              return moment(value).format('DD/MM/YYYY')
            }
          }, {
            title: '作业',
            dataIndex: 'workType',
            render: (value, row, index) => {
              if (row.key === -1) {
                return '合计'
              }
              return <Select defaultValue="0" value={value} name='workType' size={'small'} onChange={this.workTypeChange.bind(this, row.key)}>
                <Option value="0">春底肥</Option>
                <Option value="1">秋底肥</Option>
                <Option value="2">种肥</Option>
                <Option value="3">追肥</Option>
                <Option value="4">水+肥</Option>
                <Option value="5">叶面肥</Option>
                <Option value="6">出苗水</Option>
                <Option value="7">芸苔素</Option>
                <Option value="8">清水</Option>
              </Select>
            }
          }, {
            title: '尿素',
            dataIndex: 'urea', className: isShow(contrast, '0') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '0'),
                      unStandard: filter(schedule, 'urea', 0) !== clacDosage(contrast, '0')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='urea' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '一铵',
            dataIndex: 'ammonium', className: isShow(contrast, '1') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '1'),
                      unStandard: filter(schedule, 'ammonium', 0) !== clacDosage(contrast, '1')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='ammonium' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '二铵',
            dataIndex: 'diammonium', className: isShow(contrast, '2') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '2'),
                      unStandard: filter(schedule, 'diammonium', 0) !== clacDosage(contrast, '2')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='diammonium' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '硫酸钾',
            dataIndex: 'kso4', className: isShow(contrast, '3') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '3'),
                      unStandard: filter(schedule, 'kso4', 0) !== clacDosage(contrast, '3')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='kso4' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '硫酸锌',
            dataIndex: 'znso4', className: isShow(contrast, '4') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '4'),
                      unStandard: filter(schedule, 'znso4', 0) !== clacDosage(contrast, '4')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='znso4' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '硼肥',
            dataIndex: 'boron', className: isShow(contrast, '5') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '5'),
                      unStandard: filter(schedule, 'boron', 0) !== clacDosage(contrast, '5')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='boron' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '磷酸二氢钾',
            dataIndex: 'h2kp', className: isShow(contrast, '6') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '6'),
                      unStandard: filter(schedule, 'h2kp', 0) !== clacDosage(contrast, '6')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='h2kp' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '芸苔素',
            dataIndex: 'canola', className: isShow(contrast, '7') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '7'),
                      unStandard: filter(schedule, 'canola', 0) !== clacDosage(contrast, '7')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='canola' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '氯化钾',
            dataIndex: 'kcl', className: isShow(contrast, '8') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '8'),
                      unStandard: filter(schedule, 'kcl', 0) !== clacDosage(contrast, '8')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='kcl' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '菌肥',
            dataIndex: 'nacterial', className: isShow(contrast, '9') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '9'),
                      unStandard: filter(schedule, 'nacterial', 0) !== clacDosage(contrast, '9')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='nacterial' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '有机肥',
            dataIndex: 'organic ', className: isShow(contrast, '10') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '10'),
                      unStandard: filter(schedule, 'organic', 0) !== clacDosage(contrast, '10')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='organic' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '掺混肥',
            dataIndex: 'maxed ',
            className: isShow(contrast, '12') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '12'),
                      unStandard: filter(schedule, 'maxed', 0) !== clacDosage(contrast, '12')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='maxed' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '复合肥',
            dataIndex: 'compound ',
            className: isShow(contrast, '13') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '13'),
                      unStandard: filter(schedule, 'compound', 0) !== clacDosage(contrast, '13')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='compound' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '其他',
            dataIndex: 'other',
            className: isShow(contrast, '11') ? 'hidden' : '',
            render: (value, row, index) => {
              if (row.key === -1) {
                const obj = {
                  children: value,
                  props: {
                    className: classNames({
                      hidden: isShow(contrast, '11'),
                      unStandard: filter(schedule, 'other', 0) !== clacDosage(contrast, '11')
                    })
                  },
                }
                return obj
              }
              return <Input size="small" value={value} name='other' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '播后天数',
            dataIndex: 'afterSwoDays',
            render: (value, row, index) => {
              if (row.key === -1) {
                return ''
              }
              return <Input size="small" value={value} name='afterSwoDays' onChange={this.dateChange.bind(this, row.key)} />
            }
          }, {
            title: '滴水时间（h）',
            dataIndex: 'dripIrrigationTime',
            render: (value, row, index) => {
              if (row.key === -1) {
                return ''
              }
              return <Input size="small" value={value} name='dripIrrigationTime' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '滴灌量（m3/亩）',
            dataIndex: 'dripIrrigationQuantity',
            render: (value, row, index) => {
              if (row.key === -1) {
                return ''
              }
              return <Input size="small" value={value} name='dripIrrigationQuantity' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '说明',
            dataIndex: 'describe',
            render: (value, row, index) => {
              if (row.key === -1) {
                return ''
              }
              return <Input size="small" value={value} name='describe' onChange={this.change.bind(this, row.key)} />
            }
          }, {
            title: '',
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
          }]}
          dataSource={[...schedule, {
            key: -1,
            urea: clacDosage(contrast, '0'),
            ammonium: clacDosage(contrast, '1'),
            diammonium: clacDosage(contrast, '2'),
            kso4: clacDosage(contrast, '3'),
            znso4: clacDosage(contrast, '4'),
            boron: clacDosage(contrast, '5'),
            h2kp: clacDosage(contrast, '6'),
            canola: clacDosage(contrast, '7'),
            kcl: clacDosage(contrast, '8'),
            nacterial: clacDosage(contrast, '9'),
            organic: clacDosage(contrast, '10'),
            mixed: clacDosage(contrast, '12'),
            compound: clacDosage(contrast, '13'),
            other: clacDosage(contrast, '11'),
          }]}
          locale={{ emptyText: '无数据' }}
          bordered
          size={'small'}
          // showHeader={false}
          title={() => '执行计划'}
          footer={undefined}
          pagination={false}
        />
        <div className='addAction'>
          <Button onClick={this.addSchedule} className='button'>添加日程</Button>

        </div>
        <div className='summary'>
          {/* <Summary /> */}
        </div>
      </div>
    )

  }
}
Delivery.propTypes = {
  cropPlan: PropTypes.object,
  updateSchedule: PropTypes.func,
  delSchedule: PropTypes.func,
}
export default connect(({ cropPlan }) => ({ cropPlan }), (dispatch) => ({
  updateSchedule: (schedule) => dispatch(updateSchedule(schedule)),
  delSchedule: (key) => dispatch(delSchedule(key))
}))(Delivery)