import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { envirFacSave, findDiseasePestList, findEnvirFac } from 'utils/Api'
import { connect } from 'react-redux'
import Select from 'react-select'
import FacSwitch from './FacSwitch'
import 'css/index/field/envirAndFac.scss'
const irrigationType = [
  {
    value: '0',
    label: '无'
  },
  {
    value: '1',
    label: '滴灌-有限制'
  },
  {
    value: '2',
    label: '滴灌-无限制'
  },
  {
    value: '3',
    label: '喷灌'
  },
  {
    value: '4',
    label: '漫灌-无限制'
  },
  {
    value: '5',
    label: '漫灌-有限制'
  },
]
// 
const nat = '0:干旱;1:高温;2:低温;3:寒潮;4:台风;5:龙卷风;6:冰雹;7:风雹;8:霜冻;9:暴雨;10:暴雪;11:冻雨;12:大风;13:结冰;14:霾'

const naturals = nat.split(';').map(n => {
  const s = n.split(':')
  return {
    label: s[1],
    value: s[0]
  }
})

class EnvirAndFac extends Component {
  constructor() {
    super()
    this.state = {
      res: {},
      id: '',
      irrigation: '',
      topography: '0',
      natural: [],
      disease: [],
      diseases: [],
      pest: [],
      pests: [],
      weatherStations: '0',
      drill: '0',
      harvester: '0',
      fertilizerLimitHigh: '0',
      fertilizer: '0',
      uvaYpfj: '0',
      ypfjLimitHigh: '0',
      ypfj: '0',
      laminating: '0',
      fac: [{
        key: 'weatherStations',
        name: '气象站'
      }, {
        key: 'drill',
        name: '播种机'
      }, {
        key: 'harvester',
        name: '收割机'
      }, {
        key:  'fertilizerLimitHigh',
        name: '追肥机（限高）'
      }, {
        key: 'fertilizer',
        name: '追肥机（不限高）'
      }, {
        key: 'uvaYpfj',
        name: '无人机叶喷'
      }, {
        key: 'ypfjLimitHigh',
        name: '叶喷肥机（限高）'
      }, {
        key: 'ypfj',
        name: '叶喷肥机（不限高）'
      }, {
        key: 'laminating',
        name: '覆膜'
      }],
      edit: true
    }
  }
  componentDidMount() {
    findDiseasePestList()
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          const { disease = [], pests= [] } = data.result
          this.setState({
            diseases: disease.map(i => ({
              value: i.key,
              label: i.value
            })),
            pests: pests.map(i => ({
              value: i.key,
              label: i.value
            }))
          })
        }
      }).then(() => {
        const { feature: { feature } } = this.props
        const id = feature.getId().replace(/tb_farmland./g, '')
        const fd = new FormData()
        fd.append('landId', id)
        findEnvirFac(fd)
          .then(e => e.data)
          .then(data => {
            const { result } = data
            const { id,
              topography = '0',
              irrigation = '0',
              weatherStations = '0',
              drill = '0',
              harvester = '0',
              fertilizerLimitHigh = '0',
              fertilizer = '0',
              uvaYpfj = '0',
              ypfjLimitHigh = '0',
              ypfj = '0',
              laminating = '0',
              commonNaturalDisasters = [],
              pestsIds = [],
              diseaseIds = []
            } = result
            this.setState({
              res: result,
              id,
              topography,
              irrigation: irrigationType.filter(irr => irr.value === irrigation)[0],
              weatherStations,
              drill,
              harvester,
              fertilizerLimitHigh,
              fertilizer,
              uvaYpfj,
              ypfjLimitHigh,
              ypfj,
              laminating,
              natural: naturals.filter(natural => commonNaturalDisasters.includes(natural.value)),
              disease: this.state.diseases.filter(disease => diseaseIds.includes(disease.value)),
              pest: this.state.pests.filter(pest => pestsIds.includes(pest.value)),
            })

          })
      })
    
  }
  submitHandle = (e) => {
    e.preventDefault()
    const info = {}
    if (!!this.state.id) {
      info.id = this.state.id
    }
    const { feature: { feature } } = this.props
    const id = feature.getId().replace(/tb_farmland./g, '')
    info.landId = id
    info.topography = this.state.topography
    info.irrigation = this.state.irrigation.value
    info.diseaseIds = this.state.disease.map(i => i.value)
    info.pestsIds = this.state.pest.map(i => i.value)
    info.weatherStations = this.state.weatherStations
    info.drill = this.state.drill
    info.harvester = this.state.harvester
    info.fertilizerLimitHigh = this.state.fertilizerLimitHigh
    info.fertilizer = this.state.fertilizer
    info.uvaYpfj = this.state.uvaYpfj
    info.ypfjLimitHigh = this.state.ypfjLimitHigh
    info.ypfj = this.state.ypfj
    info.laminating = this.state.laminating
    info.commonNaturalDisasters = this.state.natural.map(i => i.value)
    const fd = new FormData()
    fd.append('environmentFacilitiesInfo', JSON.stringify(info))
    envirFacSave(fd)
      .then(e => e.data)
      .then(data => {
        if (data.msg === '200') {
          toast.success('修改成功', {
            autoClose: 2000
          })
          return true
        }
      }).then((flag) => {
        if (!flag) {
          return
        }
        const fd = new FormData()
        fd.append('landId', id)
        findEnvirFac(fd)
          .then(e => e.data)
          .then(data => {
            const { result } = data
            const { id,
              topography,
              irrigation,
              weatherStations = '0',
              drill = '0',
              harvester = '0',
              fertilizerLimitHigh = '0',
              fertilizer = '0',
              uvaYpfj = '0',
              ypfjLimitHigh = '0',
              ypfj = '0',
              laminating = '0',
              commonNaturalDisasters = [],
              pestsIds = [],
              diseaseIds = []
            } = result
            this.setState({
              edit: true,
              res: result,
              id,
              topography,
              irrigation: irrigationType.filter(irr => irr.value === irrigation)[0],
              weatherStations,
              drill,
              harvester,
              fertilizerLimitHigh,
              fertilizer,
              uvaYpfj,
              ypfjLimitHigh,
              ypfj,
              laminating,
              natural: naturals.filter(natural => commonNaturalDisasters.includes(natural.value)),
              disease: this.state.diseases.filter(disease => diseaseIds.includes(disease.value)),
              pest: this.state.pests.filter(pest => pestsIds.includes(pest.value)),
            })

          })
      })
  }
  irrigationChange = (value) => {
    this.setState({
      irrigation: value
    })
  }
  naturalChange = (value) => {
    this.setState({
      natural: value
    })
  }
  pestChange = (value) => {
    this.setState({
      pest: value
    })
  }
  diseaseChange = (value) => {
    this.setState({
      disease: value
    })
  }
  topoChange = (e) => {
    this.setState({
      topography: e.target.value
    })
  }
  updateState = (key, value) => {
    console.log(key, value)
    this.setState({
      [key]: value
    })
  }
  activeEdit = (e) => {
    this.setState({
      edit: !this.state.edit
    })
  }
  noSave = (e) => {
    const { id,
      topography,
      irrigation,
      weatherStations = '0',
      drill = '0',
      harvester = '0',
      fertilizerLimitHigh = '0',
      fertilizer = '0',
      uvaYpfj = '0',
      ypfjLimitHigh = '0',
      ypfj = '0',
      laminating = '0',
      commonNaturalDisasters = [],
      pestsIds = [],
      diseaseIds = []
    } = this.state.res
    this.setState({
      edit: !this.state.edit,
      id,
      topography,
      irrigation: irrigationType.filter(irr => irr.value === irrigation)[0],
      weatherStations,
      drill,
      harvester,
      fertilizerLimitHigh,
      fertilizer,
      uvaYpfj,
      ypfjLimitHigh,
      ypfj,
      laminating,
      natural: naturals.filter(natural => commonNaturalDisasters.includes(natural.value)),
      disease: this.state.diseases.filter(disease => diseaseIds.includes(disease.value)),
      pest: this.state.pests.filter(pest => pestsIds.includes(pest.value)),
    })
  }
  render() {
    return <div className='envir-and-fac'>
      <div className='relative'>
        <div className='title'>环境与设施</div>
      </div>
      <div className='content'>
        <form onSubmit={this.submitHandle}>
          <div className='flex-left-right'>
            <div className='item'>
              <label>地势</label>
              <div className='input-group'>
                <input type="radio" name="topography" disabled={this.state.edit} value={0} checked={this.state.topography == 0} onChange={this.topoChange}/>
                <label htmlFor="flat">平地</label>
              </div>
              <div className='input-group'>
                <input type="radio" name="topography" value={1} disabled={this.state.edit} checked={this.state.topography == 1} onChange={this.topoChange} />
                <label htmlFor="sloping">坡地</label>
              </div>
            </div>
            <div className='item'>
              <label>灌溉类型</label>
              <Select
                className='select1'
                classNamePrefix='select1'
                placeholder=''
                isDisabled={this.state.edit}
                noResultsText='无'
                value={this.state.irrigation}
                onChange={this.irrigationChange}
                options={
                  irrigationType
                }>
              </Select>
            </div>
          </div>
         
          <div className='item fac'>
            <label>现有设施</label>
            <div className='facs'>
              {
                this.state.fac.map((item) => {
                  return <div className='input-group' key={item.key}>
                    <FacSwitch id={item.key} checked={this.state[item.key]} disabled={this.state.edit}  updateState={this.updateState}/>
                    <label>{item.name}</label>
                  </div>
                })
              }
            </div>
          </div>
          <div className='flex-left-right'>
            <div className='item'>
              <label>病害</label>
              <Select
                className='select2'
                classNamePrefix='select2'
                isMulti
                isDisabled={this.state.edit}
                placeholder=''
                noResultsText='无'
                onChange={this.diseaseChange}
                value={this.state.disease}
                maxMenuHeight={'200'}
                options={
                  this.state.diseases
                }>
              </Select>
              <span>（多选）</span>
            </div>
            <div className='item'>
              <label>虫害</label>
              <Select
                className='select2'
                classNamePrefix='select2'
                name='commonDisease'
                isMulti
                isDisabled={this.state.edit}
                placeholder=''
                noResultsText='无'
                value={this.state.pest}
                onChange={this.pestChange}
                maxMenuHeight={'200'}
                options={
                  this.state.pests
                }>
              </Select>
              <span>（多选）</span>
            </div>
          </div>
          <div className='item'>
            <label>自然灾害</label>
            <Select
              className='select'
              isMulti
              isDisabled={this.state.edit}
              placeholder=''
              noResultsText='无'
              maxMenuHeight={'200'}
              options={  
                naturals
              }
              onChange={this.naturalChange}
              value={this.state.natural}
            />
            <span>（多选）</span>
          </div>
          {
            this.state.edit ?
              <div className='submit'>
                <button className='button edit' type='button' onClick={this.activeEdit}>编辑</button>
              </div>
              :
              <div className='submit'>
                <input className='button save' type="submit" value='保存' />
                <button className='button no-edit' type='button' onClick={this.noSave}>放弃</button>
              </div>
          }
         
        </form>
      </div>
    </div>
  }
}
EnvirAndFac.propTypes = {
  feature: PropTypes.object
}
const mapStateToProps = (state) => {
  return {
    feature: state.feature
  }
}

export default connect(mapStateToProps)(EnvirAndFac)