import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Statistics from './Statistics'
import Details from './Details'
import { connect } from 'react-redux'
import { updateContrast, updateOrigin, updateDetail, updateSchedule, updateDescribe } from '_redux/actions/cropPlan'
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
    plantingScheme.executionPlanVos = schedule.map(s => {
      const fertilizerDetailKvs = []
      s.urea && fertilizerDetailKvs.push({key: 0,value: s.urea })
      s.ammonium && fertilizerDetailKvs.push({ key: 0, value: s.ammonium })
      s.diammonium && fertilizerDetailKvs.push({ key: 0, value: s.diammonium })
      s.kso4 && fertilizerDetailKvs.push({ key: 0, value: s.kso4 })
      s.znso4 && fertilizerDetailKvs.push({ key: 0, value: s.znso4 })
      s.boron && fertilizerDetailKvs.push({ key: 0, value: s.boron })
      s.h2kp && fertilizerDetailKvs.push({ key: 0, value: s.h2kp })
      s.canola && fertilizerDetailKvs.push({ key: 0, value: s.canola })
      s.kcl && fertilizerDetailKvs.push({ key: 0, value: s.kcl })
      s.nacterial && fertilizerDetailKvs.push({ key: 0, value: s.nacterial })
      s.organic && fertilizerDetailKvs.push({ key: 0, value: s.organic })
      s.other && fertilizerDetailKvs.push({ key: 0, value: s.other })
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
        console.log(data)
        if(data.msg === '200') {
          toast.success('保存成功')
          this.props.updateSchedule(data.result.executionPlanVos.map((c, i) => {
            const vo = {}
            const { fertilizerDetailKvs } = c
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
          }))
        }
      })
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
    }
  }
}
export default connect(({ cropPlan }) => ({ cropPlan }), mapDispatchToProps)(Tab)