import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Statistics from './Statistics'
import Details from './Details'
import { connect } from 'react-redux'
import { updateContrast, updateOrigin, updateDetail, updateSchedule, updateDescribe, updateId } from '_redux/actions/cropPlan'
import { plantingSchemeSave } from 'utils/Api'
import OriginPlan from './Plan'
import Delivery from './Delivery'
import save from 'images/index/crop/save.png'
import { toast } from 'react-toastify'


class Tab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      describe: props.describe,
      id: undefined
    }
  }
  submitHandler = (e) => {
    e.preventDefault()
    const { cropPlan: { details, targetVo, origin, contrast, schedule, describe, delSchedule, id } } = this.props
    const plantingScheme = {}
    plantingScheme.id = id
    plantingScheme.describe = describe
    plantingScheme.ph = details.ph
    plantingScheme.organicMatter = details.organicMatter
    plantingScheme.targetVo = targetVo
    plantingScheme.plantingSeasonCropsVo = {
      sowingDate: details.sowingDate,
      density: details.density,
      cropsName: details.cropsName,
      varietiesName: details.varietiesName,
      id: details.id,
    }
    plantingScheme.originSchedule = origin.map(o => ({
      ...o,
      id: o.key.length === 32 ? o.key : undefined
    }))
    plantingScheme.contrastSchedule = contrast.map(o => ({
      ...o,
      id: o.key.length === 32 ? o.key : undefined
    }))
    try {
      plantingScheme.executionPlanVos = schedule.map(s => {
        if (!s.afterSwoDays) {
          throw new Error('请确认信息填写完整')
        }
        const fertilizerDetailKvs = []
        s.urea >= 0 && fertilizerDetailKvs.push({ key: 0, value: s.urea })
        s.ammonium >= 0 && fertilizerDetailKvs.push({ key: 1, value: s.ammonium })
        s.diammonium >= 0 && fertilizerDetailKvs.push({ key: 2, value: s.diammonium })
        s.kso4 >= 0 && fertilizerDetailKvs.push({ key: 3, value: s.kso4 })
        s.znso4 >= 0 && fertilizerDetailKvs.push({ key: 4, value: s.znso4 })
        s.boron >= 0 && fertilizerDetailKvs.push({ key: 5, value: s.boron })
        s.h2kp >= 0 && fertilizerDetailKvs.push({ key: 6, value: s.h2kp })
        s.canola >= 0 && fertilizerDetailKvs.push({ key: 7, value: s.canola })
        s.kcl >= 0 && fertilizerDetailKvs.push({ key: 8, value: s.kcl })
        s.nacterial >= 0 && fertilizerDetailKvs.push({ key: 9, value: s.nacterial })
        s.organic >= 0 && fertilizerDetailKvs.push({ key: 10, value: s.organic })
        s.other >= 0 && fertilizerDetailKvs.push({ key: 11, value: s.other })
        s.maxed >= 0 && fertilizerDetailKvs.push({ key: 12, value: s.maxed })
        s.compound >= 0 && fertilizerDetailKvs.push({ key: 13, value: s.compound })
        return {
          ...s,
          fertilizerDetailKvs
        }
      })
      const fd = new FormData()
      fd.append('landId', this.props.landId)
      fd.append('plantingSchemeStr', JSON.stringify(plantingScheme))
      delSchedule.length !== 0 && fd.append('delExecutionPlanIds', delSchedule.join(','))
      plantingSchemeSave(fd)
        .then(e => e.data)
        .then(data => {
          if (data.msg === '200') {
            toast.success('保存成功')
            this.props.updateId(data.result.id)
            const schedule = data.result.executionPlanVos.map((c, i) => {
              const vo = {}
              const { fertilizerDetailKvs = [] } = c
              fertilizerDetailKvs.forEach(fer => {
                switch (fer.key) {
                case '0':
                  vo.urea = fer.value
                case '1':
                  vo.ammonium = fer.value
                case '2':
                  vo.diammonium = fer.value
                case '3':
                  vo.kso4 = fer.value
                case '4':
                  vo.znso4 = fer.value
                case '5':
                  vo.boron = fer.value
                case '6':
                  vo.h2kp = fer.value
                case '7':
                  vo.canola = fer.value
                case '8':
                  vo.kcl = fer.value
                case '9':
                  vo.nacterial = fer.value
                case '10':
                  vo.organic = fer.value
                case '11':
                  vo.other = fer.value
                case '12':
                  vo.maxed = fer.value
                case '13':
                  vo.compound = fer.value
                default:
                  break
                }
              })

              return { ...c, key: c.id, ...vo }
            })
            this.props.updateSchedule(schedule)
          }
        })
    } catch (err) {
      toast.error(err.message)
    }
    
    
    
  }
  textareaChange = (e) => {
    this.props.updateDescribe(e.target.value)
  }
  render() {
    const { cropPlan: { describe}} = this.props
    return (
      <form className='tab-content' onSubmit={this.submitHandler}>
        <div className='analyze'>
          <Statistics />
          <Details/>
        </div>
        <div>
          <OriginPlan type={'origin'} />
          <OriginPlan type={'contrast'}/>
          <Delivery/>
          {/* <OriginPlan /> */}
        </div>
        <div className='plan-descibe'>
          <label>描述：</label>
          <textarea name="" id="" cols="30" rows="10"
            value={describe}
            onChange={this.textareaChange}
            placeholder={'执行计划描述'}></textarea>
        </div>
        <div className='action'>
          <button><div style={{ backgroundImage: `url(${save})` }}>保存</div></button>
        </div>
      </form>
    )
  }
}


Tab.propTypes = {
  landId: PropTypes.string,
  plantingSeasonCropsId: PropTypes.string,
  updateContrast: PropTypes.func,
  updateOrigin: PropTypes.func,
  updateDetail: PropTypes.func,
  cropPlan: PropTypes.object,
  updateSchedule: PropTypes.func,
  describe: PropTypes.string,
  updateDescribe: PropTypes.func,
  updateId: PropTypes.func,
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateContrast: function (contrast) {
      dispatch(updateContrast(contrast))
    },
    updateOrigin: function (origin) {
      dispatch(updateOrigin(origin))
    },
    updateDetail: function (details) {
      dispatch(updateDetail(details))
    },
    updateSchedule: function (schedule) {
      dispatch(updateSchedule(schedule))
    },
    updateDescribe: function (describe) {
      dispatch(updateDescribe(describe))
    },
    updateId: function(id) {
      dispatch(updateId(id))
    }
  }
}
export default connect(({ cropPlan }) => ({ cropPlan }), mapDispatchToProps)(Tab)